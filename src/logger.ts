import * as aws from 'aws-sdk';
import { log, getLogNSTParams, logsParams, awsCred } from '../types/loggerTypes';


/**
 * @class SendCloudWatchLogs
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */

export class SendCloudWatchLogs {
  protected aws_cred: awsCred;
  protected logParams: logsParams;
  private cwl: any;

  constructor(aws_cred: awsCred, logParams: logsParams) {
    this.aws_cred = aws_cred;
    this.logParams = logParams;

    // Initialize aws-sdk with credentials
    const cwl = new aws.CloudWatchLogs({
      apiVersion: "2014-03-28",
      region: `${this.aws_cred.region}`,
      credentials: {
        accessKeyId: this.aws_cred.accessKeyId,
        secretAccessKey: this.aws_cred.secretAccessKey,
      },
    });

    // assign the cloudwatch log instance to the cwl property
    this.cwl = cwl;
  }

  /**
   * @memberof CWLogger
   * @type { method } sendLog - send log to AWSCloudWatchLogs service
   * @param {Object<log>} - log to be sent { message: string, timestamp: number }
   * @returns { Object } - Success response object
   */

  async sendLog(log: log) {
    // get the sequence token
    let NSTParams: getLogNSTParams = {
      logGroupName: this.logParams.logGroupName,
      logStreamNamePrefix: this.logParams.logStreamName,
      limit: 1,
      orderBy: "LogStreamName",
      descending: false,
    };

    // sendlogs params
    let sendLogsParams: any = {};

    let NStoken: any | string = await this.getLogNST(NSTParams);

    // assign the sequence token
    if (NStoken !== undefined) {
      sendLogsParams.sequenceToken = NStoken;
    } else {
      sendLogsParams.sequenceToken = undefined;
    }

    return new Promise((resolve, reject) => {
      // assign more properties to the sendLogsParams Object
      sendLogsParams.logGroupName = this.logParams.logGroupName;
      sendLogsParams.logStreamName = this.logParams.logStreamName;
      sendLogsParams.logEvents = [log];

      this.cwl.putLogEvents(sendLogsParams, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          let resp = {
            data,
            message: "Logs sent successfully",
            sentAt: Date.now(),
          };
          resolve(resp);
        }
      });
    });
  }

  /**
   * @memberof CWLogger
   * @type { method } getLogNST - get the next sequence token
   * @param params getLogNSTParams - { log_group_name, limit, descending, orderBy }
   * @returns { String } The next sequence token of the log stream
   */

  protected async getLogNST(params: getLogNSTParams) {
    return new Promise((resolve, reject) => {
      this.cwl.describeLogStreams(params, (err: any, logStream: any) => {
        if (err) {
          reject(err);
        } else {
          if (logStream !== undefined) {
            if (logStream.logStreams.length > 0) {
              resolve(logStream.logStreams[0].uploadSequenceToken);
            } else {
              resolve("No log stream found, failed to get sequence token");
            }
          } else {
            resolve("No log stream found");
          }
        }
      });
    });
  }
};
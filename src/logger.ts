import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { log, logsParams, awsCred } from '../types/loggerTypes';
import { validateRequiredKeys } from './@utils/validateRequiredKeys';

/**
 * @class SendCloudWatchLogs
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */

export class SendCloudWatchLogs {
  protected aws_cred: awsCred;
  protected logParams: logsParams;

  // CLoudWatchLog client instance
  private cwl: CloudWatchLogsClient;

  constructor(aws_cred: awsCred, logParams: logsParams) {
    // Validate Required fields
    validateRequiredKeys(aws_cred);
    validateRequiredKeys(logParams);

    this.aws_cred = aws_cred;
    this.logParams = logParams;

    const { accessKeyId, region, secretAccessKey } = this.aws_cred;

    // Initialize client with credentials
    const cwl = new CloudWatchLogsClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      apiVersion: '2014-03-28',
    });

    // Assign the cloudwatch log client instance to the cwl property
    this.cwl = cwl;
  }

  /**
   * @memberof CWLogger
   * @type { method } sendLog - send log to AWSCloudWatchLogs service
   * @param {Object<log>} - log to be sent { message: string, timestamp: number }
   * @returns { Object } - Success response object
   */

  async sendLog(log: log | Array<log>) {
    try {
      const { logGroupName, logStreamName } = this.logParams;
      const logEvents = Array.isArray(log) ? log : [log];

      const LogRequestParams = {
        logGroupName,
        logStreamName,
        logEvents,
      };

      const command = new PutLogEventsCommand(LogRequestParams);
      const response = await this.cwl.send(command);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

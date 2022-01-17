import * as aws from 'aws-sdk';
import { logs, getLogNSTParams, logsParams, awsCred } from '../types/loggerTypes';


/**
 * @class CWLogger
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */

export class CWLogger {
    protected aws_cred: awsCred;
    protected logParams: logsParams;
    private cwl: any;

    constructor(aws_cred: awsCred, logParams: logsParams) {
        this.aws_cred = aws_cred;
        this.logParams = logParams;
        
        // Initialize aws-sdk with credentials
        const cwl = new aws.CloudWatchLogs({
             apiVersion: '2014-03-28' ,
             region: `${this.aws_cred.region}`,
             credentials: {
                 accessKeyId: this.aws_cred.accessKeyId,
                 secretAccessKey: this.aws_cred.secretAccessKey
             }
        });

        // assign the cloudwatch log instance to the cwl property
        this.cwl = cwl;
    };

   async sendLogs(logs: logs) {

    // get the sequence token
    let NSTParams:getLogNSTParams = {
        logGroupName: this.logParams.logGroupName,
        logStreamNamePrefix: this.logParams.logStreamName,
        limit: 1,
        orderBy: 'LogStreamName',
        descending: false
    };

    // sendlogs params
    let sendLogsParams:any = {};

    let NStoken:any | string = await this.getLogNST(NSTParams);

    // assign the sequence token
    if(NStoken !== undefined) { 
        sendLogsParams.sequenceToken = NStoken;
    } else {
        sendLogsParams.sequenceToken = undefined;
    };

       return new Promise((resolve, reject) => {
        
            // assign more properties to the sendLogsParams Object
            sendLogsParams.logGroupName = this.logParams.logGroupName;
            sendLogsParams.logStreamName = this.logParams.logStreamName;
            sendLogsParams.logEvents = [logs];

            // console.log(sendLogsParams);
            this.cwl.putLogEvents(sendLogsParams, (err:any, log:any) => {
                if(err) {
                    reject(err);
                } else {
                    let resp = {
                        log,
                        message: "Logs sent successfully",
                        sentAt: Date.now()
                    };
                    resolve(resp);
                };
            });
       });
   };

   protected async getLogNST(params: getLogNSTParams) {
       return new Promise((resolve, reject) => {
            this.cwl.describeLogStreams(params, (err:any, logStream:any) => {
                if(err) {
                    reject(err);
                } else {
                    if(logStream !== undefined) {
                        if(logStream.logStreams.length > 0) {
                            resolve(logStream.logStreams[0].uploadSequenceToken);
                        } else {
                            resolve("No log stream found, failed to get sequence token");
                        };   
                    } else {
                        resolve("No log stream found");
                    };      
                };
            });
       });
   };
};
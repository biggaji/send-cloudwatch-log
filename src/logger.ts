import aws from 'aws-sdk';
import { logs, getLogNSTParams, sendLogsParams, awsCred } from '../types/loggerTypes';

const cwl = new aws.CloudWatchLogs({ apiVersion: '2014-03-28' });

/**
 * @class cwLogger
 * @description cwLogger class
 * @author Tobi Ajibade
 */

export class cwLogger {
    protected aws_cred: awsCred;
    
    constructor(aws_cred: awsCred) {
        this.aws_cred = aws_cred;

        // Initialize aws-sdk with credentials
        cwl.config.update({
            accessKeyId: this.aws_cred.accessKeyId,
            secretAccessKey: this.aws_cred.secretAccessKey,
            region: this.aws_cred.region
        });
    };

   async sendLogs(params: sendLogsParams, logs: logs) {
       return new Promise((resolve, reject) => {});
   };

   async getLogNST(params: getLogNSTParams) {
       return new Promise((resolve, reject) => {});
   };

};
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCloudWatchLogs = void 0;
const aws = __importStar(require("aws-sdk"));
/**
 * @class SendCloudWatchLogs
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */
class SendCloudWatchLogs {
    aws_cred;
    logParams;
    cwl;
    constructor(aws_cred, logParams) {
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
    async sendLog(log) {
        // get the sequence token
        let NSTParams = {
            logGroupName: this.logParams.logGroupName,
            logStreamNamePrefix: this.logParams.logStreamName,
            limit: 1,
            orderBy: "LogStreamName",
            descending: false,
        };
        // sendlogs params
        let sendLogsParams = {};
        let NStoken = await this.getLogNST(NSTParams);
        // assign the sequence token
        if (NStoken !== undefined) {
            sendLogsParams.sequenceToken = NStoken;
        }
        else {
            sendLogsParams.sequenceToken = undefined;
        }
        return new Promise((resolve, reject) => {
            // assign more properties to the sendLogsParams Object
            sendLogsParams.logGroupName = this.logParams.logGroupName;
            sendLogsParams.logStreamName = this.logParams.logStreamName;
            sendLogsParams.logEvents = [log];
            this.cwl.putLogEvents(sendLogsParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
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
    async getLogNST(params) {
        return new Promise((resolve, reject) => {
            this.cwl.describeLogStreams(params, (err, logStream) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (logStream !== undefined) {
                        if (logStream.logStreams.length > 0) {
                            resolve(logStream.logStreams[0].uploadSequenceToken);
                        }
                        else {
                            resolve("No log stream found, failed to get sequence token");
                        }
                    }
                    else {
                        resolve("No log stream found");
                    }
                }
            });
        });
    }
}
exports.SendCloudWatchLogs = SendCloudWatchLogs;
;

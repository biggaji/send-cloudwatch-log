"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendCloudWatchLogs = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const validateRequiredKeys_1 = require("./@utils/validateRequiredKeys");
/**
 * @class SendCloudWatchLogs
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */
class SendCloudWatchLogs {
    aws_cred;
    logParams;
    // CLoudWatchLog client instance
    cwl;
    constructor(aws_cred, logParams) {
        // Validate Required fields
        (0, validateRequiredKeys_1.validateRequiredKeys)(aws_cred);
        (0, validateRequiredKeys_1.validateRequiredKeys)(logParams);
        this.aws_cred = aws_cred;
        this.logParams = logParams;
        const { accessKeyId, region, secretAccessKey } = this.aws_cred;
        // Initialize aws-sdk with credentials
        const cwl = new client_cloudwatch_logs_1.CloudWatchLogsClient({
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
    async sendLog(log) {
        try {
            const { logGroupName, logStreamName } = this.logParams;
            const logEvents = Array.isArray(log) ? log : [log];
            const LogRequestParams = {
                logGroupName,
                logStreamName,
                logEvents,
            };
            const command = new client_cloudwatch_logs_1.PutLogEventsCommand(LogRequestParams);
            const response = await this.cwl.send(command);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SendCloudWatchLogs = SendCloudWatchLogs;

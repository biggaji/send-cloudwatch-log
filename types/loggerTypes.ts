export interface logs {
    message: string;
    timestamp: number;
};

export interface getLogNSTParams {
    logGroupName: string;
    limit: number;
    descending: boolean;
    orderBy: "LogStreamName" | "LastEventTime";
    logStreamNamePrefix: string;
};

export interface logsParams {
    logGroupName: string;
    logStreamName: string;
};

export interface awsCred {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}
export interface logs {
    message: string;
    timestamp: number;
};

export interface getLogNSTParams {
    logGroupName: string;
    limit?: number;
    nextToken?: string;
    desending?: boolean;
    orderBy?: string;
    logStreamNamePrefix?: string;
};

export interface sendLogsParams {
    logEvents: Array<logs>;
    logGroupName: string;
    logStreamName: string;
    sequenceToken?: string;
};
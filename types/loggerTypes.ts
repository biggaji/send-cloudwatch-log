export interface log {
  message: string;
  timestamp: number;
}

export interface logsParams {
  logGroupName: string;
  logStreamName: string;
}

export interface awsCred {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

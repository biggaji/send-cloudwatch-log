import { config } from 'dotenv';

config();

import { SendCloudWatchLogs } from "../src/logger";

let logger = new SendCloudWatchLogs(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
  },
  {
    logGroupName: "test-sdk",
    logStreamName: "sdk-test-log2",
  }
);

let logs = {
    message: "Hello World from Logger",
    timestamp: Date.now(),
  };


logger.sendLog(logs)
.then(resp => {
    console.log(`Logs sent successfully`, resp);
})
.catch(err => {
    console.log(`An error occured`, err);
});
import { config } from 'dotenv';

config();

import CWLogger from "../src/logger";

let logger = new CWLogger(
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


logger.sendLogs(logs)
.then(log => {
    console.log(`Working`, log);
})
.catch(e => {
    console.log(`Working error`, e);
})
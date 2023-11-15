# send-cloudwatch-log

This sdk allows you to easily send logs from your Node.js application to
AWSCloudWatchLogs service. It is easy and very simple to use.

## Requirement

This sdk requires a node version 8, 10 or higher to work effectively.

## Installation

Using Npm?

```sh
npm install --save send-cloudwatch-log
```

Using Yarn?

```sh
yarn add send-cloudwatch-log
```

## Usage

```js
const cwlogger = require('send-cloudwatch-log');

// Create an instance of the cwlogger , you can create as many instance as you want.
// For each instance, you just need to pass the required configs details as seen in the example below:
const logger = new cwlogger(
  {
    accessKeyId: 'AWS_ACCESS_KEY_ID',
    secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    region: 'AWS_REGION',
  },
  {
    logGroupName: 'LOG_GROUP_NAME',
    logStreamName: 'LOG_STREAM_NAME',
  },
);

/**
 * Create a log object
 * Each log object must contain only the 'message' and 'timestamp' properties.
 * { message: string, timestamp: number}
 * Since message must be a string, so you can also use the JSON.stringify() method to wrap objects as a string
 * timestamp must be in milliseconds, so you can use either Date.now() or new Date().getTime();
 */

let log = {
  message: 'Hello World from cwLogger',
  timestamp: Date.now(),
};


// Send log to AWSCloudWatchLogs
// The sendLog() method accepts either a single log object or an array of log objects.

// Sending the a single log object
logger
  .sendLog(log)
  .then((resp) => {
     // resp -> the response from AWSCloudWatchLogs
    console.log(`Logs sent successfully`, resp);
  })
  .catch((err) => {
    console.log(`An error occured`, err);
  });


let logs = [
  {
    message: 'Hello World from cwLogger',
    timestamp: Date.now(),
  };
  {
    message: JSON.stringify({ error: 'TypeError', message: 'timestanps must be a number'}),
    timestamp: Date.now(),
  };
];

// Sending the an array | list of log object
logger
  .sendLog(logs)
  .then((resp) => {
    // resp -> the response from AWSCloudWatchLogs
    console.log(`Logs sent successfully`, resp);
  })
  .catch((err) => {
    console.log(`An error occured`, err);
  });
```

The `sendLog()` method takes the log object or an array of log objects as an
argument and sends it to the AWSCloudWatchLogs.

It returns a promise which when successful, returns an object which contains a
nextSequenceToken and $metadata from AWSCloudWatchLogs or an error with a
message showing the reason it failed.

![Image Screenshot of AwsCloudWatchLogs stream event](https://res.cloudinary.com/dahn8uiyc/image/upload/v1642677223/logger_baqit9.png)

## How can I thank you?

Why not star the Github repository? I'd love the attention!

Why not share the link for this repository on X or HackerNews?

Spread the word!

Don't forget to [follow me on X](https://x.com/oxwware)!

Thanks!

Tobiloba Ajibade.

## License

The MIT License [(MIT)]("https://mit-license.org/).

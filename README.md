# send-cloudwatch-log
This sdk allows you to easily send logs from your nodeJs application to AWSCloudWatchLogs service, it is easy and simple to implement.


## Requirement

This sdk requires a node version 8, 10 or higher to work effectively.

## Installation 

```bash
npm install send-cloudwatch-log
or 
yarn add send-cloudwatch-log
```

## Usage 


```js
const cwlogger = require("send-cloudwatch-log");

//create an instance of the cwlogger , you can create as many instance as you want.

// For each instance, you just need to pass your aws_credentials and provide the logGroupName and logStreamName. See the example below:

const logger = new cwlogger({
    accessKeyId: "AWS_ACCESS_KEY_ID",
    secretAccessKey: "AWS_SECRET_ACCESS_KEY",
    region: "AWS_REGION",
  },
  {
    logGroupName: "LOG_GROUP_NAME",
    logStreamName: "LOG_STREAM_NAME",
  });

  //create log a log
  //Each log must be an object containing only message and timestamp e.g {message: "STRING", timestamp: number}.

  //timestamp must be in milliseconds   

  let log = {
      message: "Hello World from cwLogger",
      timestamp: Date.now()
  };

  //send log to AWSCloudWatchLogs

  logger.sendLog(log)
  .then(resp => {
    console.log(`Logs sent successfully`, resp);
  })
  .catch(err => {
    console.log(`An error occured`, err);
  });



```

The `sendLog()` method takes the log as a parameter and sends it to the AWSCloudWatchLogs. It returns a promise which when successful, returns an object which contains a nextSequenceToken and a customised successful message `Logs sent successfully`, or an error with a message showing the reason it failed.

![Image Screenshot of AwsCloudWatchLogs stream event](https://res.cloudinary.com/dahn8uiyc/image/upload/v1642677223/logger_baqit9.png)

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or HackerNews? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/bigg_aji)!

Thanks!
Tobiloba Ajibade.

## License
The MIT License [(MIT)]("https://mit-license.org/).

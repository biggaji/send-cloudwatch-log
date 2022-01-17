"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var logger_1 = __importDefault(require("./logger"));
var logger = new logger_1.default({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
}, {
    logGroupName: "test-sdk",
    logStreamName: "sdk-test-log2",
});
var logs = {
    message: "Hello World from cwLogger",
    timestamp: Date.now(),
};
logger.sendLogs(logs)
    .then(function (log) {
    console.log("Working", log);
})
    .catch(function (e) {
    console.log("Working error", e);
});

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws = __importStar(require("aws-sdk"));
/**
 * @class CWLogger
 * @description Send logs to AWSCloudWatchLogs service
 * @author Tobi Ajibade
 */
var CWLogger = /** @class */ (function () {
    function CWLogger(aws_cred, logParams) {
        this.aws_cred = aws_cred;
        this.logParams = logParams;
        // Initialize aws-sdk with credentials
        var cwl = new aws.CloudWatchLogs({
            apiVersion: '2014-03-28',
            region: "" + this.aws_cred.region,
            credentials: {
                accessKeyId: this.aws_cred.accessKeyId,
                secretAccessKey: this.aws_cred.secretAccessKey
            }
        });
        // assign the cloudwatch log instance to the cwl property
        this.cwl = cwl;
    }
    ;
    CWLogger.prototype.sendLogs = function (logs) {
        return __awaiter(this, void 0, void 0, function () {
            var NSTParams, sendLogsParams, NStoken;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        NSTParams = {
                            logGroupName: this.logParams.logGroupName,
                            logStreamNamePrefix: this.logParams.logStreamName,
                            limit: 1,
                            orderBy: 'LogStreamName',
                            descending: false
                        };
                        sendLogsParams = {};
                        return [4 /*yield*/, this.getLogNST(NSTParams)];
                    case 1:
                        NStoken = _a.sent();
                        // assign the sequence token
                        if (NStoken !== undefined) {
                            sendLogsParams.sequenceToken = NStoken;
                        }
                        else {
                            sendLogsParams.sequenceToken = undefined;
                        }
                        ;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                // assign more properties to the sendLogsParams Object
                                sendLogsParams.logGroupName = _this.logParams.logGroupName;
                                sendLogsParams.logStreamName = _this.logParams.logStreamName;
                                sendLogsParams.logEvents = [logs];
                                // console.log(sendLogsParams);
                                _this.cwl.putLogEvents(sendLogsParams, function (err, log) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        var resp = {
                                            log: log,
                                            message: "Logs sent successfully",
                                            sentAt: Date.now()
                                        };
                                        resolve(resp);
                                    }
                                    ;
                                });
                            })];
                }
            });
        });
    };
    ;
    CWLogger.prototype.getLogNST = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.cwl.describeLogStreams(params, function (err, logStream) {
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
                                    ;
                                }
                                else {
                                    resolve("No log stream found");
                                }
                                ;
                            }
                            ;
                        });
                    })];
            });
        });
    };
    ;
    return CWLogger;
}());
exports.default = CWLogger;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-04 11:26:46
 * @modify date 2018-10-04 11:26:46
 * @desc [description]
 */
var EventEmitter = require("events");
var loggerWinston_1 = tslib_1.__importDefault(require("./loggerWinston"));
var MyEmitter = /** @class */ (function (_super) {
    tslib_1.__extends(MyEmitter, _super);
    function MyEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyEmitter;
}(EventEmitter));
var myEmitter = new MyEmitter();
myEmitter.on("info", function (message, timeStamp) {
    loggerWinston_1.default.log({
        level: "info",
        message: message,
        timestamp: timeStamp,
    });
});
myEmitter.on("warn", function (message, timeStamp, err) {
    loggerWinston_1.default.log({
        exception: err,
        level: "warn",
        message: message,
        timestamp: timeStamp,
    });
});
myEmitter.on("error", function (message, timeStamp, err) {
    loggerWinston_1.default.log({
        exception: err,
        level: "error",
        message: message,
        timestamp: timeStamp,
    });
});
exports.default = myEmitter;

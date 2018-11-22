/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-04 11:26:46
 * @modify date 2018-10-04 11:26:46
 * @desc [description]
 */
import EventEmitter = require("events");
import logger from "./loggerWinston";
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on("info", (message: string , timeStamp: Date) => {
    logger.log({
        level: "info",
        message,
        timestamp: timeStamp,
    });
});
myEmitter.on("warn", (message: string , timeStamp: Date, err: Error) => {
    logger.log({
        exception: err,
        level: "warn",
        message,
        timestamp: timeStamp,
    });
});
myEmitter.on("error", (message: string , timeStamp: Date, err: Error) => {
    logger.log({
        exception: err,
        level: "error",
        message,
        timestamp: timeStamp,
    });
});
export default myEmitter;

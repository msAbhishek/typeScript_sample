/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-03 09:40:48
 * @modify date 2018-10-03 09:40:48
 * @desc [description]
 */
import winston = require("winston");
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "./log/myLog.log" }),
    ],
});
export default logger;

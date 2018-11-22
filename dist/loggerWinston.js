"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-03 09:40:48
 * @modify date 2018-10-03 09:40:48
 * @desc [description]
 */
var winston = require("winston");
var logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "./log/myLog.log" }),
    ],
});
exports.default = logger;

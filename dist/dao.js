"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:14:34
 * @modify date 2018-09-20 15:14:34
 * @desc [description]
 */
var pg = require("pg");
var Promise = require("promise");
var eventEmitter_1 = tslib_1.__importDefault(require("./eventEmitter"));
var Databaseclass = /** @class */ (function () {
    function Databaseclass() {
        this.connection = new pg.Pool({
            database: "details",
            host: "localhost",
            password: "postgres",
            port: 5432,
            user: "postgres",
        });
    }
    /**
     * function for executing database queries
     * @param {*} query
     * @param {*} params
     */
    Databaseclass.prototype.dbOperations = function (query, params) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.query(query, params, function (err, res) {
                try {
                    if (res.rowCount) {
                        resolve(res);
                    }
                    else if (err) {
                        reject(err);
                        var message = "database execution error";
                        var timeStamp = new Date();
                        eventEmitter_1.default.emit("error", message, timeStamp, err);
                    }
                    else {
                        reject(false);
                    }
                }
                catch (err) {
                    var message = "exception in query execution results";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
            });
        });
    };
    return Databaseclass;
}());
exports.default = Databaseclass;

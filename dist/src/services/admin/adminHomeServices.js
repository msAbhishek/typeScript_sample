"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:16:50
 * @modify date 2018-09-20 15:16:50
 * @desc [description]
 */
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var AdminHomeServices = /** @class */ (function (_super) {
    tslib_1.__extends(AdminHomeServices, _super);
    function AdminHomeServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * listall function for listing admins in admin page
     */
    AdminHomeServices.prototype.listAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var listAllQueryselect = "SELECT * FROM employee WHERE usertype = $1 ORDER BY name";
            var params = ["user"];
            _this.dbOperations(listAllQueryselect, params).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                var resultObj = {
                    count: res.rows.length,
                    stat: true,
                    user: res.rows,
                };
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminhomeserivces file on listall function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    /**
     * listsingle function for detailing a user in admin page
     * @param {*} id
     */
    AdminHomeServices.prototype.listSingle = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var listSingleQueryselect = "SELECT * FROM employee WHERE id = $1";
            var params = [id];
            _this.dbOperations(listSingleQueryselect, params).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                var resultObj = {
                    count: 1,
                    stat: true,
                    user: res.rows[0],
                };
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminhomeserivces file on listsingle function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    /**
     * makeadmin function for making a user as admin
     * @param {*} uname
     */
    AdminHomeServices.prototype.makeAdmin = function (uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var makeAdminQueryupdate = "UPDATE employee SET  usertype = $1 WHERE uname =$2";
            var params = ["admin", uname];
            _this.dbOperations(makeAdminQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(stat);
                    return;
                }
                resolve(res);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminhomeserivces file on makeadmin function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    /**
     * deleteUser function for deleting a user
     * @param {*} uname
     */
    AdminHomeServices.prototype.deleteUser = function (uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var deleteUserQuerydelete = "DELETE FROM employee WHERE uname =$1";
            var params = [uname];
            _this.dbOperations(deleteUserQuerydelete, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(stat);
                    return;
                }
                resolve(res);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminhomeserivces file on deleteuser function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    return AdminHomeServices;
}(dao_1.default));
exports.default = AdminHomeServices;

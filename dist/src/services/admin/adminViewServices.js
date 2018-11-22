"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:41
 * @modify date 2018-09-20 15:15:41
 * @desc [description]
 */
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var AdminViewServices = /** @class */ (function (_super) {
    tslib_1.__extends(AdminViewServices, _super);
    function AdminViewServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * listall function for listing admins in admin page
     * @param {*} id
     */
    AdminViewServices.prototype.listAll = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var listAllQueryselect = "SELECT * FROM employee WHERE usertype = $1 AND id != $2 ORDER BY name";
            var params = ["admin", id];
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
                    var message = " error in adminviewserivces file on listall function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    /**
     * listsingle function for detailing an admin in admin page
     * @param {*} id
     */
    AdminViewServices.prototype.listSingle = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var listsingleQueryselect = "SELECT * FROM employee WHERE id = $1";
            var params = [id];
            _this.dbOperations(listsingleQueryselect, params).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                var resultObj = {
                    stat: true,
                    user: res.rows[0],
                };
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminviewserivces file on listsingle function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    return AdminViewServices;
}(dao_1.default));
exports.default = AdminViewServices;

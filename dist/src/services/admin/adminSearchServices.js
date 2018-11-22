"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:47
 * @modify date 2018-09-20 15:15:47
 * @desc [description]
 */
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var AdminSearchServices = /** @class */ (function (_super) {
    tslib_1.__extends(AdminSearchServices, _super);
    function AdminSearchServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * list function for searching
     * @param {*} id
     * @param {*} uname
     */
    AdminSearchServices.prototype.list = function (id, uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            var listQueryselect = "SELECT * FROM employee WHERE uname LIKE $1 AND id != $2 ORDER BY name";
            var params = [uname, id];
            _this.dbOperations(listQueryselect, params).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                var searchObj = {
                    stat: true,
                    user: res.rows,
                };
                resolve(searchObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in adminsearchserivces file on list function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    };
    return AdminSearchServices;
}(dao_1.default));
exports.default = AdminSearchServices;

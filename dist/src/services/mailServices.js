"use strict";
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-10 08:57:20
 * @modify date 2018-10-10 08:57:20
 * @desc [description]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../eventEmitter"));
var MailServices = /** @class */ (function (_super) {
    tslib_1.__extends(MailServices, _super);
    function MailServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailServices.prototype.getEmails = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var getEmailQuery = "SELECT email FROM employee WHERE id != $1";
            _this.dbOperations(getEmailQuery, [0]).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(false);
                    return;
                }
                resolve(res);
            }).catch(function (err) {
                if (err) {
                    var message = " error in mailservices file on getmail function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(false);
            });
        });
    };
    return MailServices;
}(dao_1.default));
exports.default = MailServices;

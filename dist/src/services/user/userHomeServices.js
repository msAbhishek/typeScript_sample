"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:19
 * @modify date 2018-09-20 15:15:19
 * @desc [description]
 */
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var UserHomeServices = /** @class */ (function (_super) {
    tslib_1.__extends(UserHomeServices, _super);
    function UserHomeServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * getdetails function for listing user in user home page
     * @param {*} id
     */
    UserHomeServices.prototype.getDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var getDetailsQueryselect = "SELECT * FROM employee WHERE id = $1";
            var params = id;
            var resultFalseObj = { id: "null", stat: false };
            _this.dbOperations(getDetailsQueryselect, [params]).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(resultFalseObj);
                    return;
                }
                var resultObj = {
                    address: res.rows[0].address,
                    email: res.rows[0].email,
                    id: res.rows[0].id,
                    name: res.rows[0].name,
                    password: res.rows[0].password,
                    phone: res.rows[0].phone,
                    stat: true,
                    uname: res.rows[0].uname,
                };
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in userhomeservices file on getdetails function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultFalseObj);
            });
        });
    };
    return UserHomeServices;
}(dao_1.default));
exports.default = UserHomeServices;

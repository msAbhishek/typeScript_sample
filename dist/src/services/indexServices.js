"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:09
 * @modify date 2018-10-03 09:47:20
 * @desc [description]
 */
var bcrypt = require("bcryptjs");
var fs = require("fs");
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../eventEmitter"));
var IndexServices = /** @class */ (function (_super) {
    tslib_1.__extends(IndexServices, _super);
    function IndexServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * register function for registering new user
     * @param {*} registerObj
     */
    IndexServices.prototype.register = function (userObj) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var type = "user";
            var password = userObj.body.password;
            var stat = true;
            var params = [userObj.body.name, userObj.body.uname, userObj.body.address, userObj.body.email, userObj.body.password, userObj.body.phone, type];
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (errr, hash) {
                    if (errr) {
                        params[4] = password;
                    }
                    params[4] = hash;
                    var registerQueryinsert = "INSERT INTO employee(name,uname,address,email,password,phone,usertype) values($1,$2,$3,$4,$5,$6,$7)";
                    self.dbOperations(registerQueryinsert, params).then(function () {
                        var registerQueryselect = "SELECT * FROM employee WHERE uname =$1";
                        var paramss = userObj.body.uname;
                        return self.defaultImageQuery(registerQueryselect, paramss);
                    }).then(function (res) {
                        resolve(stat);
                        fs.createReadStream("./public/testimg/avatarmen.jpg").pipe(fs.createWriteStream("./public/testimg/user_Image/" + res.rows[0].id + ".jpg"));
                    }).catch(function (er) {
                        if (er) {
                            var message = " error in indexservice file on register function";
                            var timeStamp = new Date();
                            eventEmitter_1.default.emit("error", message, timeStamp, err);
                        }
                        reject(false);
                    });
                });
            });
        });
    };
    /**
     * database call function to set default image
     * @param {*} registerQuery_select
     * @param {*} params
     */
    IndexServices.prototype.defaultImageQuery = function (registerQueryselect, params) {
        return this.dbOperations(registerQueryselect, [params]);
    };
    /**
     * login function
     * @param {*} uname
     * @param {*} password
     */
    IndexServices.prototype.login = function (uname, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loginQueryselect = "SELECT * FROM employee WHERE uname =$1";
            var Params = uname;
            _this.dbOperations(loginQueryselect, [Params]).then(function (res) {
                if (res.rows.length <= 0) {
                    reject(false);
                    return;
                }
                bcrypt.compare(password, res.rows[0].password, function (err, responseObj) {
                    if (!responseObj) {
                        reject(false);
                        return;
                    }
                    var resultTrueObj = {
                        id: res.rows[0].id,
                        name: res.rows[0].uname,
                        stat: true,
                        type: res.rows[0].usertype,
                    };
                    resolve(resultTrueObj);
                });
            }).catch(function (err) {
                if (err) {
                    var message = "error in indexservice file on login function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(false);
            });
        });
    };
    /**
     * function for checking username existance
     * @param {*} uname
     */
    IndexServices.prototype.checkUsername = function (uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var resultObj = {
                stat: false,
            };
            var checkUserNameQueryselect = "SELECT count(*) FROM employee WHERE uname = $1";
            _this.dbOperations(checkUserNameQueryselect, [uname]).then(function (res) {
                if (res.rows[0].count <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = " error in indexservice file on checkusername function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    return IndexServices;
}(dao_1.default));
exports.default = IndexServices;

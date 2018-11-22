"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:26
 * @modify date 2018-09-20 15:15:26
 * @desc [description]
 */
var bcrypt = require("bcryptjs");
var Promise = require("promise");
var dao_1 = tslib_1.__importDefault(require("../../../dao"));
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var UserEditServices = /** @class */ (function (_super) {
    tslib_1.__extends(UserEditServices, _super);
    function UserEditServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * updateall function for updating all user details
     * @param {*} userObj
     */
    UserEditServices.prototype.updateAll = function (userObj) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var stat = false;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(userObj.body.password, salt, function (updareErr, hash) {
                    if (updareErr) {
                        console.log(" error in bycrypt");
                    }
                    var updateAllQueryupdate = "UPDATE employee SET  name=$1, uname=$2, address=$3, email=$4, password=$5, phone=$6 WHERE id=$7";
                    var params = [userObj.body.name, userObj.body.uname, userObj.body.address, userObj.body.email, hash, userObj.body.phone, userObj.body.id];
                    self.dbOperations(updateAllQueryupdate, params).then(function (res) {
                        if (res.rowCount <= 0) {
                            reject(stat);
                            return;
                        }
                        resolve(res);
                    }).catch(function (dbErr) {
                        if (dbErr) {
                            var message = "error in usereditservices file on updateall function";
                            var timeStamp = new Date();
                            eventEmitter_1.default.emit("error", message, timeStamp, err);
                        }
                        reject(stat);
                    });
                });
            });
        });
    };
    /**
     * function for username existance check
     * @param {*} uname
     */
    UserEditServices.prototype.checkUsername = function (uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var checkUserNameQueryselect = "SELECT count(*) FROM employee WHERE uname = $1";
            var params = uname;
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(checkUserNameQueryselect, [params]).then(function (res) {
                if (res.rows[0].count > 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on checkusername function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    /**
     * function for name update
     * @param {*} id
     * @param {*} name
     */
    UserEditServices.prototype.updateName = function (id, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var updateNameQueryupdate = "UPDATE employee SET  name=$1 WHERE id=$2";
            var params = [name, id];
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(updateNameQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on updatename function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    /**
     * function for username update
     * @param {*} id
     * @param {*} uname
     */
    UserEditServices.prototype.updateUname = function (id, uname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var updateUnameQueryupdate = "UPDATE employee SET  uname=$1 WHERE id=$2";
            var params = [uname, id];
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(updateUnameQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on updateuname function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    /**
     * function for address update
     * @param {*} id
     * @param {*} address
     */
    UserEditServices.prototype.updateAddress = function (id, address) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var updateAddressQueryupdate = "UPDATE employee SET  address=$1 WHERE id=$2";
            var params = [address, id];
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(updateAddressQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on updateaddress function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    /**
     * function for email update
     * @param {*} id
     * @param {*} email
     */
    UserEditServices.prototype.updateEmail = function (id, email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var updateEmailQueryupdate = "UPDATE employee SET  email=$1 WHERE id=$2";
            var params = [email, id];
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(updateEmailQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on updateemail function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    /**
     * function for password update
     * @param {*} id
     * @param {*} password
     */
    UserEditServices.prototype.updatePassword = function (id, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (errr, hash) {
                    if (errr) {
                        console.log("error in bycript");
                    }
                    var updatePasswordQueryupdate = "UPDATE employee SET  password=$1 WHERE id=$2";
                    var params = [hash, id];
                    var resultObj = {
                        stat: false,
                    };
                    _this.dbOperations(updatePasswordQueryupdate, params).then(function (res) {
                        if (res.rowCount <= 0) {
                            reject(resultObj);
                            return;
                        }
                        resultObj.stat = true;
                        resolve(resultObj);
                    }).catch(function (er) {
                        if (er) {
                            var message = "error in usereditservices file on updatepassword function";
                            var timeStamp = new Date();
                            eventEmitter_1.default.emit("error", message, timeStamp, err);
                        }
                        reject(resultObj);
                    });
                });
            });
        });
    };
    /**
     * function for phone update
     * @param {*} id
     * @param {*} phone
     */
    UserEditServices.prototype.updatePhone = function (id, phone) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var updatePhoneQueryupdate = "UPDATE employee SET  phone=$1 WHERE id=$2";
            var params = [phone, id];
            var resultObj = {
                stat: false,
            };
            _this.dbOperations(updatePhoneQueryupdate, params).then(function (res) {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch(function (err) {
                if (err) {
                    var message = "error in usereditservices file on updatephone function";
                    var timeStamp = new Date();
                    eventEmitter_1.default.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    };
    return UserEditServices;
}(dao_1.default));
exports.default = UserEditServices;

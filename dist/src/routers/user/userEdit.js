"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:31:11
 * @modify date 2018-09-20 15:17:19
 * @desc [description]
 */
var express = require("express");
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var userEditServices_1 = tslib_1.__importDefault(require("../../services/user/userEditServices"));
var userEditRouter = express.Router();
// code for creating service class
var userEdit = new userEditServices_1.default();
// code for user name existance check
userEditRouter.post("/checkusername", function (req, response) {
    var uname = req.body.uname;
    userEdit.checkUsername(uname).then(function (res) {
        if (res.stat) {
            response.send(true);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
//  code for user all details update  request
userEditRouter.post("/updateall", function (req, response) {
    userEdit.updateAll(req).then(function (res) {
        if (res.rowCount > 0) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated all details";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj) {
            response.send(false);
        }
    });
});
//  code for  name update  request
userEditRouter.post("/updatename", function (req, response) {
    userEdit.updateName(req.body.id, req.body.name).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated name";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj) {
            response.send(false);
        }
    });
});
//  code for  username update  request
userEditRouter.post("/updateuname", function (req, response) {
    userEdit.updateUname(req.body.id, req.body.uname).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated uname";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
//  code for  address update  request
userEditRouter.post("/updateaddress", function (req, response) {
    userEdit.updateAddress(req.body.id, req.body.address).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated address";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
//  code for  email update  request
userEditRouter.post("/updateemail", function (req, response) {
    userEdit.updateEmail(req.body.id, req.body.email).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated email";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
//  code for  password update  request
userEditRouter.post("/updatepassword", function (req, response) {
    userEdit.updatePassword(req.body.id, req.body.password).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated password";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
//  code for  phone update  request
userEditRouter.post("/updatephone", function (req, response) {
    userEdit.updatePhone(req.body.id, req.body.phone).then(function (res) {
        if (res.stat) {
            response.send(true);
            var message = "user id = " + req.body.id + " is updated phone number";
            var timeStamp = new Date();
            eventEmitter_1.default.emit("info", message, timeStamp);
        }
        else {
            response.send(false);
        }
    }).catch(function (statusObj) {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
exports.default = userEditRouter;

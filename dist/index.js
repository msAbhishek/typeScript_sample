"use strict";
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:30:43
 * @modify date 2018-10-03 09:41:21
 * @desc [description]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express = require("express");
var app = express();
var child_process_1 = require("child_process");
var email_1 = tslib_1.__importDefault(require("./email"));
// import * as nodemailer from "nodemailer";
var eventEmitter_1 = tslib_1.__importDefault(require("./eventEmitter"));
var loggerWinston_1 = tslib_1.__importDefault(require("./loggerWinston"));
var adminHome_1 = tslib_1.__importDefault(require("./src/routers/admin/adminHome"));
var adminSearch_1 = tslib_1.__importDefault(require("./src/routers/admin/adminSearch"));
var adminView_1 = tslib_1.__importDefault(require("./src/routers/admin/adminView"));
var userEdit_1 = tslib_1.__importDefault(require("./src/routers/user/userEdit"));
var userHome_1 = tslib_1.__importDefault(require("./src/routers/user/userHome"));
var indexServices_1 = tslib_1.__importDefault(require("./src/services/indexServices"));
app.use(express.static("public"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
// code for forking email file and spawn batch file
// Initialising the emailsender
// tslint:disable-next-line:no-unused-expression
new email_1.default();
var myBatFilePath = "D:\\mini_one\\myTestBatfile.bat";
var bat = child_process_1.spawn("cmd.exe", ["/c", myBatFilePath]);
bat.stdout.on("data", function (data) {
    console.log(unescape(data));
});
// code for routing
app.use("/userhome", userHome_1.default);
app.use("/useredit", userEdit_1.default);
app.use("/adminhome", adminHome_1.default);
app.use("/adminview", adminView_1.default);
app.use("/adminsearch", adminSearch_1.default);
// code for creating indexservices class
var regServe = new indexServices_1.default();
// code for new user regisration
app.post("/reg", function (req, response) {
    regServe.register(req).then(function (registerObj) {
        response.send(registerObj);
        var message = "new user is registered as" + req.body.uname;
        var timeStamp = new Date();
        eventEmitter_1.default.emit("info", message, timeStamp);
    }).catch(function () {
        response.send(false);
    });
});
// code for user login check
app.post("/log", function (req, response) {
    regServe.login(req.body.uname, req.body.password).then(function (loginObj) {
        if (!loginObj.stat) {
            response.send(false);
            return;
        }
        response.send(loginObj);
        var message = " user logined as = " + req.body.uname;
        var timeStamp = new Date();
        eventEmitter_1.default.emit("info", message, timeStamp);
    }).catch(function () {
        response.send(false);
    });
});
// code for user name existance check
app.post("/checkusername", function (req, response) {
    var uname = req.body.uname;
    regServe.checkUsername(uname).then(function (checkUserNameObj) {
        if (checkUserNameObj.stat) {
            response.send(checkUserNameObj);
        }
    }).catch(function (errorObj) {
        response.send(errorObj);
    });
});
app.listen(3001, function () {
    loggerWinston_1.default.log({
        level: "info",
        message: "sever started on port 3001",
    });
});

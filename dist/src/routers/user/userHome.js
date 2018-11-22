"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:31:04
 * @modify date 2018-09-20 15:17:10
 * @desc [description]
 */
var express = require("express");
var fs = require("fs");
var eventEmitter_1 = tslib_1.__importDefault(require("../../../eventEmitter"));
var userHomeServices_1 = tslib_1.__importDefault(require("../../services/user/userHomeServices"));
var userHomeRouter = express.Router();
// code for creating service classes
var userhome = new userHomeServices_1.default();
//  code for user name details  request
userHomeRouter.post("/getdetails", function (req, response) {
    userhome.getDetails(req.body.id).then(function (res) {
        response.send(res);
    }).catch(function (statusObj) {
        response.send(statusObj);
    });
});
//  code for  user image upload  request
userHomeRouter.post("/uploadImage", function (req, response) {
    var id = req.body.id;
    var img = req.body.img;
    var path = "./public/testimg/user_Image/" + id + ".jpg";
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, "base64");
    fs.writeFile(path, buf, function () {
        console.log(" temp image created");
    });
    response.send(true);
    var message = " user id = " + id + " updated the image";
    var timeStamp = new Date();
    eventEmitter_1.default.emit("info", message, timeStamp);
});
exports.default = userHomeRouter;

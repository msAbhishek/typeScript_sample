"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:10
 * @modify date 2018-09-20 15:17:41
 * @desc [description]
 */
var express = require("express");
var adminSearchServices_1 = tslib_1.__importDefault(require("../../services/admin/adminSearchServices"));
var adminSearchRouter = express.Router();
//  code for creating service classes
var adminSearch = new adminSearchServices_1.default();
// code for  search
adminSearchRouter.post("/list", function (req, response) {
    var uname = req.body.uname;
    var id = req.body.id;
    uname += "%";
    adminSearch.list(id, uname).then(function (res) {
        response.send(res);
    }).catch(function (status) {
        response.send(status);
    });
});
exports.default = adminSearchRouter;

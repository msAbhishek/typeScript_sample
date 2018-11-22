"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:16
 * @modify date 2018-09-20 15:17:34
 * @desc [description]
 */
var express = require("express");
var adminViewServices_1 = tslib_1.__importDefault(require("../../services/admin/adminViewServices"));
var adminViewRouter = express.Router();
// code for creating serive class
var adminView = new adminViewServices_1.default();
// code for listing all the admins in admin page
adminViewRouter.post("/listall", function (req, response) {
    adminView.listAll(req.body.id).then(function (res) {
        response.send(res);
    }).catch(function (status) {
        response.send(status);
    });
});
// code for listing a single admin in admin page
adminViewRouter.post("/listsingle", function (req, response) {
    adminView.listSingle(req.body.id).then(function (res) {
        response.send(res);
    }).catch(function (status) {
        response.send(status);
    });
});
exports.default = adminViewRouter;

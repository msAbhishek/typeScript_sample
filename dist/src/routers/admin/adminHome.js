"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:07
 * @modify date 2018-09-20 15:17:48
 * @desc [description]
 */
var express = require("express");
var adminHomeServices_1 = tslib_1.__importDefault(require("../../services/admin/adminHomeServices"));
var adminHomeRouter = express.Router();
//  code for creating service class
var adminHome = new adminHomeServices_1.default();
// code for listing all the users in admin page
adminHomeRouter.post("/listall", function (req, response) {
    adminHome.listAll().then(function (res) {
        response.send(res);
    }).catch(function (status) {
        response.send(status);
    });
});
// code for listing a single user in admin page
adminHomeRouter.post("/listsingle", function (req, response) {
    adminHome.listSingle(req.body.id).then(function (res) {
        response.send(res);
    }).catch(function (status) {
        response.send(status);
    });
});
// code for making a  user as admin
adminHomeRouter.post("/makeasadmin", function (req, response) {
    var stat = false;
    adminHome.makeAdmin(req.body.uname).then(function (res) {
        if (res.rowCount > 0) {
            response.send(true);
        }
        else {
            response.send(stat);
        }
    }).catch(function (status) {
        if (!status) {
            response.send(stat);
        }
    });
});
// code for deleting a  user by admin
adminHomeRouter.post("/deleteuser", function (req, response) {
    var stat = false;
    adminHome.deleteUser(req.body.uname).then(function (res) {
        if (res.rowCount > 0) {
            response.send(true);
        }
        else {
            response.send(stat);
        }
    }).catch(function (status) {
        if (!status) {
            response.send(stat);
        }
    });
});
exports.default = adminHomeRouter;

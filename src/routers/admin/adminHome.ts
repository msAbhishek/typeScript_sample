/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:07
 * @modify date 2018-09-20 15:17:48
 * @desc [description]
 */
import express = require("express");
import AdminHomeServices from "../../services/admin/adminHomeServices";
const adminHomeRouter = express.Router();
//  code for creating service class
const adminHome = new AdminHomeServices();

// code for listing all the users in admin page
adminHomeRouter.post("/listall", (req: any, response: any) => {
    adminHome.listAll().then((res: any) => {
        response.send(res);
    }).catch((status) => {
        response.send(status);
    });
});

// code for listing a single user in admin page
adminHomeRouter.post("/listsingle", (req: any, response: any) => {
    adminHome.listSingle(req.body.id).then((res) => {
        response.send(res);
    }).catch((status) => {
        response.send(status);
    });
});

// code for making a  user as admin
adminHomeRouter.post("/makeasadmin", (req: any, response: any) => {
    const stat: boolean = false;
    adminHome.makeAdmin(req.body.uname).then((res: any) => {
        if (res.rowCount > 0) {
            response.send(true);
        } else {
            response.send(stat);
        }
    }).catch((status) => {
        if (!status) {
            response.send(stat);
        }
    });
});

// code for deleting a  user by admin
adminHomeRouter.post("/deleteuser", (req: any, response: any) => {
    const stat: boolean = false;
    adminHome.deleteUser(req.body.uname).then((res: any) => {
        if (res.rowCount > 0) {
            response.send(true);
        } else {
            response.send(stat);
        }
    }).catch((status) => {
        if (!status) {
            response.send(stat);
        }
    });
});
export default adminHomeRouter;

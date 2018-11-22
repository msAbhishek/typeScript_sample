/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:16
 * @modify date 2018-09-20 15:17:34
 * @desc [description]
 */
import express = require("express");
import AdminViewServices from "../../services/admin/adminViewServices";
const adminViewRouter = express.Router();
// code for creating serive class
const adminView = new AdminViewServices();

// code for listing all the admins in admin page
adminViewRouter.post("/listall", (req: any, response: any) => {
    adminView.listAll(req.body.id).then((res) => {
        response.send(res);
    }).catch((status) => {
        response.send(status);
    });
});

// code for listing a single admin in admin page
adminViewRouter.post("/listsingle", (req: any, response: any) => {
    adminView.listSingle(req.body.id).then((res) => {
        response.send(res);
    }).catch((status) => {
        response.send(status);
    });
});
export default adminViewRouter;

/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:34:10
 * @modify date 2018-09-20 15:17:41
 * @desc [description]
 */
import express = require("express");
import AdminSearchServices from "../../services/admin/adminSearchServices";
const adminSearchRouter = express.Router();
//  code for creating service classes
const adminSearch = new AdminSearchServices();

// code for  search
adminSearchRouter.post("/list", (req: any, response: any) => {
    let uname: string = req.body.uname;
    const id: number = req.body.id;
    uname += "%";
    adminSearch.list(id, uname).then((res: any) => {
        response.send(res);
    }).catch((status) => {
        response.send(status);
    });
});
export default adminSearchRouter;

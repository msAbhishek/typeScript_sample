/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:31:04
 * @modify date 2018-09-20 15:17:10
 * @desc [description]
 */
import express = require("express");
import fs = require("fs");
import myEmitter from "../../../eventEmitter";
import UserHomeServices from "../../services/user/userHomeServices";
const userHomeRouter = express.Router();
// code for creating service classes
const userhome = new UserHomeServices();

//  code for user name details  request
userHomeRouter.post("/getdetails", (req: any, response: any) => {
    userhome.getDetails(req.body.id).then((res: any) => {
        response.send(res);
    }).catch((statusObj: any) => {
        response.send(statusObj);
    });
});

//  code for  user image upload  request
userHomeRouter.post("/uploadImage", (req: any, response: any) => {
    const id: number = req.body.id;
    const img: string = req.body.img;
    const path: string = "./public/testimg/user_Image/" + id + ".jpg";
    const data: any = img.replace(/^data:image\/\w+;base64,/, "");
    const buf: any = new Buffer(data, "base64");
    fs.writeFile(path, buf, () => {
        console.log(" temp image created");
    });
    response.send(true);
    const message: string = " user id = " + id + " updated the image";
    const timeStamp: Date = new Date();
    myEmitter.emit("info", message, timeStamp);
});
export default userHomeRouter;

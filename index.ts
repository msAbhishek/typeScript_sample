/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:30:43
 * @modify date 2018-10-03 09:41:21
 * @desc [description]
 */

import  express = require("express");
const app = express();
import { spawn } from "child_process";
import Mailsender from "./email";
// import * as nodemailer from "nodemailer";
import myEmitter from "./eventEmitter";
import logger from "./loggerWinston";
import adminHomeRouter from "./src/routers/admin/adminHome";
import adminSearchRouter from "./src/routers/admin/adminSearch";
import adminViewRouter from "./src/routers/admin/adminView";
import userEditRouter from "./src/routers/user/userEdit";
import userHomeRouter from "./src/routers/user/userHome";
import IndexServices from "./src/services/indexServices";
app.use(express.static("public"));
import bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
// code for forking email file and spawn batch file
// Initialising the emailsender
// tslint:disable-next-line:no-unused-expression
new Mailsender();
const myBatFilePath: string = "D:\\mini_one\\myTestBatfile.bat";
const bat: any = spawn("cmd.exe", ["/c", myBatFilePath]);
bat.stdout.on("data", (data: any) => {
    console.log(unescape(data));
});
// code for routing
app.use("/userhome", userHomeRouter);
app.use("/useredit", userEditRouter);
app.use("/adminhome", adminHomeRouter);
app.use("/adminview", adminViewRouter);
app.use("/adminsearch", adminSearchRouter);
// code for creating indexservices class
const regServe = new IndexServices();

// code for new user regisration
app.post("/reg", (req: any, response: any) => {
    regServe.register(req).then((registerObj: any) => {
        response.send(registerObj);
        const message: string = "new user is registered as" + req.body.uname;
        const timeStamp: Date = new Date();
        myEmitter.emit("info", message, timeStamp);
    }).catch(() => {
        response.send(false);
    });
});

// code for user login check
app.post("/log", (req: any, response: any) => {
    regServe.login(req.body.uname, req.body.password).then((loginObj: any) => {
        if (!loginObj.stat) {
            response.send(false);
            return;
        }
        response.send(loginObj);
        const message: string = " user logined as = " + req.body.uname;
        const timeStamp: Date = new Date();
        myEmitter.emit("info", message, timeStamp);
    }).catch(() => {
        response.send(false);
    });
});

// code for user name existance check
app.post("/checkusername", (req: any, response: any) => {
    const uname: string = req.body.uname;
    regServe.checkUsername(uname).then((checkUserNameObj: any) => {
        if (checkUserNameObj.stat) {
            response.send(checkUserNameObj);
        }
    }).catch((errorObj: object) => {
        response.send(errorObj);
    });
});

app.listen(3001, () => {
    logger.log({
        level: "info",
        message: "sever started on port 3001",
    });
});

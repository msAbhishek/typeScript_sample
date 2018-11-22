/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:31:11
 * @modify date 2018-09-20 15:17:19
 * @desc [description]
 */
import express = require("express");
import myEmitter from "../../../eventEmitter";
import UserEditServices from "../../services/user/userEditServices";
const userEditRouter = express.Router();
// code for creating service class
const userEdit = new UserEditServices();

// code for user name existance check
userEditRouter.post("/checkusername", (req: any, response: any) => {
    const uname: string = req.body.uname;
    userEdit.checkUsername(uname).then((res: any) => {
        if (res.stat) {
            response.send(true);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});

//  code for user all details update  request
userEditRouter.post("/updateall", (req: any, response: any) => {
    userEdit.updateAll(req).then((res: any) => {
        if (res.rowCount > 0) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated all details";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj) {
            response.send(false);
        }
    });
});

//  code for  name update  request
userEditRouter.post("/updatename", (req: any, response: any) => {
    userEdit.updateName(req.body.id, req.body.name).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated name";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj) {
            response.send(false);
        }
    });
});

//  code for  username update  request
userEditRouter.post("/updateuname", (req: any, response: any) => {
    userEdit.updateUname(req.body.id, req.body.uname).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated uname";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});

//  code for  address update  request
userEditRouter.post("/updateaddress", (req: any, response: any) => {
    userEdit.updateAddress(req.body.id, req.body.address).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated address";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});

//  code for  email update  request
userEditRouter.post("/updateemail", (req: any, response: any) => {
    userEdit.updateEmail(req.body.id, req.body.email).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated email";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});

//  code for  password update  request
userEditRouter.post("/updatepassword", (req: any, response: any) => {
    userEdit.updatePassword(req.body.id, req.body.password).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated password";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});

//  code for  phone update  request
userEditRouter.post("/updatephone", (req: any, response: any) => {
    userEdit.updatePhone(req.body.id, req.body.phone).then((res: any) => {
        if (res.stat) {
            response.send(true);
            const message: string = "user id = " + req.body.id + " is updated phone number";
            const timeStamp: Date = new Date();
            myEmitter.emit("info", message, timeStamp);
        } else {
            response.send(false);
        }
    }).catch((statusObj) => {
        if (!statusObj.stat) {
            response.send(false);
        }
    });
});
export default userEditRouter;

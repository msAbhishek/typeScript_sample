/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:26
 * @modify date 2018-09-20 15:15:26
 * @desc [description]
 */
import bcrypt = require("bcryptjs");
import Promise = require("promise");
import Databaseclass from "../../../dao";
import myEmitter from "../../../eventEmitter";
interface IresultObj {
    stat: boolean;
}
export default class UserEditServices extends Databaseclass {
    /**
     * updateall function for updating all user details
     * @param {*} userObj
     */
    public updateAll(userObj): Promise<any> {
        const self = this;
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            bcrypt.genSalt(10, (err: Error, salt: any) => {
                bcrypt.hash(userObj.body.password, salt, (updareErr: Error, hash: any) => {
                    if ( updareErr ) {
                        console.log(" error in bycrypt");
                    }
                    const updateAllQueryupdate: string = "UPDATE employee SET  name=$1, uname=$2, address=$3, email=$4, password=$5, phone=$6 WHERE id=$7";
                    const params: any[] = [userObj.body.name, userObj.body.uname, userObj.body.address, userObj.body.email, hash, userObj.body.phone, userObj.body.id];
                    self.dbOperations(updateAllQueryupdate, params).then((res: any) => {
                        if (res.rowCount <= 0) {
                            reject(stat);
                            return;
                        }
                        resolve(res);
                    }).catch((dbErr: any) => {
                        if (dbErr) {
                            const message: string = "error in usereditservices file on updateall function";
                            const timeStamp: Date = new Date();
                            myEmitter.emit("error", message, timeStamp, err);
                        }
                        reject(stat);
                    });
                });
            });
        });
    }
    /**
     * function for username existance check
     * @param {*} uname
     */
    public checkUsername(uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const checkUserNameQueryselect: string = "SELECT count(*) FROM employee WHERE uname = $1";
            const params: string = uname;
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(checkUserNameQueryselect, [params]).then((res: any) => {
                if (res.rows[0].count > 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on checkusername function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
    /**
     * function for name update
     * @param {*} id
     * @param {*} name
     */
    public updateName(id: number, name: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const updateNameQueryupdate: string = "UPDATE employee SET  name=$1 WHERE id=$2";
            const params: any[] = [name, id];
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(updateNameQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on updatename function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
    /**
     * function for username update
     * @param {*} id
     * @param {*} uname
     */
    public updateUname(id: number, uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const updateUnameQueryupdate: string = "UPDATE employee SET  uname=$1 WHERE id=$2";
            const params: any[] = [uname, id];
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(updateUnameQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on updateuname function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
    /**
     * function for address update
     * @param {*} id
     * @param {*} address
     */
    public updateAddress(id: number, address: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const updateAddressQueryupdate: string = "UPDATE employee SET  address=$1 WHERE id=$2";
            const params: any[] = [address, id];
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(updateAddressQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on updateaddress function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
    /**
     * function for email update
     * @param {*} id
     * @param {*} email
     */
    public updateEmail(id: number, email: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const updateEmailQueryupdate: string = "UPDATE employee SET  email=$1 WHERE id=$2";
            const params: any[] = [email, id];
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(updateEmailQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on updateemail function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
    /**
     * function for password update
     * @param {*} id
     * @param {*} password
     */
    public updatePassword(id: number, password: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            bcrypt.genSalt(10, (err: Error, salt: any) => {
                bcrypt.hash(password, salt, (errr: Error, hash: any) => {
                    if ( errr ) {
                        console.log("error in bycript");
                    }
                    const updatePasswordQueryupdate: string = "UPDATE employee SET  password=$1 WHERE id=$2";
                    const params: any[] = [hash, id];
                    const resultObj: IresultObj = {
                        stat: false,
                    };
                    this.dbOperations(updatePasswordQueryupdate, params).then((res: any) => {
                        if (res.rowCount <= 0) {
                            reject(resultObj);
                            return;
                        }
                        resultObj.stat = true;
                        resolve(resultObj);
                    }).catch((er) => {
                        if (er) {
                            const message: string = "error in usereditservices file on updatepassword function";
                            const timeStamp: Date = new Date();
                            myEmitter.emit("error", message, timeStamp, err);
                        }
                        reject(resultObj);
                    });
                });
            });
        });
    }
    /**
     * function for phone update
     * @param {*} id
     * @param {*} phone
     */
    public updatePhone(id: number, phone: number): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const updatePhoneQueryupdate: string = "UPDATE employee SET  phone=$1 WHERE id=$2";
            const params: any[] = [phone, id];
            const resultObj: IresultObj = {
                stat: false,
            };
            this.dbOperations(updatePhoneQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = "error in usereditservices file on updatephone function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
}

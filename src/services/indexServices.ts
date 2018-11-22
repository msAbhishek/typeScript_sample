/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:09
 * @modify date 2018-10-03 09:47:20
 * @desc [description]
 */
import bcrypt = require("bcryptjs");
import fs = require("fs");
import Promise = require("promise");
import Databaseclass from "../../dao";
import myEmitter from "../../eventEmitter";
interface IloginObj {
    id: number;
    name: string;
    stat: boolean;
    type: string;
}
interface IunameObj {
    stat: boolean;
}
export default class IndexServices extends Databaseclass {
    /**
     * register function for registering new user
     * @param {*} registerObj
     */
    public register(userObj: any): Promise<any> {
        const self = this;
        return new Promise((resolve: any, reject: any) => {
            const type: string = "user";
            const password: string = userObj.body.password;
            const stat: boolean = true;
            const params: string[] = [userObj.body.name, userObj.body.uname, userObj.body.address, userObj.body.email, userObj.body.password, userObj.body.phone, type];
            bcrypt.genSalt(10, (err: Error, salt: any) => {
                bcrypt.hash(password, salt, (errr: Error, hash: any) => {
                    if (errr) {
                        params[4] = password;
                    }
                    params[4] = hash;
                    const registerQueryinsert: string = "INSERT INTO employee(name,uname,address,email,password,phone,usertype) values($1,$2,$3,$4,$5,$6,$7)";
                    self.dbOperations(registerQueryinsert, params).then(() => {
                        const registerQueryselect: string = "SELECT * FROM employee WHERE uname =$1";
                        const paramss: string = userObj.body.uname;
                        return self.defaultImageQuery(registerQueryselect, paramss);
                    }).then((res: any) => {
                        resolve(stat);
                        fs.createReadStream("./public/testimg/avatarmen.jpg").pipe(fs.createWriteStream("./public/testimg/user_Image/" + res.rows[0].id + ".jpg"));
                    }).catch((er: any) => {
                        if (er) {
                            const message: string = " error in indexservice file on register function";
                            const timeStamp: Date = new Date();
                            myEmitter.emit("error", message, timeStamp, err);
                        }
                        reject(false);
                    });
                });
            });
        });
    }

    /**
     * database call function to set default image
     * @param {*} registerQuery_select
     * @param {*} params
     */
    public defaultImageQuery(registerQueryselect: string, params: any): Promise<any> {
        return this.dbOperations(registerQueryselect, [params]);
    }
    /**
     * login function
     * @param {*} uname
     * @param {*} password
     */
    public login(uname: string, password: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const loginQueryselect: string = "SELECT * FROM employee WHERE uname =$1";
            const Params: string = uname;
            this.dbOperations(loginQueryselect, [Params]).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(false);
                    return;
                }
                bcrypt.compare(password, res.rows[0].password, (err: Error, responseObj: boolean) => {
                    if (!responseObj) {
                        reject(false);
                        return;
                    }
                    const resultTrueObj: IloginObj = {
                        id: res.rows[0].id,
                        name: res.rows[0].uname,
                        stat: true,
                        type: res.rows[0].usertype,
                    };
                    resolve(resultTrueObj);
                });

            }).catch((err: any) => {
                if (err) {
                    const message: string = "error in indexservice file on login function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(false);
            });
        });
    }
    /**
     * function for checking username existance
     * @param {*} uname
     */
    public checkUsername(uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const resultObj: IunameObj = {
                stat: false,
            };
            const checkUserNameQueryselect: string = "SELECT count(*) FROM employee WHERE uname = $1";
            this.dbOperations(checkUserNameQueryselect, [uname]).then((res: any) => {
                if (res.rows[0].count <= 0) {
                    reject(resultObj);
                    return;
                }
                resultObj.stat = true;
                resolve(resultObj);
            }).catch((err: any) => {
                if (err) {
                    const message: string = " error in indexservice file on checkusername function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultObj);
            });
        });
    }
}

/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:16:50
 * @modify date 2018-09-20 15:16:50
 * @desc [description]
 */
import Promise = require("promise");
import Databaseclass from "../../../dao";
import myEmitter from "../../../eventEmitter";
interface IresultObj {
    count: number;
    stat: boolean;
    user: string;
}
export default class AdminHomeServices extends Databaseclass {
    /**
     * listall function for listing admins in admin page
     */
    public listAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            const stat: boolean = false;
            const listAllQueryselect: string = "SELECT * FROM employee WHERE usertype = $1 ORDER BY name";
            const params: string[] = ["user"];
            this.dbOperations(listAllQueryselect, params).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                const resultObj: IresultObj = {
                    count: res.rows.length,
                    stat: true,
                    user: res.rows,
                };
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = " error in adminhomeserivces file on listall function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
    /**
     * listsingle function for detailing a user in admin page
     * @param {*} id
     */
    public listSingle(id: number): Promise<any> { //
        return new Promise((resolve, reject) => {
            const stat: boolean = false;
            const listSingleQueryselect: string = "SELECT * FROM employee WHERE id = $1";
            const params: number[] = [id];
            this.dbOperations(listSingleQueryselect, params).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                const resultObj: IresultObj = {
                    count: 1,
                    stat: true,
                    user: res.rows[0],
                };
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message: string = " error in adminhomeserivces file on listsingle function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
    /**
     * makeadmin function for making a user as admin
     * @param {*} uname
     */
    public makeAdmin(uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            const makeAdminQueryupdate: string = "UPDATE employee SET  usertype = $1 WHERE uname =$2";
            const params: any[] = ["admin", uname];
            this.dbOperations(makeAdminQueryupdate, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(stat);
                    return;
                }
                resolve(res);
            }).catch((err) => {
                if (err) {
                    const message: string = " error in adminhomeserivces file on makeadmin function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
    /**
     * deleteUser function for deleting a user
     * @param {*} uname
     */
    public deleteUser(uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            const deleteUserQuerydelete: string = "DELETE FROM employee WHERE uname =$1";
            const params: string[] = [uname];
            this.dbOperations(deleteUserQuerydelete, params).then((res: any) => {
                if (res.rowCount <= 0) {
                    reject(stat);
                    return;
                }
                resolve(res);
            }).catch((err) => {
                if (err) {
                    const message: string = " error in adminhomeserivces file on deleteuser function";
                    const timeStamp: Date  = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
}

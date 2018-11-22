/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:41
 * @modify date 2018-09-20 15:15:41
 * @desc [description]
 */
import Promise = require("promise");
import Databaseclass from "../../../dao";
import myEmitter from "../../../eventEmitter";
export default class AdminViewServices extends Databaseclass {
    /**
     * listall function for listing admins in admin page
     * @param {*} id
     */
    public listAll(id: number): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            const listAllQueryselect: string = "SELECT * FROM employee WHERE usertype = $1 AND id != $2 ORDER BY name";
            const params: any[] = ["admin", id];
            this.dbOperations(listAllQueryselect, params).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                const resultObj = {
                    count: res.rows.length,
                    stat: true,
                    user: res.rows,
                };
                resolve(resultObj);
            }).catch((err: any) => {
                if (err) {
                    const message: string = " error in adminviewserivces file on listall function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
    /**
     * listsingle function for detailing an admin in admin page
     * @param {*} id
     */
    public listSingle(id: number): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            const listsingleQueryselect: string = "SELECT * FROM employee WHERE id = $1";
            const params: number[] = [id];
            this.dbOperations(listsingleQueryselect, params).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                const resultObj = {
                    stat: true,
                    user: res.rows[0],
                };
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message = " error in adminviewserivces file on listsingle function";
                    const timeStamp = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
}

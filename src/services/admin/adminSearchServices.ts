/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:47
 * @modify date 2018-09-20 15:15:47
 * @desc [description]
 */
import Promise = require("promise");
import Databaseclass from "../../../dao";
import myEmitter from "../../../eventEmitter";
export default class AdminSearchServices extends Databaseclass {
    /**
     * list function for searching
     * @param {*} id
     * @param {*} uname
     */
    public list(id: number, uname: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const stat: boolean = false;
            const listQueryselect: string = "SELECT * FROM employee WHERE uname LIKE $1 AND id != $2 ORDER BY name";
            const params: any[] = [uname, id];
            this.dbOperations(listQueryselect, params).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(stat);
                    return;
                }
                const searchObj = {
                    stat: true,
                    user: res.rows,
                };
                resolve(searchObj);
            }).catch((err) => {
                if (err) {
                    const message: string = " error in adminsearchserivces file on list function";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(stat);
            });
        });
    }
}

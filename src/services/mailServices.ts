/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-10 08:57:20
 * @modify date 2018-10-10 08:57:20
 * @desc [description]
 */

import Promise = require("promise");
import Databaseclass from "../../dao";
import myEmitter from "../../eventEmitter";
export default class MailServices extends Databaseclass {
    public getEmails(): Promise<any> {

        return new Promise((resolve: any, reject: any) => {
            const getEmailQuery: string = "SELECT email FROM employee WHERE id != $1";
            this.dbOperations(getEmailQuery, [0]).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(false);
                    return;
                }
                resolve(res);
            }).catch((err: any) => {
                if (err) {
                    const message = " error in mailservices file on getmail function";
                    const timeStamp = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(false);
            });
        });
    }
}

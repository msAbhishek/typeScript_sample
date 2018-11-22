/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:15:19
 * @modify date 2018-09-20 15:15:19
 * @desc [description]
 */
import Promise = require("promise");
import Databaseclass from "../../../dao";
import myEmitter from "../../../eventEmitter";
interface IresultFalse {
    id: string;
    stat: boolean;
}
interface IresultTrue {
    address: string;
    email: string;
    id: number;
    name: string;
    password: string;
    phone: number;
    stat: boolean;
    uname: string;
}
export default class UserHomeServices extends Databaseclass {
    /**
     * getdetails function for listing user in user home page
     * @param {*} id
     */
    public getDetails(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const getDetailsQueryselect: string = "SELECT * FROM employee WHERE id = $1";
            const params = id;
            const resultFalseObj: IresultFalse = { id: "null", stat: false };
            this.dbOperations(getDetailsQueryselect, [params]).then((res: any) => {
                if (res.rows.length <= 0) {
                    reject(resultFalseObj);
                    return;
                }
                const resultObj: IresultTrue = {
                    address: res.rows[0].address,
                    email: res.rows[0].email,
                    id: res.rows[0].id,
                    name: res.rows[0].name,
                    password: res.rows[0].password,
                    phone: res.rows[0].phone,
                    stat: true,
                    uname: res.rows[0].uname,
                };
                resolve(resultObj);
            }).catch((err) => {
                if (err) {
                    const message = " error in userhomeservices file on getdetails function";
                    const timeStamp = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
                reject(resultFalseObj);
            });
        });
    }
}

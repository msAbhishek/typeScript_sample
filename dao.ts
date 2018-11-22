/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-20 15:14:34
 * @modify date 2018-09-20 15:14:34
 * @desc [description]
 */
import pg = require("pg");
import Promise = require("promise");
import myEmitter from "./eventEmitter";

export default class Databaseclass {
    public connection: pg.Pool;
    constructor() {
        this.connection = new pg.Pool({
            database: "details",
            host: "localhost",
            password: "postgres",
            port: 5432,
            user: "postgres",
        });
    }
    /**
     * function for executing database queries
     * @param {*} query
     * @param {*} params
     */
    public dbOperations(query: string, params: any): Promise<any> {
        const self: Databaseclass = this;
        return new Promise((resolve: any, reject: any) => {
            self.connection.query(query, params, (err: Error, res: any) => {
                try {
                    if (res.rowCount) {
                        resolve(res);
                    } else if (err) {
                        reject(err);
                        const message: string = "database execution error";
                        const timeStamp: Date = new Date();
                        myEmitter.emit("error", message, timeStamp, err);
                    } else {
                        reject(false);
                    }
                } catch (err) {
                    const message: string = "exception in query execution results";
                    const timeStamp: Date = new Date();
                    myEmitter.emit("error", message, timeStamp, err);
                }
            });
        });
    }
}

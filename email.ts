/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-10 08:55:50
 * @modify date 2018-10-10 08:55:50
 * @desc [description]
 */
import * as nodemailer from "nodemailer";
import MailServices from "./src/services/mailServices";
const mail = new MailServices();
const toMailAddress: string[] = [];
export default class Mailsender {
    constructor() {
        const transporter = nodemailer.createTransport({
            auth: {
                pass: "Ams11@96.am",
                user: "am.soulseeker@gmail.com",
            },
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
        });
        /**
         * scheduling a time interval to send emails at every 5 minutes
         */
        setInterval(() => {
            /**
             * function for retrieving all the user emails from database
             */
            mail.getEmails().then((res: any) => {
                for (let i = 0; i < res.rows.length; i++) {
                    toMailAddress[i] = res.rows[i].email;
                }
            }).catch((status: any) => {
                console.log(status);
            });
            const mailOptions = {
                from: "am.soulseeker@gmail.com",
                html: "<b>Hello world?</b>",
                subject: "Hello",
                text: "Hello world?",
                to: toMailAddress,
            };
            transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
            });
        }, 1000 * 60 * 5);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-10-10 08:55:50
 * @modify date 2018-10-10 08:55:50
 * @desc [description]
 */
var nodemailer = tslib_1.__importStar(require("nodemailer"));
var mailServices_1 = tslib_1.__importDefault(require("./src/services/mailServices"));
var mail = new mailServices_1.default();
var toMailAddress = [];
var Mailsender = /** @class */ (function () {
    function Mailsender() {
        var transporter = nodemailer.createTransport({
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
        setInterval(function () {
            /**
             * function for retrieving all the user emails from database
             */
            mail.getEmails().then(function (res) {
                for (var i = 0; i < res.rows.length; i++) {
                    toMailAddress[i] = res.rows[i].email;
                }
            }).catch(function (status) {
                console.log(status);
            });
            var mailOptions = {
                from: "am.soulseeker@gmail.com",
                html: "<b>Hello world?</b>",
                subject: "Hello",
                text: "Hello world?",
                to: toMailAddress,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
            });
        }, 1000 * 60 * 5);
    }
    return Mailsender;
}());
exports.default = Mailsender;

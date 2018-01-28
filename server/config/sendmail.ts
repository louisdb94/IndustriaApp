import * as nodemailer from 'nodemailer';
import { app } from '../app';
import { pool } from '../app';
import * as jwt from 'jsonwebtoken';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bedrijvenrelaties2018@gmail.com',
        pass: 'Industria2018'
    }
});


export default class MailCtrl {


    // Select single post
    mailToken = (req, res) => {
        const sql = `SELECT * FROM user WHERE email = '${req.params.email}'`;

        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, user) => {
                if (user) {

                    const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds

                    const mailOptions = {
                        from: 'bedrijvenrelaties2018@gmail.com', // sender address
                        to: req.params.email, // list of receivers
                        subject: 'Password reset', // Subject line
                        html: 'Dear user, set here you new password via this link:  ' +
                            'http://localhost:4200/sendmail/' + token// plain text body
                    };

                    transporter.sendMail(mailOptions, function (mailerr, info) {
                        if (mailerr) {
                            console.log(mailerr);
                        } else {
                            console.log(info);
                        }

                    });
                    connection.release();
                    res.status(200).json({ token: token });
                } else {
                    console.log('failed to log in');
                    connection.release();
                    return res.sendStatus(403);
                }
            });
        });
    }
}

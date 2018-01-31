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
                if (user.length > 0) {
                    sendMailBackEnd(user, req, res);
                    connection.release();
                } 
                
                else {
                    addUser(req.params.email, req, res);
                }
            });
        });
    }
}

function sendMailBackEnd(user, req, res){
    console.log("user: ", user);
    const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds

    const mailOptions = {
        from: 'bedrijvenrelaties2018@gmail.com', // sender address
        to: req.params.email, // list of receivers
        subject: 'Password reset', // Subject line
        html: 'Dear user, you can set your new password via this link:  ' +
            'http://localhost:4200/sendmail/' + token// plain text body
    };

    transporter.sendMail(mailOptions, function (mailerr, info) {
        if (mailerr) {
            console.log(mailerr);
        } else {
            console.log(info);
        }
    });
    res.status(200).json({ token: token });
}

function addUser(email, req, res) {
    var rnumber = email.substring(0,8);
    const sql = `INSERT INTO user SET rnumber = '${rnumber}', email = '${email}', role = "Student"`;
    pool.getConnection(function (error, connection) {
        connection.query(sql, (err, result) => {
            if (err) {throw err;}
            var user_fk = result.insertId;
            console.log("user_fk: ", user_fk);

            const sql1 = `INSERT INTO students SET rnumber = '${rnumber}', user_fk = '${user_fk}'`;
            connection.query(sql1, (err, result1) => {
                if (err) {throw err;}
                 var student_fk = result1.insertId;
                 console.log("student_fk: ", student_fk);

                const sql2 = `INSERT INTO education SET student_fk = '${student_fk}'`;
                executeQuery(sql2);
                const sql3 = `INSERT INTO experiences SET student_fk = '${student_fk}'`;
                executeQuery(sql3);
                const sql4 = `INSERT INTO language SET student_fk = '${student_fk}'`;
                executeQuery(sql4);
                const sql5 = `INSERT INTO socialmedia SET student_fk = '${student_fk}'`;
                executeQuery(sql5);
                executeQuery(sql5);
                executeQuery(sql5);
                executeQuery(sql5);
                const sql6 = `INSERT INTO professional SET student_fk = '${student_fk}'`;
                executeQuery(sql6);
                const sql7 = `INSERT INTO skills SET student_fk = '${student_fk}'`;
                executeQuery(sql7);
                const sql8 = `INSERT INTO contact SET student_fk = '${student_fk}'`;
                executeQuery(sql8);

                const sql9 = `SELECT * FROM user WHERE email = '${email}'`;
                    pool.getConnection(function (error, connection) {
                        const query1 = connection.query(sql9, (err, user1) => {
                            if (user1.length > 0) {
                                sendMailBackEnd(user1, req, res);
                                connection.release();
                            } else {
                                console.log('Failed to send the mail for the newly created user');
                                connection.release();
                            }
                        });
                    });
            });
        });
        console.log("A user has been added: ", email);
        connection.release();
    });
}

function executeQuery(sql) {
    pool.getConnection(function (error, connection) {
            connection.query(sql, (err, result) => {
                if (err) {throw err;}
                connection.release();
            });
    });
}
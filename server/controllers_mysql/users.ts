import { pool } from '../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../models_mysql/users';

var CryptoJS = require("crypto-js");

import BaseSqlCtrl from './baseSql';

export default class UserCtrl extends BaseSqlCtrl {

    model = 'user';
    dummy = sql_users;


    getByRnumber = (req, res) => {
        var sql = `SELECT ?? FROM ?? WHERE ?? = ?`;
        const inserts = ['id',this.model, 'rnumber', req.params.rnumber];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, null);
    }
    getAdmins = (req, res) => {
        var sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const inserts = [this.model, 'admin', '1'];
        sql = mysql.format(sql, inserts);
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                var encrypted = CryptoJS.AES.encrypt(JSON.stringify(results), 'secret key 123');
                var encrypted_string = encrypted.toString();
          
                const token = jwt.sign({ results: encrypted_string },
                process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token });                connection.release();
            });
        });
    }

    // Select single post
    login = (req, res) => {
        var sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const inserts = ['user', 'email', req.body.email];
        sql = mysql.format(sql, inserts);
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('err while connecting', error);
                throw error;
            }
            const query = connection.query(sql, (err, userArray) => {
                if(err){
                    // connection.release();
                    throw err;
                }
                if (!userArray[0]) { }
                else if (userArray[0].password == req.body.password) {
                    const user = userArray[0];
                    const token = jwt.sign({ user: user },
                            process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
                    res.status(200).json({ token: token });
                }
                else {
                    console.log("failed to log in");
                }
                connection.release();
            });
        });
    }

    resetPass = (req, res) => {
        var sql_update = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const inserts = [this.model,'password', req.body.password, 'email', req.body.email];
        sql_update = mysql.format(sql_update, inserts);
        this.executeQuery(sql_update, req, res, null, null);
    }

    makeAdmin = (req, res) => {
        var sql_update = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const inserts = [this.model,'admin', req.body.admin, 'email', req.body.email];
        sql_update = mysql.format(sql_update, inserts);
        this.executeQuery(sql_update, req, res, null, null);
    }
}
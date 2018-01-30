import { pool } from '../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../models_mysql/users';

import BaseSqlCtrl from './baseSql';

export default class UserCtrl extends BaseSqlCtrl {

    model = 'user';
    dummy = sql_users;

    getByRnumber = (req, res) => {
        const sql = `SELECT id FROM ${this.model} WHERE rnumber = '${req.params.rnumber}'`;
        this.executeQuery(sql, req, res, null, null);
    }
    getAdmins = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE admin = '1'`;
        this.executeQuery(sql, req, res, null, null);
    }

    // Select single post
    login = (req, res) => {
        const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('err while connecting', error);
                throw error;
            }
            const query = connection.query(sql, (err, user) => {
                if(err){
                    // connection.release();
                    throw err;
                }
                if (!user[0]) { }
                else if (user[0].password == req.body.password) {
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
        const sql = `UPDATE ${this.model} SET password = '${req.body.password}' WHERE email = '${req.body.email}'`;
        this.executeQuery(sql, req, res, null, null);
    }

    makeAdmin = (req, res) => {
        const sql = `UPDATE ${this.model} SET admin = '${req.body.admin}' WHERE email = '${req.body.email}'`;
        this.executeQuery(sql, req, res, null, null);
    }


}

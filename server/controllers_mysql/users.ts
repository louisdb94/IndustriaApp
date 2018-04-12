import { pool } from '../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../models_mysql/users';
import * as bcrypt from 'bcryptjs';


var CryptoJS = require("crypto-js");

import BaseSqlCtrl from './baseSql';

export default class UserCtrl extends BaseSqlCtrl {

    model = 'user';
    dummy = sql_users;

    get = (req, res) => {
        this.userCrud.get().then(result => {
            res.status(200).json({ results: result });
        });
    }

    getByRnumber = (req, res) => {
        var sql = `SELECT ?? FROM ?? WHERE ?? = ?`;
        const inserts = ['id', this.model, 'rnumber', req.params.rnumber];
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
                    process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken'); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token }); connection.release();
            });
        });
    }

    // Select single post
    login = (req, res, next) => {


        var sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const inserts = ['user', 'email', req.body.email];
        sql = mysql.format(sql, inserts);
        pool.getConnection(function (error, connection) {
            if (error) {
                connection.release();
                throw error;
            }
            const query = connection.query(sql, (err, userArray) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                if (!userArray[0]) {return res.status(404).send('No user found.');}
                var passwordIsValid = bcrypt.compareSync(req.body.password, userArray[0].password);
                if(passwordIsValid) {
                  const user = userArray[0];
                  const token = jwt.sign({ user: user },
                  process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).json({ token: token });
                }
                else {
                    return res.status(401).send({token: null });

                }
                connection.release();
            });
        });
    }

    //register
    register = (req, res, next) => {

        var hashedPassword = bcrypt.hashSync(req.body.password);
        const user = {
                  rnumber : req.body.rnumber,
                  email : req.body.email,
                  password : hashedPassword,
                  role : req.body.role,
                  admin : req.body.admin
        }
        const sql = `INSERT INTO ${this.model} SET ?`;
        this.executeQuery(sql, req, res, user, null);
    }

    //Refactored insert met crud
    Rregister = (req, res) => {
        const map: Map<string, string> = new Map();
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
                if(key == 'password'){
                    req.body[key] = bcrypt.hashSync(req.body.password);
                }
              map.set(key, req.body[key])
            }
        }

        var crud_controller = this.model + "Crud";
        this[crud_controller].insert(map).then(result => {
            res.status(200).json(result);
        });
    }

    resetPass = (req, res) => {
        var sql_update = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const inserts = [this.model, 'password', req.body.password, 'email', req.body.email];
        sql_update = mysql.format(sql_update, inserts);
        this.executeQuery(sql_update, req, res, null, null);
    }

    makeAdmin = (req, res) => {
        var sql_update = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const inserts = [this.model, 'admin', req.body.admin, 'email', req.body.email];
        sql_update = mysql.format(sql_update, inserts);
        this.executeQuery(sql_update, req, res, null, null);
    }
}

import {db} from '../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../models_mysql/users';

import BaseSqlCtrl from './baseSql'

export default class UserCtrl extends BaseSqlCtrl {

  model = 'user';
  dummy = sql_users;

  getByRnumber =  (req, res) => {
        let sql = `SELECT id FROM ${this.model} WHERE rnumber = '${req.params.rnumber}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    // Select single post
  login =  (req, res) => {
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    let query = db.query(sql, (err, user) => {
        if (!user) { return res.sendStatus(403); }
            else if(user[0].password == req.body.password){
            const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
        }
        else{
            console.log("failed to log in");
        }
    });
  };

  resetPass = (req, res) => {
      let sql = `UPDATE ${this.model} SET password = '${req.body.password}' WHERE email = '${req.body.email}'`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
      });
  };


}

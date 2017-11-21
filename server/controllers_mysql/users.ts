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
            console.log(result);
            res.json(result);

        });
    };

    // Select single post
  login =  (req, res) => {
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    let query = db.query(sql, (err, user) => {
        console.log(req.body.password);
        console.log(user[0].password);
        if (!user) { return res.sendStatus(403); }
            else if(user[0].password == req.body.password){
            const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
        }

        else{
            console.log("fail");
        }
        // user.comparePassword(req.body.password, (error, isMatch) => {
        //   if (!isMatch) { return res.sendStatus(403); }
        //   const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        //   res.status(200).json({ token: token });
        // });

    });
  };

  // Update post
  updateRnumber = (req, res) => {
      let sql = `UPDATE '${this.model}' SET rnumber = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateEmail = (req, res) => {
      let sql = `UPDATE '${this.model}' SET email = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

}

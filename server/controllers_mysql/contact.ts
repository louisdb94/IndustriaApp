import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = 'contact';

  // Update post
  updateEmail = (req, res) => {
      let sql = `UPDATE ${this.model} SET email = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updatePhone = (req, res) => {
      let sql = `UPDATE ${this.model} SET phone = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCounty = (req, res) => {
      let sql = `UPDATE ${this.model} SET county = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCity = (req, res) => {
      let sql = `UPDATE ${this.model} SET city = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };




}

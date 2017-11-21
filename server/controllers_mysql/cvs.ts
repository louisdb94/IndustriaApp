import {db} from '../app';
import * as  mysql from 'mysql';
import cvs from '../models_mysql/cvs';

import BaseSqlCtrl from './baseSql';

export default class CvsCtrl extends BaseSqlCtrl {

  model = 'cvs';
  dummy = cvs;

  // Update post
  updateName = (req, res) => {
      let sql = `UPDATE '${this.model}' SET name = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateMimetype = (req, res) => {
      let sql = `UPDATE '${this.model}' SET mimetype = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateSize = (req, res) => {
      let sql = `UPDATE '${this.model}' SET size = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateNumber = (req, res) => {
      let sql = `UPDATE '${this.model}' SET number = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCustomName = (req, res) => {
      let sql = `UPDATE '${this.model}' SET customName = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };


}

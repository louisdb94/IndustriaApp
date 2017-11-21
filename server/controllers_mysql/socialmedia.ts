import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class SocialmediaCtrl extends BaseSqlCtrl {

  model = 'socialmedia';

  // Update post
  updateType = (req, res) => {
      let sql = `UPDATE '${this.model}' SET type = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateUrl = (req, res) => {
      let sql = `UPDATE '${this.model}' SET url = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateChecked = (req, res) => {
      let sql = `UPDATE '${this.model}' SET checked = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };



}

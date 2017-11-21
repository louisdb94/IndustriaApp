import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql'

export default class UserCtrl extends BaseSqlCtrl {

  model = 'user';

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

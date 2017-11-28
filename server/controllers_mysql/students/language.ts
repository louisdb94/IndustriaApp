import {db} from '../../app';
import * as  mysql from 'mysql';
import language from '../../models_mysql/students/language';

import BaseSqlCtrl from '../baseSql';

export default class LanguageCtrl extends BaseSqlCtrl{

  model = 'language';
  dummy = language;

  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET type = '${req.body.type}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
  };

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
  updateValue = (req, res) => {
      let sql = `UPDATE '${this.model}' SET value = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateValueType = (req, res) => {
      let sql = `UPDATE '${this.model}' SET value_type = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };
}

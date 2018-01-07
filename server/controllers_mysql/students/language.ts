import {db} from '../../app';
import * as  mysql from 'mysql';
import language from '../../models_mysql/students/language';

import BaseSqlCtrl from '../baseSql';

export default class LanguageCtrl extends BaseSqlCtrl{

  model = 'language';
  dummy = language;

  // Select single post
  getbyLanguage =  (req, res) => {
      let sql = `SELECT type, student_fk FROM ${this.model} WHERE type = '${req.params.lang}'`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          res.json(result);

      });
  };

  selectLanguage = (req, res) => {
      let sql = `SELECT DISTINCT type FROM ${this.model}`;
      let query = db.query(sql, (err, results) => {
          if(err) throw err;
          for(let i = 0; i < results.length ; i++){
            if(results[i].type == '') {
              results.splice(i,1);
            }
          }
          res.json(results);
      });
  };


  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET type = '${req.body.type}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('Post updated...');
    });
  };

}

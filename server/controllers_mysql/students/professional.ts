import {db} from '../../app';
import * as  mysql from 'mysql';
import sql_professional from '../../models_mysql/students/professional';

import BaseSqlCtrl from '../baseSql';

export default class ProfessionalCtrl extends BaseSqlCtrl{

  model = 'professional';
  dummy = sql_professional;


  // Select posts
  selectProfessional = (req, res) => {
      let sql = `SELECT DISTINCT skill FROM ${this.model}`;
      let query = db.query(sql, (err, results) => {
          if(err) throw err;
          console.log(results);
          res.json(results);
      });
  };

  // Select single post
  getbySkill =  (req, res) => {
      let sql = `SELECT skill, student_fk FROM ${this.model} WHERE skill = '${req.params.skill}'`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.json(result);

      });
  };

  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET skill = '${req.body.skill}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
  };
}

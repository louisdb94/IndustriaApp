import {db} from '../../app';
import * as  mysql from 'mysql';
import sql_skills from '../../models_mysql/students/skills';

import BaseSqlCtrl from '../baseSql';

export default class SkillsCtrl extends BaseSqlCtrl{

  model = 'skills';
  dummy = sql_skills;


  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET skill = '${req.body.skill}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
  };
  // Update post
  updateSkill = (req, res) => {
      let sql = `UPDATE '${this.model}' SET skill = '${req.body}' WHERE id = ${req.params.id}`;
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

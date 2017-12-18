import {db} from '../../app';
import * as  mysql from 'mysql';
import sql_skills from '../../models_mysql/students/skills';

import BaseSqlCtrl from '../baseSql';

export default class SkillsCtrl extends BaseSqlCtrl{

  model = 'skills';
  dummy = sql_skills;

  // Select posts
  selectSkill = (req, res) => {
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

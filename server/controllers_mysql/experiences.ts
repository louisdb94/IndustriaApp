import {db} from '../app';
import * as  mysql from 'mysql';
import experiences from '../models_mysql/experiences';

import BaseSqlCtrl from './baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = 'experiences';
  dummy = experiences;

  // Insert post 1
  insertForm =  (req, res) => {
        let sql = `INSERT INTO ${this.model} SET function = '${req.body.exp1Form}', description = '${req.body.exp2Form}', period = '${req.body.exp3Form}', student_fk = '${req.body.idForm}'`;
        let query = db.query(sql, req.body, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };

  getbyFkExperience =  (req, res) => {
    let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);

    });
};

  // Update post
  updateFunction = (req, res) => {
      let sql = `UPDATE '${this.model}' SET function = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateDescription = (req, res) => {
      let sql = `UPDATE '${this.model}' SET description = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateDatefrom = (req, res) => {
      let sql = `UPDATE '${this.model}' SET date_from = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateDateuntil = (req, res) => {
      let sql = `UPDATE '${this.model}' SET date_until = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };


}

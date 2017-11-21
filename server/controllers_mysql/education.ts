import {db} from '../app';
import * as  mysql from 'mysql';
import education from '../models_mysql/education';

import BaseSqlCtrl from './baseSql';

export default class EducationCtrl extends BaseSqlCtrl {

  model = 'education';
  dummy = education;


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
  updateInstitution = (req, res) => {
      let sql = `UPDATE '${this.model}' SET institution = '${req.body}' WHERE id = ${req.params.id}`;
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

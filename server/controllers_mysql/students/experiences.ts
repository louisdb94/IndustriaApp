import {db} from '../../app';
import * as  mysql from 'mysql';
import experiences from '../../models_mysql/students/experiences';

import BaseSqlCtrl from '../baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = 'experiences';
  dummy = experiences;

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

import {db} from '../app';
import sql_students from '../models_mysql/students';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = sql_students;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

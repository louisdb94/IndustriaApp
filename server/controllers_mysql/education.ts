import {db} from '../app';
import education from '../models_mysql/education';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class EducationCtrl extends BaseSqlCtrl {

  model = education;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

import {db} from '../app';
import cvs from '../models_mysql/cvs';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class CvsCtrl extends BaseSqlCtrl {

  model = cvs;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

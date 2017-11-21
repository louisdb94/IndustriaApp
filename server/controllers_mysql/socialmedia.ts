import {db} from '../app';
import sql_socialmedia from '../models_mysql/socialmedia';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class SocialmediaCtrl extends BaseSqlCtrl {

  model = sql_socialmedia;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

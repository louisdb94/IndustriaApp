import {db} from '../app';
import language from '../models_mysql/language';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class LanguageCtrl extends BaseSqlCtrl{

  model = language;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

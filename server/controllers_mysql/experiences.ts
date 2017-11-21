import {db} from '../app';
import experiences from '../models_mysql/experiences';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = experiences;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

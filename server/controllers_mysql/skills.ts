import {db} from '../app';
import sql_skills from '../models_mysql/skills';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class SkillsCtrl extends BaseSqlCtrl{

  model = sql_skills;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

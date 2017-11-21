import {db} from '../app';
import sql_skills from '../models_mysql/skills';
import * as  mysql from 'mysql';


export default class SkillsCtrl {

  getsql = (req, res) => {
    db.query(sql_skills, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}
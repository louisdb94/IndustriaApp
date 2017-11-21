import {db} from '../app';
import education from '../models_mysql/education';
import * as  mysql from 'mysql';


export default class EducationCtrl {

  getsql = (req, res) => {
    db.query(education, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

import {db} from '../app';
import sql_students from '../models_mysql/students';
import * as  mysql from 'mysql';


export default class StudentsCtrl {

  getsql = (req, res) => {
    db.query(sql_students, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}
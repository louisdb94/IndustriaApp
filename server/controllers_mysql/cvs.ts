import {db} from '../app';
import cvs from '../models_mysql/cvs';
import * as  mysql from 'mysql';


export default class CvsCtrl {

  getsql = (req, res) => {
    db.query(cvs, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

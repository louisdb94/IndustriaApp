import {db} from '../app';
import sql_user from '../models_mysql/users';
import * as  mysql from 'mysql';


export default class UserCtrl {

  getsql = (req, res) => {
    db.query(sql_user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

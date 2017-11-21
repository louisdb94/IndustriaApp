import {db} from '../app';
import sql_socialmedia from '../models_mysql/socialmedia';
import * as  mysql from 'mysql';


export default class SocialmediaCtrl {

  getsql = (req, res) => {
    db.query(sql_socialmedia, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}
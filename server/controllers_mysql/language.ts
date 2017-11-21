import {db} from '../app';
import language from '../models_mysql/language';
import * as  mysql from 'mysql';


export default class LanguageCtrl {

  getsql = (req, res) => {
    db.query(language, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}
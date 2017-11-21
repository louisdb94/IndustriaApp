import {db} from '../app';
import contacts from '../models_mysql/contact';
import * as  mysql from 'mysql';


export default class ConctactCtrl {

  getsql = (req, res) => {
    db.query(contacts, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

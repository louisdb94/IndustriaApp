import {db} from '../app';
import contacts from '../models_mysql/contact';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = contacts;

  getsql = (req, res) => {
    db.query(this.model, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

import { pool } from '../../app';
import * as  mysql from 'mysql';
import contacts from '../../models_mysql/students/contact';
import BaseSqlCtrl from '../baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = 'contact';
  dummy = contacts;


  updateAll = (req, res) => {
    const sql = `UPDATE ${this.model} SET email = '${req.body.email}', phone = '${req.body.phone}', county = '${req.body.county}', city = '${req.body.city}'  WHERE id = ${req.body.id}`;
    this.executeQuery(sql, req, res, null, 'Post updated...');
  }
}

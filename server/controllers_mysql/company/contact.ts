import { pool } from '../../app';
import * as  mysql from 'mysql';
import contact_company from '../../models_mysql/company/contact';
import BaseSqlCtrl from '../baseSql';


export default class CompanyContactCtrl extends BaseSqlCtrl {

  model = 'contact_company';
  dummy = contact_company;


  updateAll = (req, res) => {
    const sql = `UPDATE ${this.model} SET email = '${req.body.email}
      ', phone = '${req.body.phone}', address = '${req.body.address}'  WHERE id = ${req.body.id}`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          // connection.release();
          throw err;
        }
        connection.release();
        res.send('Post updated...');
      });
    });
  }
}

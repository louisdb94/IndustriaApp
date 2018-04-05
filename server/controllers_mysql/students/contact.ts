import { pool } from '../../app';
import * as  mysql from 'mysql';
import contacts from '../../models_mysql/students/contact';
import BaseSqlCtrl from '../baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = 'contact';
  dummy = contacts;


  selectContact = (req, res) => {
      let sql = `SELECT DISTINCT ?? FROM ??`;
      const inserts = ['county', this.model];
      sql = mysql.format(sql, inserts);
      pool.getConnection(function (error, connection) {
          const query = connection.query(sql, (err, results) => {
              if (err) {
                  connection.release();
                  throw err;
              }
              for (let i = 0; i < results.length; i++) {
                  if (results[i].type === '') {
                      results.splice(i, 1);
                  }
              }
            //  res.json(results);
              res.send(results)
              connection.release();
          });
      });

  }


  updateAll = (req, res) => {
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const inserts = [this.model, 'email', req.body.email, 'phone', req.body.phone, 'county', req.body.county, 'city', req.body.city, 'id', req.body.id];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, 'Post updated...');
  }
}

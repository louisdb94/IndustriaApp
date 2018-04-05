import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as jwt from 'jsonwebtoken';
import contact_company from '../../models_mysql/company/contact';
import BaseSqlCtrl from '../baseSql';


export default class CompanyContactCtrl extends BaseSqlCtrl {

  model = 'contact_company';
  dummy = contact_company;


  updateAll = (req, res) => {
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const insert = [this.model, 'email', req.body.email, 'phone', req.body.phone, 'address', req.body.address, 'id', req.body.id];
    sql = mysql.format(sql, insert);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
      });
    });
  }

  getbyCompanyIdContact = (req, res) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const insert = [this.model, 'company_fk', req.params.id];
    sql = mysql.format(sql, insert);
    pool.getConnection(function (error, connection) {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }
            const token = jwt.sign({ results: results }, 
            process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
            connection.release();
        });
    });
  }
}

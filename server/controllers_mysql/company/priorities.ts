import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as jwt from 'jsonwebtoken';
import priorities_company from '../../models_mysql/company/priorities';
import BaseSqlCtrl from '../baseSql';


export default class CompanyPriorities extends BaseSqlCtrl {

  model = 'priorities_company';
  dummy = priorities_company;

  priorities = (req, res) => {
    let sql = `INSERT INTO ?? SET ?? = ?`
    const insert = [this.model, 'company_fk', req.params.id]
    sql = mysql.format(sql, insert);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        res.json(result);
        connection.release();
      });
    });
  }

}

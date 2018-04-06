import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as jwt from 'jsonwebtoken';
import priorities_company from '../../models_mysql/company/priorities';
import BaseSqlCtrl from '../baseSql';


export default class CompanyPriorities extends BaseSqlCtrl {

  model = 'priorities_company';
  dummy = priorities_company;

  add_priorities = (req, res) => {

    console.log(req.body);

    let sql1 = `SELECT * FROM ?? WHERE ?? = ?`;
    const insert1 = [this.model, 'company_fk', req.body.id];
    sql1 = mysql.format(sql1,insert1);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql1, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        if(result == ""){
             let sql = `INSERT INTO ?? SET ?? = ?, ?? = ?`;
             const insert = ['priorities_company', 'company_fk', req.body.id, 'name', req.body.name];
             sql = mysql.format(sql, insert);
            pool.getConnection(function (error, connection) {
              const query1 = connection.query(sql, (err, result1) => {
                if (err) {
                  connection.release();
                  throw err;
                }
                connection.release();
              });
            });

        }
        res.json(result);
        connection.release();
      });
    });
  }

  delete_priorities = (req,res) => {
    let sql1 = `SELECT * FROM ?? WHERE ?? = ?`;
    const insert1 = [this.model, 'company_fk', req.params.id];
    sql1 = mysql.format(sql1,insert1);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql1, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        if(result != ""){
             let sql = `DELETE FROM ?? WHERE ?? = ?`;
             const insert = ['priorities_company', 'company_fk', req.params.id];
             sql = mysql.format(sql, insert);
            pool.getConnection(function (error, connection) {
              const query1 = connection.query(sql, (err, result1) => {
                if (err) {
                  connection.release();
                  throw err;
                }
                connection.release();
              });
            });

        }
        res.json(result);
        connection.release();
      });
    });
  }


  updatePriority = (req, res) => {
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const insert = [this.model, 'profile_page', req.body.profile_page, 'student_profile', req.body.student_profile, 'job_openings', req.body.job_openings, 'size', req.body.size, 'id', req.body.id];
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

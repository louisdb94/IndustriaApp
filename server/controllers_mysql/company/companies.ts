import { pool } from '../../app';
import * as  mysql from 'mysql';
import companies from '../../models_mysql/company/companies';
import * as fs from 'fs';


import BaseSqlCtrl from '../baseSql';

export default class CompanyCtrl extends BaseSqlCtrl {

  model = 'companies';
  dummy = companies;

  updateAll = (req, res) => {

    const sql = `UPDATE ${this.model} SET email = '${req.body.email}',
                                                whoami = '${req.body.whoami}',
                                                url = '${req.body.url}',
                                                name = '${req.body.name}',
                                                feature1 = '${req.body.feature1}',
                                                feature2 = '${req.body.feature2}',
                                                feature3 = '${req.body.feature3}',
                                                priority = '${req.body.priority}',
                                                image = '${req.body.image}'

                                                WHERE id = ${req.body.id}`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
        res.json(result);
      });
    });
  }

  download = (req, res) => {
    const sql = `SELECT * FROM companies WHERE id = '${req.params.id}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          return console.error(err);
        } else {
          if (obj[0].image === 1) {
            fs.readFile('./uploads/images/' + obj[0].name + '.png', 'base64', function (err1, data) {
              if (err1) {
                connection.release();
                console.log(err1);
              }
              res.setHeader('Content-Disposition', 'attachment');
              res.send(data);
            });
          } else {
            fs.readFile('./uploads/images/standard.png', 'base64', function (err2, data) {
              if (err2) {
                connection.release();
                console.log(err2);
              }
              res.setHeader('Content-Disposition', 'attachment');
              connection.release();
              res.send(data);
            });
          }
        }
      });
    });
  }

  getCompanyByEmail = (req, res) => {
    const sql = `SELECT id FROM ${this.model} WHERE email = '${req.params.email}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
        res.json(result);
      });
    });
  }

  innerJoin = (req, res) => {
    const dummy = [];

    const sql = `SELECT companies.id , companies.name AS company_name , companies.url,
                 vacatures.name AS vacature_name, vacatures.type FROM companies
                INNER JOIN vacatures ON  companies.id = vacatures.company_fk`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        for (let i = 0; i < result.length; i++) {

          if (result[i].vacature_name === '') {
            result.splice(i, 1);
          }
        }
        res.send(result);
        connection.release();
      });
    });
  }

  updatePriority = (req, res) => {
    const sql = `UPDATE ${this.model} SET priority = '${req.body.priority}',
                                        email = '${req.body.email}',
                                        name = '${req.body.name}'
                                                WHERE id = ${req.body.id}`;
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

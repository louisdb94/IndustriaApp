import { pool } from '../../app';
import * as  mysql from 'mysql';
import companies from '../../models_mysql/company/companies';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
var CryptoJS = require("crypto-js");

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
        res.json(result);
        connection.release();
      });
    });
  }

  selectCompanies = (req, res) => {
    const sql = `SELECT * FROM ${this.model}`;
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



  download = (req, res) => {
    const sql = `SELECT * FROM companies WHERE id = '${req.params.id}'`;

    const root = process.cwd();

    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          throw err;
        } else {
          if (obj[0].image === 1) {
            fs.readFile(root + '/uploads/images/' + obj[0].name + '.png', 'base64', function (err1, data) {
              if (err1) {
                console.log(err1);
              }
              res.setHeader('Content-Disposition', 'attachment');
              connection.release();
              res.send(data);
            });
          } else {
            fs.readFile(root + '/uploads/images/standard.png', 'base64', function (err2, data) {
              if (err2) {
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
    const sql = `SELECT * FROM ${this.model} WHERE email = '${req.params.email}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(result), 'secret key 123');
        var encrypted_string = encrypted.toString();
        const token = jwt.sign({ results: encrypted_string }, 
        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
        connection.release();
      });
    });
  }

  innerJoin = (req, res) => {
    const dummy = [];

    const sql = `SELECT companies.id , companies.name AS company_name , companies.url,
                vacatures.id AS vacature_id, vacatures.name AS vacature_name, vacatures.type FROM companies
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

        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(result), 'secret key 123');
        var encrypted_string = encrypted.toString();
        const token = jwt.sign({ results: encrypted_string }, 
        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
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

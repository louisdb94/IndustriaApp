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
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const insert = [this.model, 'email', req.body.email, 'whoami', req.body.whoami, 'url', req.body.url, 'name', req.body.name, 'feature1', req.body.feature1, 'feature2', req.body.feature2, 'feature3', req.body.feature3, 'priority', req.body.priority, 'image', req.body.image, 'id', req.body.id];
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

  selectCompanies = (req, res) => {
    let sql = `SELECT * FROM ??`;
    const insert = [this.model];
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



  download = (req, res) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const insert = [this.model, 'id', req.params.id];
    sql = mysql.format(sql, insert);

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
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const insert = [this.model, 'email', req.params.email];
    sql = mysql.format(sql, insert);
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
    let sql = `SELECT ??, ?? AS ??, ??, ?? AS ??, ?? AS ??, ?? FROM ?? INNER JOIN ?? ON ?? = ?`;
    const insert = ['companies.id', 'companies.name', 'company_name', 'companies.url', 'vacatures.id', 'vacature_id', 'vacatures.name', 'vacature_name',
                    'vacatures.type', this.model, 'vacatures', 'companies.id', 'vacatures.company_fk'];
    sql = mysql.format(sql, insert);
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
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
    const insert = [this.model, 'priority', req.body.priority, 'email', req.body.email, 'name', req.body.name, 'id', req.body.id];
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

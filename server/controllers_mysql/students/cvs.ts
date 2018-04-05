import { pool } from '../../app';
import * as  mysql from 'mysql';
import cvs from '../../models_mysql/students/cvs';
import * as fs from 'fs';

import BaseSqlCtrl from '../baseSql';

export default class CvsCtrl extends BaseSqlCtrl {

  model = 'cvs';
  dummy = cvs;

  uploadCv = (req, res) => {
    const root = process.cwd();

    //retrieve all data from formdata
    let rnumber = req.body.rnumber;
    let id = req.body.id;
    let cvnumber = req.body.cvnumber;

    //check if there is a file in formdata
    if (!(<any>req.files).files) {
      return res.status(400).send('No files were uploaded.');
    }

    //add file to server
    let newCv = (<any>req.files).files;
    let type = newCv.mimetype.split('/')[1]
    newCv.mv(root + '/uploads/cvs/' + rnumber + "(" + cvnumber + ")" + "." + type, function (err) {
      if (err)
        return res.status(500).send(err);
    });
    res.status(200).redirect('back');

    let sql = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
    const inserts = ['students', 'numberCv', cvnumber, 'id', req.body.id];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          if (pool._freeConnections.indexOf(connection) === -1) {
            connection.release();
          }
          throw err;
        }
        if (pool._freeConnections.indexOf(connection) === -1) {
          connection.release();
        }
      });
    });
  }

  getbyFk = (req, res) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts = ['cvs', 'student_fk', req.params.id];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }

  addCv = (req, res) => {
    let sql = `INSERT INTO ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?`;
    const inserts = ['cvs', 'name', req.body.name, 'mimetype', req.body.mimetype, 'number', req.body.number, 'size', req.body.size, 'student_fk', req.body.student_fk];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }

  removeCv = (req, res) => {
    const root = process.cwd();

    if(req.body.name){
      fs.unlink(root + '/uploads/cvs/' + req.body.name + "(" + req.body.number + ")" + '.' + req.body.mimetype);
    }
  }

  downloadCv = (req, res) => {
    const root = process.cwd();

    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts = ['cvs', 'id', req.params.id];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          if (pool._freeConnections.indexOf(connection) === -1) {
            connection.release();
          }
          return res.status(500).send(err);
        } else {
          res.download(root + '/uploads/cvs/' + obj[0].name + '(' + obj[0].number + ')' + '.' + obj[0].mimetype, function (err) {
            if (err) {
              if (pool._freeConnections.indexOf(connection) === -1) {
                connection.release();
              }
              return res.status(500).send(err);
            }
          });
          if (pool._freeConnections.indexOf(connection) === -1) {
            connection.release();
          }
        }
      });
    });
  }

  delete = (req, res) => {
    let sql = `DELETE FROM ?? WHERE ?? = ?`;
    const inserts = ['cvs', 'id', req.params.id];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, 'post deleted...');
  }

}

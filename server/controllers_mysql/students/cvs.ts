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

    const sql = `UPDATE students SET numberCv = '${cvnumber}' WHERE id = '${req.body.id}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          if (pool._freeConnections.indexOf(connection) === -1) {
            connection.release();
          }
          return res.status(500).send(err);
        }
        if (pool._freeConnections.indexOf(connection) === -1) {
          connection.release();
        }
      });
    });
  }

  getbyFk = (req, res) => {
    const sql = `SELECT * FROM cvs WHERE student_fk = '${req.params.id}'`;
    this.executeQuery(sql, req, res, null, null);
  }

  addCv = (req, res) => {
    const sql = `INSERT INTO cvs SET name = '${req.body.name}', mimetype = '${req.body.mimetype}', number = '${req.body.number}', size = '${req.body.size}', student_fk = '${req.body.uploader}'`;
    this.executeQuery(sql, req, res, null, null);
  }

  removeCv = (req, res) => {
    const root = process.cwd();

    fs.unlink(root + '/uploads/cvs/' + req.body.name + "(" + req.body.number + ")" + '.' + req.body.mimetype);

  }

  downloadCv = (req, res) => {
    const root = process.cwd();

    const sql = `SELECT * FROM cvs WHERE id = '${req.params.id}'`;
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
    const sql = `DELETE FROM cvs WHERE id = '${req.params.id}'`;
    this.executeQuery(sql, req, res, null, 'post deleted...');
  }

}

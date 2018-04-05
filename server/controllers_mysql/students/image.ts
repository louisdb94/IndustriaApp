import { pool } from '../../app';
import * as  mysql from 'mysql';
import BaseSqlCtrl from '../baseSql';
import * as fs from 'fs';
import { race } from 'q';

export default class ImageCtrl extends BaseSqlCtrl {

  model = 'image';
  dummy = null;

  upload = (req, res) => {

    const root = process.cwd();
    //check if there is a file in formdata
    if (!(<any>req.files).files){
      return res.status(400).send('No files were uploaded.');
    }

    //add file to server
    let rnumber = req.body.students;
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv(root + '/uploads/images/' + rnumber + '.jpg', function (err) {
      if (err) { return res.status(500).send(err); }
      else { res.status(200).redirect('back'); }
    });

    let sql = `UPDATE ?? SET ?? = ?? WHERE ?? = ?`;
    const inserts = ['students', 'image', '1', 'id', req.body.id];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
      });
    });
  }

  uploadCompany = (req, res) => {
    const root = process.cwd();

    //check if there is a file in formdata
    if (!(<any>req.files).files){
      return res.status(400).send('No files were uploaded.');
    }

    //add file to server
    let name = req.body.name;
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv(root + '/uploads/images/' + name + '.png', function (err, result) {
      if (err) {
        console.log("error 1");
        return res.status(500).send(err);
      }
      else {
        res.status(200).redirect('back');
      }
    });

    let sql = `UPDATE ?? SET ?? = ?? WHERE ?? = ?`;
    const inserts = ['companies', 'image', '1', 'id', req.body.id];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
      });
    });
  }


  remove = (req, res) => {
    //DELETEN
    const root = process.cwd();
    if(req.body.name){
      fs.unlink(root + '/uploads/images/' + req.body.name + '.' + req.body.mimetype);
    }
  }

  // Select single post
  download = (req, res) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts = ['students','id', req.params.id];
    sql = mysql.format(sql, inserts);
    const root = process.cwd();

    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          throw err;
        }
        else {
          if (obj[0].image === 1) {
            fs.readFile(root + '/uploads/images/' + obj[0].rnumber + '.jpg', 'base64', function (err1, data) {
              if (err1) {
                console.log(err1);
              }
              res.setHeader('Content-Disposition', 'attachment');
              connection.release();
              res.send(data);
            });
          } else {
            fs.readFile(root + '/uploads/images/standard.jpg', 'base64', function (err2, data) {
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
}

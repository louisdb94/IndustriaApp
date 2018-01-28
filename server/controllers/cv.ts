import Cv from '../models/cv';
import Student from '../models/student';
import BaseCtrl from './base';
import * as fs from 'fs';
import { pool } from '../app';

export default class CvCtrl extends BaseCtrl {
  model = Cv;

  uploadCv = (req, res) => {

    console.log("this is rnumber: ", req.body.rnumber);
    console.log("this is cvnumber: ", req.body.cvnumber);
    console.log("this is id: ", req.body.id);
    console.log("this is files: ", req.files);

    //retrieve all data from formdata
    let rnumber = req.body.rnumber;
    let id = req.body.id;
    let cvnumber = req.body.cvnumber;
    console.log("CVNUMBER", cvnumber);

    //check if there is a file in formdata
    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    //add file to server
    let newCv = (<any>req.files).files;
    let type = newCv.mimetype.split('/')[1]
    newCv.mv('./uploads/cvs/' + rnumber + "(" + cvnumber + ")" + "." + type, function (err) {
      if (err)
        return res.status(500).send(err);
    });
    res.status(200).redirect('back');

    const sql = `UPDATE students SET numberCv = '${cvnumber}' WHERE id = '${req.body.id}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, obj) => {
        if (err) {
          connection.release();
          return console.error(err);
        }
      });
    });
  }

  getbyFk = (req, res) => {
    const sql = `SELECT * FROM cvs WHERE student_fk = '${req.params.id}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        connection.release();
        console.log(result);
        res.json(result);
      });
    });
  }

  addCv = (req, res) => {
    const sql = `INSERT INTO cvs SET name = '${req.body.name}', mimetype = '${req.body.mimetype}', number = '${req.body.number}', size = '${req.body.size}', student_fk = '${req.body.uploader}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        console.log(result);
        res.json(result);
        connection.release();
      });
    });
  }

  removeCv = (req, res) => {
    // //decrement number of cv in StudentModel -> NIET WANT ANDERS FOUT BIJ UPLOADEN
    // Student.findOneAndUpdate({ _id: req.body.uploader }, {$inc:{numberCv: -1 }}, (err, obj) => {
    //   
    // connection.release();


    // });

    //DELETEN
    fs.unlink('./uploads/cvs/' + req.body.name + "(" + req.body.number + ")" + '.' + req.body.mimetype);


  }

  downloadCv = (req, res) => {
    // TODO TOM
    //   console.log("zekoifenjnke: ", req.params.id)
    //   const sql = `SELECT * FROM cvs WHERE id = '${req.params.id}'`;
    //   const query = connection.query(sql, (err, obj) => {

    //     connection.release();


    //     else {
    //     res.download('./uploads/cvs/' + obj[0].name + '(' + obj[0].number + ')' + '.' + obj[0].mimetype, function (err) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log("In de functie res.download");
    //       }
    //     });
    //   }
    // });
  }

  delete = (req, res) => {
    const sql = `DELETE FROM cvs WHERE id = '${req.params.id}'`;
    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        console.log(result);
        res.send('Post deleted...');
      });
    });
  }
}

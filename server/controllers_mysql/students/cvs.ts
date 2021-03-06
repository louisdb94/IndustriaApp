import {connection} from '../../app';
import * as  mysql from 'mysql';
import cvs from '../../models_mysql/students/cvs';
import * as fs from 'fs';

import BaseSqlCtrl from '../baseSql';

export default class CvsCtrl extends BaseSqlCtrl {

  model = 'cvs';
  dummy = cvs;

  uploadCv = (req, res) => {


        //retrieve all data from formdata
        let rnumber = req.body.rnumber;
        let id = req.body.id;
        let cvnumber = req.body.cvnumber;

        //check if there is a file in formdata
        if (!(<any>req.files).files)
          return res.status(400).send('No files were uploaded.');

        //add file to server
        let newCv = (<any>req.files).files;
        let type = newCv.mimetype.split('/')[1]
        newCv.mv('./uploads/cvs/'+ rnumber + "(" + cvnumber + ")" + "." +type ,function(err) {
         if (err)
           return res.status(500).send(err);
         });
         res.status(200).redirect('back');

        let sql = `UPDATE students SET numberCv = '${cvnumber}' WHERE id = '${req.body.id}'`;
        let query = connection.query(sql, (err, obj) => {
          if (err) { return console.error(err); }
        });
       };

       getbyFk =  (req, res) => {
        let sql = `SELECT * FROM cvs WHERE student_fk = '${req.params.id}'`;
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
      };

      addCv =  (req, res) => {
        let sql = `INSERT INTO cvs SET name = '${req.body.name}', mimetype = '${req.body.mimetype}', number = '${req.body.number}', size = '${req.body.size}', student_fk = '${req.body.uploader}'`;
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
      };

      removeCv = (req, res) => {
         fs.unlink('./uploads/cvs/'+ req.body.name + "("+ req.body.number +")" +'.' + req.body.mimetype);

       }

       downloadCv = (req, res) => {

        let sql = `SELECT * FROM cvs WHERE id = '${req.params.id}'`;
        let query = connection.query(sql, (err, obj) => {
           if (err) { return console.error(err); }
           else{
               res.download('./uploads/cvs/'+obj[0].name + '(' + obj[0].number +')' + '.' + obj[0].mimetype, function(err){
                 if(err){
                   console.log(err);
                 } else {
                   console.log("In de functie res.download");
                 }
               });
             }
         });
       }

       delete = (req, res) => {
        let sql = `DELETE FROM cvs WHERE id = '${req.params.id}'`;
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send('Post deleted...');
        });
       };

}

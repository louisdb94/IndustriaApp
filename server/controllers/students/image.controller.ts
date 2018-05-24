import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DefaultController} from '../default.controller';

export class ImageController extends DefaultController {
  model = 'image';

  upload(req, res, mime) {

    const root = process.cwd();
    //check if there is a file in formdata
    if (!(<any>req.files).files){
      return res.status(400).send('No files were uploaded.');
    }

    //add file to server
    let name = req.body.rnumber;
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv(root + '/uploads/images/' + name + mime, function (err) {
      if (err) { return res.status(500).send(err); }
      else { res.status(200).redirect('back'); }
    });
  }

  uploadImageStudent = (req, res) => {
    let mime = '.jpg';
    this.upload(req,res, mime);
    this.updateTable(req, res, 'students', 'id', req.body.id);
    res.finished = true;

  }
  uploadImageCompany = (req, res) => {
    let mime = '.png';
    this.upload(req,res, mime);
    this.updateTable(req, res, 'companies', 'id', req.body.id);
    res.finished = true;

  }

  remove = (req, res) => {
    const root = process.cwd();
    if(req.body.name){
      fs.unlink(root + '/uploads/images/' + req.body.name + '.' + req.body.mimetype);
    }
  }

  downloadImageStudent = (req, res) => {
    const root = process.cwd();
    var crud_controller = "studentsCrud";
    this[crud_controller].getBy('students', 'id', req.params.id).then(result => {
          if (result[0].image === 1) {
            fs.readFile(root + '/uploads/images/' + result[0].rnumber + '.jpg', 'base64', function (err1, data) {
              if (err1) {
                console.log(err1)
              }
              res.setHeader('Content-Disposition', 'attachment');
              res.send(data);
            });
          } else {
            fs.readFile(root + '/uploads/images/standard.jpg', 'base64', function (err2, data) {
              if (err2) {
                console.log(err2);
              }
              res.setHeader('Content-Disposition', 'attachment');
              res.send(data);
            });
          }

      })
    };


  downloadImageCompany = (req, res) => {
    const root = process.cwd();
    var crud_controller = "companiesCrud";
    this[crud_controller].getBy('companies', 'id', req.params.id).then(result => {
        if (result[0].image === 1) {
          fs.readFile(root + '/uploads/images/' + result[0].name + '.png', 'base64', function (err1, data) {
            if (err1) {
              console.log(err1);
            }
            res.setHeader('Content-Disposition', 'attachment');
            res.send(data);
          });
        }

        else {
          fs.readFile(root + '/uploads/images/standard.png', 'base64', function (err2, data) {
            if (err2) {
              console.log(err2);
            }
            res.setHeader('Content-Disposition', 'attachment');
            res.send(data);
          });
        }
    });
  }

}

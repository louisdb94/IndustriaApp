import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class StudentsController extends DefaultController {

  model = 'students';

  deleteStudent = (req,res) => {
    // this.delete('socialmedia', 'student_fk', req.params.student_fk);
    // this.deleteStudentTable(res, req, 'students','id', req.params.student_fk);

    // this.delete('contact', 'student_fk', req.params.student_fk);
    // this.unlinkCV('cvs', 'student_fk', req.params.student_fk);
    // this.delete('cvs', 'student_fk', req.params.student_fk);
    // this.delete('privacylog', 'student_fk', req.params.student_fk);
    // this.delete('education', 'student_fk', req.params.student_fk);
    // this.delete('experiences', 'student_fk', req.params.student_fk);
    // this.delete('language', 'student_fk', req.params.student_fk);

    // this.delete('professional', 'student_fk', req.params.student_fk);
    // this.delete('skills', 'student_fk', req.params.student_fk);

    var crud_controller = this.model + "Crud";
    this[crud_controller].delete('contact', 'id', req.params.student_fk).then(result => {
      this[crud_controller].delete('cvs', 'id', req.params.student_fk).then(result => {
        this[crud_controller].delete('privacylog', 'id', req.params.student_fk).then(result => {
          this[crud_controller].delete('education', 'id', req.params.student_fk).then(result => {
            this[crud_controller].delete('experiences', 'id', req.params.student_fk).then(result => {
              this[crud_controller].delete('language', 'id', req.params.student_fk).then(result => {
                this[crud_controller].delete('professional', 'id', req.params.student_fk).then(result => {
                  this[crud_controller].delete('skills', 'id', req.params.student_fk).then(result => {
                    this[crud_controller].delete('socialmedia', 'student_fk', req.params.student_fk).then(result => {
                      this[crud_controller].delete('students', 'id', req.params.student_fk).then(result => {
                        res.status(200).json(result );
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  unlinkCV(table, name, field){
    var crud_controller = this.model + "Crud";
    this[crud_controller].getBy(table, name, field).then(result => {
      if (result[0]) {
        if(result[0].name){
            fs.unlink('./uploads/cvs/' + result[0].name + '(' + result[0].number + ')' + '.' + result[0].mimetype);
        }
      }
      });
  }

  deleteStudentTable(res, req, table, name, field){
    var crud_controller = this.model + "Crud";
    this[crud_controller].getBy(table, name, field).then(result => {
      this.delete('students', 'id', req.params.student_fk);
      //this.delete('user', 'id', result[0].user_fk);
      res.send("gelukt");
      });
  }
}

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

deleteStudent = (req, res) => {
  var crud_controller = this.model + "Crud";
      this.unlinkCV('cvs', 'student_fk', req.params.student_fk);
      this[crud_controller].delete('contact', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('cvs', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('privacylog', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('education', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('experiences', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('language', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('professional', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('skills', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].delete('socialmedia', 'student_fk', req.params.student_fk).then(result => {
      this[crud_controller].getBy('students', 'id', req.params.student_fk).then(result => {
      let user_id = result[0].user_fk
      this[crud_controller].delete('students', 'id', req.params.student_fk).then(result => {
      this[crud_controller].delete('user', 'id', user_id).then(result => {
      res.send("deleted");
      });});});});});});});});});});});});
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

  getStudentByRnumber = (req, res) => {
    this.getWhere(res, 'rnumber', req.params.rnumber);
  }
}

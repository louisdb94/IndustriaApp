import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import { DefaultController} from '../default.controller';

export  class CompaniesController extends DefaultController {
  model = 'companies';

  getCompanyByEmail = (req, res) => {
    this.getWhere(res, 'email', req.params.email);
  }

  deleteCompany = (req, res) => {
    var crud_controller = this.model + "Crud";
        this[crud_controller].delete('vacatures', 'company_fk', req.body.id).then(result => {
        this[crud_controller].delete('contact_company', 'company_fk', req.body.id).then(result => {
        this[crud_controller].delete('companies', 'id', req.body.id).then(result => {
        this[crud_controller].delete('user', 'id', req.body.user_fk).then(result => {
          res.status(200).json( result );
        });});});});
  }

  innerJoinCompany = (req, res) => {
    var crud_controller = this.model + "Crud";
    let result2 = [];
    this[crud_controller].innerjoin(this.model).then(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].vacature_name != '') {
          result2.push(result[i])
        }
      }
      res.json(result2);
    })
  }
}

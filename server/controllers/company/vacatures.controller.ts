import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export  class VacaturesController extends DefaultController {
  model = 'vacatures';

  getVacatureById = (req, res) => {
    this.getWhere(res, 'id', req.params.id);
  }

  getVacatureByCompanyFk = (req, res) => {
    this.getWhere(res, 'company_fk', req.params.id);
  }
}

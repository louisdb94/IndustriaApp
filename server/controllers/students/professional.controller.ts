import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class ProfessionalController extends DefaultController {
  model = 'professional';

  selectProfessional = (req, res) => {
    this.getDistinct(res, 'skill', this.model, 'skill');
  }

  getbySkill = (req, res) => {
    const map: Map<string, string> = new Map();
    map.set('skill', '');
    map.set('student_fk', '');
    this.getBySelection(res, map, 'skill', req.params.skill);
  }
}

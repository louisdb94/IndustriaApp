import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export  class RequirementsController extends DefaultController {
  model = 'requirements';

  getRequirementByVacature = (req, res) => {
    this.getWhere(res, 'vacatures_fk', req.params.id);
  }
}

import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class EducationController extends DefaultController {
  model = 'education';

  // deleteEducation = (req, res) => {
  //   this.delete(res, this.model, 'id', req.params.id);
  // }
}

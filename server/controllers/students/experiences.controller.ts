import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class ExperiencesController extends DefaultController {
  model = 'experiences';

  // deleteExperience = (req, res) => {
  //   this.delete(res, this.model, 'id', req.params.id)
  // }
}

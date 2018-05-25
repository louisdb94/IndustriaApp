import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class ContactStudentsController extends DefaultController {
  model = 'contact';

  selectContact = (req, res) => {
    this.getDistinct(res, 'county', this.model, 'type');
  }

}

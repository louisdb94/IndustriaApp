import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export class LanguageController extends DefaultController {
  model = 'language';

  selectLanguage = (req, res) => {
    this.getDistinct(res, 'type', this.model, 'type');
  }

  getbyLanguage = (req, res) => {
    const map: Map<string, string> = new Map();
    map.set('type', '');
    map.set('student_fk', '');
    this.getBySelection(res, map, 'type', req.params.type);
  }

}

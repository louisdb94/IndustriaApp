import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
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

  deleteVacature = (req, res) => {
    var crud_controller = this.model + "Crud";
    this[crud_controller].delete('requirements', 'vacatures_fk', req.params.id).then(result => {
      this[crud_controller].delete('vacatures', 'id', req.params.id).then(result => {
        res.status(200).json(result);
      });
    })
  }
}

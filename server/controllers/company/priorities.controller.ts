import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export  class PrioritiesController extends DefaultController {
  model = 'priorities_company';

  addPriority = (req, res) => {
    var crud_controller = this.model + "Crud";
    this[crud_controller].getBy(this.model, 'company_fk', req.body.company_fk).then(result => {
      if(result == ""){
        this.insertFunction(req, res);
      }
      res.status(200).json( result );
    });
  }

  deletePriority = (req, res) => {
    var crud_controller = this.model + "Crud";
    this[crud_controller].getBy(this.model, 'company_fk', req.params.company_fk).then(result => {
      if(result != ""){
        this.deleteById(res, this.model, 'company_fk', req.params.company_fk);
      }
      res.status(200).json( result );
    });
  }

}

import { pool } from '../../app';
import * as  mysql from 'mysql';
import { DefaultController} from '../default.controller';

export  class ParametersController extends DefaultController {
  model = 'parameters';

  getByAdmin = (req, res) => {
    this.getWhere(res, 'role', 'admin');
  }

  getByParamsCompany = (req, res) => {
    this.getWhere(res, 'role', '');
  }

  getParamsForCompany = (req, res) => {
    this.getWhere(res, 'user_fk', req.params.user_fk);
  }

  deleteFromValue= (req, res) => {
    this.deleteById(res, this.model, 'value', req.params.value);
  }
}

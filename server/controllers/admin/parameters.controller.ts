import { pool } from '../../app';
import * as  mysql from 'mysql';
import { DefaultController} from '../default.controller';

export  class ParametersController extends DefaultController {
  model = 'parameters';

  getByAdmin = (req, res) => {
    this.getView(res, 'admin_parameters');
  }

  getByParamsCompany = (req, res) => {
    this.getView(res, 'company_parameters');
  }

  getParamsForCompany = (req, res) => {
    this.getWhere(res, 'user_fk', req.params.user_fk);
  }

  deleteFromValue= (req, res) => {
    this.deleteById(res, this.model, 'value', req.params.value);
  }
}

import { pool } from '../../app';
import * as  mysql from 'mysql';
import { DefaultController} from '../default.controller';

export  class ParametersController extends DefaultController {
  model = 'parameters';

  getByAdmin = (req, res) => {
    this.getWhere(res, 'role', 'admin');
  }
}

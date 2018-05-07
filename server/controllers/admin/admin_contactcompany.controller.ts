import { pool } from '../../app';
import * as  mysql from 'mysql';
import { DefaultController} from '../default.controller';

export  class AdminCompanycontactController extends DefaultController {
  model = 'admin_companycontact';
}

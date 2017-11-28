import {db} from '../../app';
import * as  mysql from 'mysql';
import companies from '../../models_mysql/company/companies';

import BaseSqlCtrl from '../baseSql';

export default class CompanyCtrl extends BaseSqlCtrl{

  model = 'companies';
  dummy = companies;


}

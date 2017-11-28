import {db} from '../../app';
import * as  mysql from 'mysql';
import vacatures from '../../models_mysql/company/vacatures';

import BaseSqlCtrl from '../baseSql';

export default class VacaturesCtrl extends BaseSqlCtrl{

  model = 'vacatures';
  dummy = vacatures;


}

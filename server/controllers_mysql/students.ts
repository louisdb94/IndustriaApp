import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = 'students';


}

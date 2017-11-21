import {db} from '../app';
import sql_students from '../models_mysql/students';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = sql_students;


}

import {db} from '../app';
import cvs from '../models_mysql/cvs';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class CvsCtrl extends BaseSqlCtrl {

  model = cvs;

  
}

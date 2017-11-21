import {db} from '../app';
import sql_user from '../models_mysql/users';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql'

export default class UserCtrl extends BaseSqlCtrl {

  model = sql_user;
}

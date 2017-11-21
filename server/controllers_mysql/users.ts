import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql'

export default class UserCtrl extends BaseSqlCtrl {

  model = 'user';
}

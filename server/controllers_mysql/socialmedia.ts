import {db} from '../app';
import sql_socialmedia from '../models_mysql/socialmedia';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class SocialmediaCtrl extends BaseSqlCtrl {

  model = sql_socialmedia;

  
}

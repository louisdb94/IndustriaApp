import {db} from '../app';
import language from '../models_mysql/language';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class LanguageCtrl extends BaseSqlCtrl{

  model = language;


}

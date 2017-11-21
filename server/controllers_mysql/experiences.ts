import {db} from '../app';
import experiences from '../models_mysql/experiences';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = experiences;

}

import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = 'experiences';

}

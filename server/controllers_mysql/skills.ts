import {db} from '../app';
import sql_skills from '../models_mysql/skills';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class SkillsCtrl extends BaseSqlCtrl{

  model = sql_skills;


}

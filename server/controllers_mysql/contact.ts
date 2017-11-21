import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = 'contact';


}

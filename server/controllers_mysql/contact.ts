import {db} from '../app';
import contacts from '../models_mysql/contact';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';


export default class ContactCtrl extends BaseSqlCtrl {

  model = contacts;

  
}

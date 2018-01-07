import {db} from '../../app';
import * as  mysql from 'mysql';
import privacylog from '../../models_mysql/admin/privacylog';

import BaseSqlCtrl from '../baseSql';

export default class PrivacylogCtrl extends BaseSqlCtrl{

  model = 'privacylog';
  dummy = privacylog;

  insertPrivacylog =  (req, res) => {
      let sql = `INSERT INTO ${this.model} SET ?`;
      let query = db.query(sql, req.body, (err, result) => {
          if(err) throw err;
          res.json(result);
      });
  };
}
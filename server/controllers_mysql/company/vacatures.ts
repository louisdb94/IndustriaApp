import {db} from '../../app';
import * as  mysql from 'mysql';
import vacatures from '../../models_mysql/company/vacatures';

import BaseSqlCtrl from '../baseSql';

export default class VacaturesCtrl extends BaseSqlCtrl{

  model = 'vacatures';
  dummy = vacatures;

  updateAll =  (req, res) => {
      console.log(req.body);
      let sql = `UPDATE ${this.model} SET type = '${req.body.type}',
                                          about = '${req.body.about}'

                                          WHERE id = ${req.body.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.json(result);
      });
  };
}

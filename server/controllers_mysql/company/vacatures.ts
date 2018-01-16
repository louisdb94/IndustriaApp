import {connection} from '../../app';
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
      let query = connection.query(sql, (err, result) => {
          if(err) throw err;
          res.json(result);
      });
  };

  insertForm =  (req, res) => {
    let sql = `INSERT INTO ${this.model} SET name = '${req.body.vac1Form}', type = '${req.body.vac2Form}', about = '${req.body.vac3Form}', company_fk = '${req.body.idForm}'`;
    let query = connection.query(sql, req.body, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
   };
}

import {db} from '../../app';
import * as  mysql from 'mysql';
import education from '../../models_mysql/students/education';

import BaseSqlCtrl from '../baseSql';

export default class EducationCtrl extends BaseSqlCtrl {

  model = 'education';
  dummy = education;

  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET type = '${req.body.type}', institution = '${req.body.institution}', date_from = '${req.body.date_from}', date_until = '${req.body.date_until}' WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
};

}

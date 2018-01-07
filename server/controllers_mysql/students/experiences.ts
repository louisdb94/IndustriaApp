import {db} from '../../app';
import * as  mysql from 'mysql';
import experiences from '../../models_mysql/students/experiences';

import BaseSqlCtrl from '../baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

  model = 'experiences';
  dummy = experiences;

  // Insert post 1
  insertForm =  (req, res) => {
        let sql = `INSERT INTO ${this.model} SET function = '${req.body.exp1Form}', description = '${req.body.exp2Form}', period = '${req.body.exp3Form}', student_fk = '${req.body.idForm}'`;
        let query = db.query(sql, req.body, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

  getbyFkExperience =  (req, res) => {
    let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);

    });
};
}

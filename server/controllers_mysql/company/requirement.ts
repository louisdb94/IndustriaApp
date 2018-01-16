import {connection} from '../../app';
import * as  mysql from 'mysql';
import requirement from '../../models_mysql/company/requirement';

import BaseSqlCtrl from '../baseSql';

export default class CompanyRequirementCtrl extends BaseSqlCtrl {

  model = 'requirements';
  dummy = requirement;

    // Insert post 1
    insertForm =  (req, res) => {
        let sql = `INSERT INTO ${this.model} SET name = '${req.body.req1Form}', vacatures_fk = '${req.body.idForm}'`;
        let query = connection.query(sql, req.body, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

    getbyFkExperience =  (req, res) => {
    let sql = `SELECT * FROM ${this.model} WHERE vacatures_fk = '${req.params.id}'`;
    let query = connection.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);

        });
    };
}//

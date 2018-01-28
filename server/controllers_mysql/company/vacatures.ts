import { pool } from '../../app';
import * as  mysql from 'mysql';
import vacatures from '../../models_mysql/company/vacatures';

import BaseSqlCtrl from '../baseSql';

export default class VacaturesCtrl extends BaseSqlCtrl {

    model = 'vacatures';
    dummy = vacatures;

    updateAll = (req, res) => {
        console.log(req.body);
        const sql = `UPDATE ${this.model} SET type = '${req.body.type}',
                                          about = '${req.body.about}'

                                          WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, null);
    }

    insertForm = (req, res) => {
        const sql = `INSERT INTO ${this.model} SET name = '${req.body.vac1Form}', type = '${req.body.vac2Form}', about = '${req.body.vac3Form}', company_fk = '${req.body.idForm}'`;
        this.executeQuery(sql, req, res, null, null);
    }
}

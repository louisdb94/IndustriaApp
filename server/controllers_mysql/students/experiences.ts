
import * as  mysql from 'mysql';
import experiences from '../../models_mysql/students/experiences';

import BaseSqlCtrl from '../baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

    model = 'experiences';
    dummy = experiences;

    // Insert post 1
    insertForm = (req, res) => {
        const sql = `INSERT INTO ${this.model} SET function = '${req.body.exp1Form}', description = '${req.body.exp2Form}', period = '${req.body.exp3Form}', student_fk = '${req.body.idForm}'`;
        this.executeQuery(sql, req, res, null, null);
    }

    getbyFkExperience = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, null, null);
    }

    updateAll = (req, res) => {
        const sql = `UPDATE ${this.model} SET function = '${req.body.function}', description = '${req.body.description}', period = '${req.body.period}' WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, 'post updated...');
    }
}

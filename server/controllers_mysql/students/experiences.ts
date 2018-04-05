
import * as  mysql from 'mysql';
import experiences from '../../models_mysql/students/experiences';

import BaseSqlCtrl from '../baseSql';

export default class ExperienceCtrl extends BaseSqlCtrl {

    model = 'experiences';
    dummy = experiences;

    // Insert post 1
    insertForm = (req, res) => {
        let sql = `INSERT INTO ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?`;
        let insert = [this.model, 'function', req.body.exp1Form, 'description', req.body.exp2Form, 'period', req.body.exp3Form, 'student_fk', req.body.idForm]
        sql = mysql.format(sql, insert);
        this.executeQuery(sql, req, res, null, null);
    }

    getbyFkExperience = (req, res) => {
        let sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const inserts = [this.model, 'student_fk', req.params.id];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, null);
    }

    updateAll = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
        const inserts = [this.model, 'function', req.body.function, 'description', req.body.description, 'period', req.body.period, 'id', req.body.id];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, 'post updated...');
    }
}

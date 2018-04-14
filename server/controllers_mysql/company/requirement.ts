import { pool } from '../../app';
import * as  mysql from 'mysql';
import requirement from '../../models_mysql/company/requirement';

import BaseSqlCtrl from '../baseSql';

export default class CompanyRequirementCtrl extends BaseSqlCtrl {

    model = 'requirements';
    dummy = requirement;

    // Insert post 1
    insertForm = (req, res) => {
        pool.getConnection(function (error, connection) {
            let sql = `INSERT INTO ?? SET ?? = ?, ?? = ?`;
            const insert = ['requirements', 'name', req.body.req1Form, 'vacatures_fk', req.body.idForm];
            sql = mysql.format(sql, insert);
            const query = connection.query(sql, req.body, (err, result) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                res.json(result);
                connection.release();
            });
        });
    }

    getbyFkExperience = (req, res) => {
        pool.getConnection(function (error, connection) {
            let sql = `SELECT * FROM ?? WHERE ?? = ?`;
            const insert = ['requirements', 'vacatures_fk', req.params.id];
            sql = mysql.format(sql, insert);
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                res.json(result);
                connection.release();
            });
        });
    }
    updateAll = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const insert = ['requirements', 'name', req.body.name, 'id', req.body.id];
        sql = mysql.format(sql, insert);
        this.executeQuery(sql, req, res, null, 'post updated...');
    }
}

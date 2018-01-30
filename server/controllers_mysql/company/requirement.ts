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
            const sql = `INSERT INTO requirements SET name = '${req.body.req1Form}', vacatures_fk = '${req.body.idForm}'`;
            const query = connection.query(sql, req.body, (err, result) => {
                if (err) {
                    // connection.release();
                    throw err;
                }
                res.json(result);
                connection.release();
            });
        });
    }

    getbyFkExperience = (req, res) => {
        pool.getConnection(function (error, connection) {
            const sql = `SELECT * FROM requirements WHERE vacatures_fk = '${req.params.id}'`;
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    // connection.release();
                    throw err;
                }
                res.json(result);
                connection.release();
            });
        });
    }
    updateAll = (req, res) => {
        const sql = `UPDATE ${this.model} SET name = '${req.body.name}' WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, 'post updated...');
    }
}//

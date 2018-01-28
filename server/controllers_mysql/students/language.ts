import { pool } from '../../app';
import * as  mysql from 'mysql';
import language from '../../models_mysql/students/language';

import BaseSqlCtrl from '../baseSql';

export default class LanguageCtrl extends BaseSqlCtrl {

    model = 'language';
    dummy = language;

    // Select single post
    getbyLanguage = (req, res) => {
        const sql = `SELECT type, student_fk FROM ${this.model} WHERE type = '${req.params.lang}'`;
        this.executeQuery(sql, req, res, null, null);
    }

    selectLanguage = (req, res) => {
        const sql = `SELECT DISTINCT type FROM ${this.model}`;
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                for (let i = 0; i < results.length; i++) {
                    if (results[i].type === '') {
                        results.splice(i, 1);
                    }
                }
                connection.release();
                res.json(results);
            });
        });

    }


    updateAll = (req, res) => {
        const sql = `UPDATE ${this.model} SET type = '${req.body.type}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }

}

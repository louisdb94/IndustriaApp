import { pool } from '../../app';
import * as  mysql from 'mysql';
import language from '../../models_mysql/students/language';

import BaseSqlCtrl from '../baseSql';

export default class LanguageCtrl extends BaseSqlCtrl {

    model = 'language';
    dummy = language;

    // Select single post
    getbyLanguage = (req, res) => {
        let sql = `SELECT ??, ?? FROM ?? WHERE ?? = ?`;
        const inserts = ['type', 'student_fk', this.model, 'type', req.params.type];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, null);
    }

    selectLanguage = (req, res) => {
        let sql = `SELECT DISTINCT ?? FROM ??`;
        const inserts = ['type', this.model];
        sql = mysql.format(sql, inserts);
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
                res.json(results);
                connection.release();
            });
        });

    }


    updateAll = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
        const inserts = [this.model, 'type', req.body.type, 'value', req.body.value, 'value_type', req.body.value_type, 'id', req.body.id];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }

}

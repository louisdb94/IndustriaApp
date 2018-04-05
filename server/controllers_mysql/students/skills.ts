import { pool } from '../../app';
import * as  mysql from 'mysql';
import sql_skills from '../../models_mysql/students/skills';

import BaseSqlCtrl from '../baseSql';

export default class SkillsCtrl extends BaseSqlCtrl {

    model = 'skills';
    dummy = sql_skills;

    selectSkill = (req, res) => {
        let sql = `SELECT DISTINCT ?? FROM ??`;
        const inserts = ['skill', this.model];
        sql = mysql.format(sql, inserts);
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                for (let i = 0; i < results.length; i++) {
                    if (results[i].skill === '') {
                        results.splice(i, 1);
                    }
                }
                res.json(results);
                connection.release();
            });
        });
    }

    // Select single post
    getbySkill = (req, res) => {
        let sql = `SELECT ??, ?? FROM ?? WHERE ?? = ?`;
        const inserts = ['skill', 'student_fk', this.model, 'skill', req.params.skill];
        sql = mysql.format(sql, inserts);
        pool.getConnection(function (error, connection) {
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
        let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
        const inserts = [this.model, 'skill', req.body.skill, 'value', req.body.value, 'value_type', req.body.value_type, 'id', req.body.id];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }

}

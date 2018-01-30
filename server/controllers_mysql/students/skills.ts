import { pool } from '../../app';
import * as  mysql from 'mysql';
import sql_skills from '../../models_mysql/students/skills';

import BaseSqlCtrl from '../baseSql';

export default class SkillsCtrl extends BaseSqlCtrl {

    model = 'skills';
    dummy = sql_skills;

    // Select posts
    selectSkill = (req, res) => {
        const sql = `SELECT DISTINCT skill FROM ${this.model}`;
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    // connection.release();
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
        const sql = `SELECT skill, student_fk FROM ${this.model} WHERE skill = '${req.params.skill}'`;
        pool.getConnection(function (error, connection) {
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
        const sql = `UPDATE ${this.model} SET skill = '${req.body.skill}', value = '${req.body.value}', value_type = '${req.body.value_type}'  WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }

}

import { pool } from '../../app';
import * as  mysql from 'mysql';
import events from '../../models_mysql/admin/events';

import BaseSqlCtrl from '../baseSql';

export default class EventsCtrl extends BaseSqlCtrl {

    model = 'events';
    dummy = events;


    selectAll = (req, res) => {
        //const sql = `SELECT id, title, start, end, color FROM ${this.model}`;
        let sql = `SELECT * FROM ??`;
        const insert = [this.model];
        sql = mysql.format(sql, insert);
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                res.json(results);
            });
            connection.release();
        });
    }


    updateEvent = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
        const insert = [this.model, 'title', req.body.title, 'start', req.body.start, 'end', req.body.end, 'color', req.body.color, 'id', req.body.id];
        sql = mysql.format(sql, insert);                              
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
}

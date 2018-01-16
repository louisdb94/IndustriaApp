import { connection } from '../../app';
import * as  mysql from 'mysql';
import events from '../../models_mysql/admin/events';

import BaseSqlCtrl from '../baseSql';

export default class EventsCtrl extends BaseSqlCtrl {

    model = 'events';
    dummy = events;


    // Select posts
    selectAll = (req, res) => {
        let sql = `SELECT id, title, start, end, color FROM ${this.model}`;
        let query = connection.query(sql, (err, results) => {
            if (err) {
                console.log('An error has occured', err); // null
                throw err;
            }
            res.json(results);
        });
    };

    updateEvent = (req, res) => {
        let sql = `UPDATE ${this.model} SET title = '${req.body.title}',
                                          start = '${req.body.start}',
                                          end = '${req.body.end}',
                                          color = '${req.body.color}'

                                      WHERE id = ${req.body.id}`;

        let query = connection.query(sql, (err, result) => {
            if (err) {
                console.log('An error has occured', err); // null
                throw err;
            }
            res.json(result);
        });
    };

}

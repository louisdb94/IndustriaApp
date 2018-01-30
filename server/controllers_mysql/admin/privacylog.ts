import { pool } from '../../app';
import * as  mysql from 'mysql';
import privacylog from '../../models_mysql/admin/privacylog';

import BaseSqlCtrl from '../baseSql';

export default class PrivacylogCtrl extends BaseSqlCtrl {

    model = 'privacylog';
    dummy = privacylog;

    insertPrivacylog = (req, res) => {
        const sql = `INSERT INTO ${this.model} SET ?`;
        pool.getConnection(function (error, connection) {
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
}


import * as  mysql from 'mysql';
import sql_socialmedia from '../../models_mysql/students/socialmedia';

import BaseSqlCtrl from '../baseSql';

export default class SocialmediaCtrl extends BaseSqlCtrl {

    model = 'socialmedia';
    dummy = sql_socialmedia;

    updateAll = (req, res) => {
        const sql = `UPDATE ${this.model} SET type = '${req.body.type}', url = '${req.body.url}', checked = '${req.body.checked}' WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }
}

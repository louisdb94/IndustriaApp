
import * as  mysql from 'mysql';
import sql_socialmedia from '../../models_mysql/students/socialmedia';

import BaseSqlCtrl from '../baseSql';

export default class SocialmediaCtrl extends BaseSqlCtrl {

    model = 'socialmedia';
    dummy = sql_socialmedia;

    updateAll = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? `;
        const inserts = [this.model, 'type', req.body.type,'url', req.body.url,'checked', req.body.checked, 'id', req.body.id];
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, null, 'Post updated..');
    }
}

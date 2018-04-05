import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as jwt from 'jsonwebtoken';
import vacatures from '../../models_mysql/company/vacatures';

var CryptoJS = require("crypto-js");

import BaseSqlCtrl from '../baseSql';

export default class VacaturesCtrl extends BaseSqlCtrl {

    model = 'vacatures';
    dummy = vacatures;
    

    updateAll = (req, res) => {
        let sql = `UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?`;
        const insert = [this.model, 'type', req.body.type, 'about', req.body.about, 'id', req.body.id];
        sql = mysql.format(sql, insert);
        this.executeQuery(sql, req, res, null, null);
    }

    getbyIdVacature = (req, res) => {
        let sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const insert = [this.model, 'id', req.params.id];
        sql = mysql.format(sql, insert);
        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, results) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                var encrypted = CryptoJS.AES.encrypt(JSON.stringify(results), 'secret key 123');
                var encrypted_string = encrypted.toString();

                const token = jwt.sign({ results: encrypted_string }, 
                process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds

                res.status(200).json({ token: token });
                connection.release();
            });
        });
      }

    insertForm = (req, res) => {
        let sql = `INSERT INTO ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?`;
        const insert = [this.model, 'name', req.body.vac1Form, 'type', req.body.vac2Form, 'about', req.body.vac3Form, 'company_fk', req.body.idForm];
        sql = mysql.format(sql, insert);
        this.executeQuery(sql, req, res, null, null);
    }
}

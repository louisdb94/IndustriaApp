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
        console.log(req.body);
        const sql = `UPDATE ${this.model} SET type = '${req.body.type}',
                                          about = '${req.body.about}'

                                          WHERE id = ${req.body.id}`;
        this.executeQuery(sql, req, res, null, null);
    }

    getbyIdVacature = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
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
        const sql = `INSERT INTO ${this.model} SET name = '${req.body.vac1Form}', type = '${req.body.vac2Form}', about = '${req.body.vac3Form}', company_fk = '${req.body.idForm}'`;
        this.executeQuery(sql, req, res, null, null);
    }
}

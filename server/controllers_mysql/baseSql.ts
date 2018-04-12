import { pool } from '../app';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as  mysql from 'mysql';
import { UserModel, UserCrud } from '../models/users';
import { StudentModel, StudentCrud } from '../models/students';

var CryptoJS = require("crypto-js");

abstract class BaseSqlCtrl {

    abstract model: any;
    abstract dummy: any;

    public userCrud = new UserCrud();
    public studentsCrud = new StudentCrud();
    // abstract field: any;

    executeQuery(sql, req, res, param, resultString) {
        pool.getConnection(function (error, connection) {
            if (error) {
                if (pool._freeConnections.indexOf(connection) === -1) {
                    connection.release();
                }
                throw error;
            }
            if (param) {
                connection.query(sql, param, (err, result) => {
                    if (err) {
                        if (pool._freeConnections.indexOf(connection) === -1) {
                            connection.release();
                        }
                        throw err;
                    }
                    if (resultString) {
                        encrypt(resultString, res);
                    } else {
                        encrypt(result, res);
                    }
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                });
            } else {
                connection.query(sql, (err, result) => {
                    if (err) {
                        if (pool._freeConnections.indexOf(connection) === -1) {
                            connection.release();
                        }
                        throw err;
                    }
                    if (resultString) {
                        encrypt(resultString, res);
                    } else {
                        encrypt(result, res);
                    }
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                });
            }
        });

        function encrypt(result, res){
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(result), 'secret key 123');
            var encrypted_string = encrypted.toString();
      
            const token = jwt.sign({ results: encrypted_string },
            process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
        }
    }

    getsql = (req, res) => {
        const resultString = 'Posts table created...';
        this.executeQuery(this.dummy, req, res, null, resultString);
    }

    insert = (req, res) => {

        const sql = `INSERT INTO ${this.model} SET ?`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    //Refactored insert met crud
    Invoegen = (req, res) => {
        const map: Map<string, string> = new Map();
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
              map.set(key, req.body[key])
            }
        }

        var crud_controller = this.model + "Crud";
        this[crud_controller].insert(map).then(result => {
            res.status(200).json({ results: result });
        });
    }

    //Refactored delete met crud
    verwijder = (req, res) => {
        let key_body, data_body;
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
              key_body = key;
              data_body = req.body[key];
            }
        }
        var crud_controller = this.model + "Crud";
        this[crud_controller].delete(key_body,data_body).then(result => {
            res.status(200).json({ results: result });
        });
    }

    //Refactored update met crud
    update = (req, res) => {
        const map: Map<string, string> = new Map();
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
              map.set(key, req.body[key])
            }
        }

        var crud_controller = this.model + "Crud";
        this[crud_controller].update('id',req.body.id, map).then(result => {
            res.status(200).json({ results: result });
        });
    }

    //Refactored select met crud
    get = (req, res) => {  
        var crud_controller = this.model + "Crud";
        this[crud_controller].get().then(result => {
            res.status(200).json({ results: result });
        });
    }

    //Refactored select where met crud
    getWhere = (req, res) => {
        let key_body, data_body;
        for(var key in req.body) {
            if(req.body.hasOwnProperty(key)){
              key_body = key;
              data_body = req.body[key];
            }
        }
        var crud_controller = this.model + "Crud";
        this[crud_controller].getBy(key_body,data_body).then(result => {
            res.status(200).json({ results: result });
        });
    }

    insertStudentFK = (req, res) => {
        const inserts = [this.model,'student_fk', req.params.id];
        let sql = `INSERT INTO ?? SET ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    insertCompanyFK = (req, res) => {
        const inserts = [this.model,'company_fk', req.params.id];
        let sql = `INSERT INTO ?? SET ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }


    insertVacatureFK = (req, res) => {
        const inserts = [this.model,'vacature_fk', req.params.id];
        let sql = `INSERT INTO ?? SET ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    insertUser = (req, res) => {
        const inserts = [this.model,'user_fk', req.params.id];
        let sql = `INSERT INTO ?? SET ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    select = (req, res) => {
        const inserts = [this.model];
        let sql = `SELECT * FROM ??`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    selectIds = (req, res) => {
        const inserts = ['id', this.model];
        let sql = `SELECT ?? FROM ??`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyId = (req, res) => {
        const inserts = [this.model, 'id', req.params.id];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyRole = (req, res) => {
        const inserts = [this.model, 'role', 'company'];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyFk = (req, res) => {
        const inserts = [this.model, 'student_fk', req.params.id];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyStudentId = (req, res) => {
        const inserts = [this.model, 'student_fk', req.params.id];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyCompanyId = (req, res) => {
        const inserts = [this.model, 'company_fk', req.params.id];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyUserId = (req, res) => {
        const inserts = [this.model, 'user_fk', req.params.id];
        let sql = `SELECT * FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    delete = (req, res) => {
        const inserts = [this.model, 'id', req.params.id];
        let sql = `DELETE FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);
        this.executeQuery(sql, req, res, req.body, null);
    }

    deleteCompany = (req, res) => {
        const inserts = ['vacatures', 'company_fk', req.body.id];
        let sql = `DELETE FROM ??  WHERE ?? = ?`;
        sql = mysql.format(sql, inserts);

        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const inserts4 = ['contact_company', 'company_fk', req.body.id];
            let sql4 = `DELETE FROM ??  WHERE ?? = ?`;
            sql4 = mysql.format(sql4, inserts4);
            const query4 = connection.query(sql4, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const inserts1 = ['companies', 'id', req.body.id];
            let sql1 = `DELETE FROM ??  WHERE ?? = ?`;
            sql1 = mysql.format(sql1, inserts1);
            const query1 = connection.query(sql1, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const inserts2 = ['user', 'id', req.body.user_fk];
            let sql2 = `DELETE FROM ??  WHERE ?? = ?`;
            sql2 = mysql.format(sql2, inserts2);
            const query2 = connection.query(sql2, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            connection.release();
        });
    }


    deleteStudent = (req, res) => {
        pool.getConnection(function (error, connection) {
            const inserts = ['contact', 'student_fk', req.params.student_fk];
            let sql = `DELETE FROM ??  WHERE ?? = ?`;
            sql = mysql.format(sql, inserts);
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const inserts1 = ['cvs', 'student_fk', req.params.student_fk];
            let sql1 = `SELECT * FROM ??  WHERE ?? = ?`;
            sql1 = mysql.format(sql1, inserts1);
            const query1 = connection.query(sql1, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
                if (result[0]) {
                    if(result[0].name){
                        fs.unlink('./uploads/cvs/' + result[0].name + '(' + result[0].number + ')' + '.' + result[0].mimetype);
                    }
                }
            });
            const inserts10 = ['cvs', 'student_fk', req.params.student_fk];
            let sql10 = `DELETE FROM ??  WHERE ?? = ?`;
            sql10 = mysql.format(sql10, inserts10);
            const query_ = connection.query(sql10, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts9 = ['privacylog', 'student_fk', req.params.student_fk];
            let sql9 = `DELETE FROM ??  WHERE ?? = ?`;
            sql9 = mysql.format(sql9, inserts9);
            const query9 = connection.query(sql9, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts2 = ['education', 'student_fk', req.params.student_fk];
            let sql2 = `DELETE FROM ??  WHERE ?? = ?`;
            sql2 = mysql.format(sql2, inserts2);
            const query2 = connection.query(sql2, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts3 = ['experiences', 'student_fk', req.params.student_fk];
            let sql3 = `DELETE FROM ??  WHERE ?? = ?`;
            sql3 = mysql.format(sql3, inserts3);
            const query3 = connection.query(sql3, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts4 = ['language', 'student_fk', req.params.student_fk];
            let sql4 = `DELETE FROM ??  WHERE ?? = ?`;
            sql4 = mysql.format(sql4, inserts4);
            const query4 = connection.query(sql4, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts5 = ['professional', 'student_fk', req.params.student_fk];
            let sql5 = `DELETE FROM ??  WHERE ?? = ?`;
            sql5 = mysql.format(sql5, inserts5);
            const query5 = connection.query(sql5, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts6 = ['skills', 'student_fk', req.params.student_fk];
            let sql6 = `DELETE FROM ??  WHERE ?? = ?`;
            sql6 = mysql.format(sql6, inserts6);
            const query6 = connection.query(sql6, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts7 = ['socialmedia', 'student_fk', req.params.student_fk];
            let sql7 = `DELETE FROM ??  WHERE ?? = ?`;
            sql7 = mysql.format(sql7, inserts7);
            const query7 = connection.query(sql7, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const inserts8 = ['user_fk', 'students', 'id', req.params.student_fk];
            let sql8 = `SELECT ?? FROM ??  WHERE ?? = ?`;
            sql8 = mysql.format(sql8, inserts8);
            const query8 = connection.query(sql8, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
                const insertsx = ['students', 'id', req.params.student_fk];
                let sqlx = `DELETE FROM ??  WHERE ?? = ?`;
                sqlx = mysql.format(sqlx, insertsx);
                const queryx = connection.query(sqlx, (err_, result_) => {
                    if (err_) {
                        if (pool._freeConnections.indexOf(connection) === -1) {
                            connection.release();
                        }
                        throw err_;
                    }
                });
                const insertsy = ['user', 'id', result[0].user_fk];
                let sqly = `DELETE FROM ??  WHERE ?? = ?`;
                sqly = mysql.format(sqly, insertsy);
                const queryy = connection.query(sqly, (errx, resultx) => {
                    if (errx) {
                        if (pool._freeConnections.indexOf(connection) === -1) {
                            connection.release();
                        }
                        throw errx;
                    }
                });

            });
            res.send('user deleted');
            if (pool._freeConnections.indexOf(connection) === -1) {
                connection.release();
            }
        });
    }
}

export default BaseSqlCtrl;

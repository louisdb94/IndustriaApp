import { pool } from '../app';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

var CryptoJS = require("crypto-js");

abstract class BaseSqlCtrl {

    abstract model: any;
    abstract dummy: any;

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
                        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(resultString), 'secret key 123');
                        var encrypted_string = encrypted.toString();

                        const token = jwt.sign({ results: encrypted_string }, 
                        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds

                        res.status(200).json({ token: token });
                    } else {
                        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(result), 'secret key 123');
                        var encrypted_string = encrypted.toString();

                        const token = jwt.sign({ results: encrypted_string }, 
                        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds

                        res.status(200).json({ token: token });
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
                        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(resultString), 'secret key 123');
                        var encrypted_string = encrypted.toString();

                        const token = jwt.sign({ results: encrypted_string }, 
                        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds

                        res.status(200).json({ token: token });
                    } else {
                        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(result), 'secret key 123');
                        var encrypted_string = encrypted.toString();

                        const token = jwt.sign({ results: encrypted_string }, 
                        process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds

                        res.status(200).json({ token: token });
                    }
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                });
            }
        });
    }

    getsql = (req, res) => {
        const resultString = 'Posts table created...';
        this.executeQuery(this.dummy, req, res, null, resultString);
    }

    insert = (req, res) => {

        const sql = `INSERT INTO ${this.model} SET ?`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    insertStudentFK = (req, res) => {

        const sql = `INSERT INTO ${this.model} SET student_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    insertCompanyFK = (req, res) => {
        const sql = `INSERT INTO ${this.model} SET company_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }


    insertVacatureFK = (req, res) => {

        const sql = `INSERT INTO ${this.model} SET vacature_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    insertUser = (req, res) => {

        const sql = `INSERT INTO ${this.model} SET user_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    select = (req, res) => {
        const sql = `SELECT * FROM ${this.model}`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    selectIds = (req, res) => {
        const sql = `SELECT id FROM ${this.model}`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyId = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyRole = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE role = 'company'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyFk = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyStudentId = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyCompanyId = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE company_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    getbyUserId = (req, res) => {
        const sql = `SELECT * FROM ${this.model} WHERE user_fk = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    delete = (req, res) => {
        const sql = `DELETE FROM ${this.model} WHERE id = '${req.params.id}'`;
        this.executeQuery(sql, req, res, req.body, null);
    }

    deleteCompany = (req, res) => {
        const sql = `DELETE FROM vacatures WHERE company_fk = '${req.body.id}'`;

        pool.getConnection(function (error, connection) {
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql4 = `DELETE FROM contact_company WHERE company_fk = '${req.body.id}'`;
            const query4 = connection.query(sql4, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql1 = `DELETE FROM companies WHERE id = '${req.body.id}'`;
            const query1 = connection.query(sql1, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql2 = `DELETE FROM user WHERE id = '${req.body.user_fk}'`;
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
            const sql = `DELETE FROM contact WHERE student_fk = '${req.params.student_fk}'`;
            const query = connection.query(sql, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql1 = `SELECT * FROM cvs WHERE student_fk = '${req.params.student_fk}'`;
            const query1 = connection.query(sql1, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
                if (result[0]) {
                    fs.unlink('./uploads/cvs/' + result[0].name + '(' + result[0].number + ')' + '.' + result[0].mimetype);
                }
            });
            const sql_ = `DELETE FROM cvs WHERE student_fk = '${req.params.student_fk}'`;
            const query_ = connection.query(sql_, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });

            const sql9 = `DELETE FROM privacylog WHERE student_fk = '${req.params.student_fk}'`;
            const query9 = connection.query(sql9, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql2 = `DELETE FROM education WHERE student_fk = '${req.params.student_fk}'`;
            const query2 = connection.query(sql2, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql3 = `DELETE FROM experiences WHERE student_fk = '${req.params.student_fk}'`;
            const query3 = connection.query(sql3, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql4 = `DELETE FROM language WHERE student_fk = '${req.params.student_fk}'`;
            const query4 = connection.query(sql4, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql5 = `DELETE FROM professional WHERE student_fk = '${req.params.student_fk}'`;
            const query5 = connection.query(sql5, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql6 = `DELETE FROM skills WHERE student_fk = '${req.params.student_fk}'`;
            const query6 = connection.query(sql6, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql7 = `DELETE FROM socialmedia WHERE student_fk = '${req.params.student_fk}'`;
            const query7 = connection.query(sql7, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
            });
            const sql8 = `SELECT user_fk FROM students WHERE id = '${req.params.student_fk}'`;
            const query8 = connection.query(sql8, (err, result) => {
                if (err) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    throw err;
                }
                const sqlx = `DELETE FROM students WHERE id = '${req.params.student_fk}'`;
                const queryx = connection.query(sqlx, (err_, result_) => {
                    if (err_) {
                        if (pool._freeConnections.indexOf(connection) === -1) {
                            connection.release();
                        }
                        throw err_;
                    }
                });
                const sqly = `DELETE FROM user WHERE id = '${result[0].user_fk}'`;
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

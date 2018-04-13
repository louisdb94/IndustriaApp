import { DefaultModel } from './default-model.model';
import { pool } from '../app';
import * as jwt from 'jsonwebtoken';
import * as  mysql from 'mysql';

let CryptoJS = require("crypto-js");

export abstract class DefaultCrud<T extends DefaultModel>{


    constructor(private tableName: string) {

    }

    public get(): Promise<T[]> {
        const sql = `SELECT * FROM ${this.tableName}`;

        return this.getConnection().then(conn => {
            if (conn) {
                return new Promise<T[]>((resolve, reject) => {
                    return conn.query(sql, (err, result) => {
                        const resultObjects: T[] = [];

                        for (const row of result) {
                            resultObjects.push(this.parseObject(row));
                        }
                        return resolve(resultObjects);
                    });
                });
            } else {
                Promise.reject('Could not create connection');
            }
        });
    }

    public getBy(table_name: string, column_name: string, whereId: any): Promise<T[]> {
        let sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const inserts = [table_name, column_name, whereId];
        sql = mysql.format(sql, inserts);
        return this.getConnection().then(conn => {
            if (conn) {
                return new Promise<T[]>((resolve, reject) => {
                    return conn.query(sql, (err, result) => {
                        const resultObjects: T[] = [];

                        for (const row of result) {
                            resultObjects.push(this.parseObject(row));
                        }
                        return resolve(resultObjects);
                    });
                });
            } else {
                Promise.reject('Could not create connection');
            }
        });
    }


    public update(column_name: string, whereId: any, params: Map<string, string>): Promise<T> {
        let sql = `UPDATE ${this.tableName} SET `;
        const columns = params.keys();

        for (const column of Array.from(columns)) {
            sql += ` ${column} = ?,`;
        }
        if (sql.slice(-1) === ',') {
            sql = sql.slice(0, -1);
        }

        sql += ` WHERE ${column_name} = ${whereId}`;

        const values = Array.from(params.values());

        return this.getConnection().then(conn => {
            if (conn) {
                return new Promise<T>((resolve, reject) => {
                    return conn.query(sql, values, (err, result) => {
                        if (result) {
                            return resolve(this.parseObject(result));
                        } else {
                            return reject(err);
                        }
                    });
                });
            } else {
                Promise.reject('Could not create connection');
            }
        });
    }

    public insert(params: Map<string, string>): Promise<T> {
        let sql = `INSERT INTO ${this.tableName} SET `;
        const columns = params.keys();

        for (const column of Array.from(columns)) {
            sql += ` ${column} = ?,`;
        }
        if (sql.slice(-1) === ',') {
            sql = sql.slice(0, -1);
        }

        const values = Array.from(params.values());

        return this.getConnection().then(conn => {
            if (conn) {
                return new Promise<T>((resolve, reject) => {
                    return conn.query(sql, values, (err, result) => {
                        if (result) {
                        return resolve(result);
                        } else {
                            return reject(err);
                        }
                    });
                });
            } else {
                Promise.reject('Could not create connection');
            }
        });
    }

    public delete(table_name: string, column_name: string, whereId: any): Promise<T> {
        let sql = `DELETE FROM ?? WHERE ?? = ?`;
        const inserts = [table_name, column_name, whereId];
        sql = mysql.format(sql, inserts);
        return this.getConnection().then(conn => {
            if (conn) {
                return new Promise<T>((resolve, reject) => {
                    return conn.query(sql, (err, result) => {
                        return resolve(this.parseObject(result));
                    });
                });
            } else {
                Promise.reject('Could not create connection');
            }
        });
    }

    private getConnection() {
        return new Promise<any>((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    if (pool._freeConnections.indexOf(connection) === -1) {
                        connection.release();
                    }
                    reject(error);
                    // throw error;
                }

                return resolve(connection);
            });
        });
    }

    abstract parseObject(input: any): T;
}

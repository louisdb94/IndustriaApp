import { DefaultModel } from './default-model.model';
import { pool } from '../app';
import * as jwt from 'jsonwebtoken';

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

    public getById(id: number): Promise<T> {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;

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

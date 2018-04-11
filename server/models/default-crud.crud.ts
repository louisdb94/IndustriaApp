import {DefaultModel} from './default-model.model';
import { pool } from '../app';
import * as jwt from 'jsonwebtoken';

let CryptoJS = require("crypto-js");

export class DefaultCrud<T extends DefaultModel>{


constructor(private tableName: string){

}

  public get(): Promise<T[]>{
    const mysqlConnection = this.getConnection();

    let sql = `SELECT * FROM ${this.tableName}`;
    const promise =  pool.getConnection(function (error, connection) {
          if (error) {
              if (pool._freeConnections.indexOf(connection) === -1) {
                  connection.release();
              }
              console.log("error",error);
              throw error;
          }
          return connection.query(sql, (err, result) => {
             //const rows = result;
             //let resultObjects: T[] = [];
             // for(let item of result){
             //   // const _user:T = T.parseObject(item);
             //   resultObjects.push(item);
             //   console.log(_user);
             //
             // }
             return Promise.resolve(result);
         });
        });
      console.log('promise?', promise);
    return promise;
    // return mysqlConnection.query(sql, (err, result) => {
    //     const rows = result.results;
    //     let resultObjects: T[] = [];
    //
    //     rows.foreach(row => {
    //       let object: T  = JSON.parse(row);
    //       resultObjects.push(object);
    //     })
    //     return Promise.resolve(resultObjects);
    // });
  }


  private getConnection() {
    return pool.getConnection(function (error, connection) {
          if (error) {
              if (pool._freeConnections.indexOf(connection) === -1) {
                  connection.release();
              }
              console.log("error",error);
              throw error;
          }
          return connection;
        });


  }
}

import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import setShibbRoutes from './config/shibboleth';
import {setRoutes } from './routes/routes';
import * as  mysql from 'mysql';
import * as fileupload from 'express-fileupload';

import * as fs from 'fs';

const passportSetup = require('./config/passport-setup');
const app = express();


dotenv.load({ path: '.env' });

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({ safeFileNames: true }));

// const pool = mysql.createPool({
//     //in production: docker5390-industria-staging.cloud.interhostsolutions.be
//     host: process.env.dbHost,
//     user: process.env.dbUser,
//     password: process.env.dbPassword,
//     database: process.env.database,
// });

//Localhost test

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME ? process.env.DB_NAME : 'br_industria'
});


pool.getConnection(function (err, connection) {

    // Handle error after the release.
    if (err) {
        throw err;
    }
    connection.release();
    console.log(`db ${process.env.DB_NAME} connected`);
});

app.use((err, req, res, next) => {
    const response = {
        code: err.status,
        message: err.message,
        errors: err.errors,
        stack: err.stack,
    };
    res.status(err.status);
    res.json(response);
    res.end();
});


// // Create DB
// app.get('/createdb', (req, res) => {
//     const sql = 'CREATE DATABASE IF NOT EXISTS br_industria';
//     this.pool.getConnection(function (err, connection) {
//         connection.query(sql, (error, result) => {
//             connection.release();
//             // Handle error after the release.
//             if (error) {
//                 throw error;
//             }
//             console.log(result);
//             res.send('Database created...');
//         });
//     });
// });

var router = express.Router();
setRoutes(app,router);
setShibbRoutes(app);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port', process.env.PORT || 3000);
});



export { app, pool };

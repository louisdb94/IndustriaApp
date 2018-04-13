import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import setRoutes from './routes';
import setRoutes2 from './routes2';
import setShibbRoutes from './config/shibboleth';
import setAuthRoutes from './auth-routes';
import * as  mysql from 'mysql';
import * as fileupload from 'express-fileupload';

import * as fs from 'fs';

const passportSetup = require('./config/passport-setup');
const app = express();


dotenv.load({ path: '.env' });

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
//
app.use(fileupload({ safeFileNames: true }));

const pool = mysql.createPool({
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    user: process.env.DB_USER ? process.env.DB_USER : 'industria',
    //    host: 'node5390-industria-staging.cloud.interhostsolutions.be',
    //    password: 'HAJzfboxsR',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
    port: process.env.DB_PORT ? process.env.DB_PORT : '3306',
    database: process.env.DB_NAME ? process.env.DB_NAME : 'br_industria'
});

// const pool = mysql.createPool({
//     //in production: docker5390-industria-staging.cloud.interhostsolutions.be
//     host: process.env.dbHost ? process.env.dbHost : 'localhost',
//     user: process.env.dbUser ? process.env.dbUser : 'industria',
//     password: process.env.dbPassword ? process.env.dbPassword : 'VUS4iaLWgG',
//     database: process.env.database ? process.env.database : 'br_industria',
//     // password: 'HAJzfboxsR',
//     // port: '3306',
// });


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




setRoutes(app);
setRoutes2(app);
setShibbRoutes(app);
setAuthRoutes(app);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port', process.env.PORT || 3000);
});



export { app, pool };

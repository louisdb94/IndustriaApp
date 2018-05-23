import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
// import setRoutes from './routes';
import setRoutes2 from './routes/verifyToken-routes';
import setShibbRoutes from './config/shibboleth';
import {setRoutes, setAdminRoutes, setAdminOrStudentRoutes, setAdminOrStudentZelfRoutes} from './routes/routes';
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


//http://localhost:3000/admincontact   -> naar dit routen
app.get('/admincontact', (req,res) => {
  const sql = `SELECT name, id FROM companies`;
  this.pool.getConnection(function (err, connection) {
          connection.query(sql, (error, result) => {
              // Handle error after the release.
              if (error) {
                  throw error;
              }
              for (let res of result){
                const sql2 = `INSERT INTO admin_companycontact SET name = '${res.name}', company_fk = '${res.id}'`;
                connection.query(sql2, (error, result1) => {
                  if(error){throw error}
                })
              }


              connection.release();
              res.send(result);

          });
      });
});


setRoutes(app);
setShibbRoutes(app);
setRoutes2(app);
setAdminRoutes(app);
setAdminOrStudentRoutes(app);
setAdminOrStudentZelfRoutes(app);



app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port', process.env.PORT || 3000);
});



export { app, pool };

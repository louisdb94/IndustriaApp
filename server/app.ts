import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import setRoutes from './routes';
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

app.use(fileupload({ safeFileNames: true }));

// const db_config = {
//     host: 'sql11.freesqldatabase.com',
//     user: 'sql11211584',
//     password: 'VUS4iaLWgG',
//     port: '3306',
//     database: 'sql11211584'
// };

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'br_industria'
};


// const db_config = {
//     host: 'http://industria-staging.cloud.interhostsolutions.be',
//     user: 'root',
//     password: 'HAJzfboxsR',
//     port: '11011',
//     database: 'br_industria'
// };

// const db_config = {
//     host: 'node5390-industria-staging.cloud.interhostsolutions.be:11011',
//     user: 'root',
//     password: 'HAJzfboxsR',
//     port: '11011',
//     database: 'br_industria'
// };


let connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }
        console.log("db connected");                               // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS br_industria';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


setRoutes(app);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port ', process.env.PORT);
});



export { app, connection };

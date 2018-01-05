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

// Create connection
const db = mysql.createConnection({
    host     : 'sql11.freesqldatabase.com',
    user     : 'sql11211584',
    password : 'VUS4iaLWgG',
    port     : '3306',
    database  : 'sql11211584'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS sql11211584';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


setRoutes(app);
app.listen('3000', () => {
    console.log('Server started on port 3000');
});


// app.set('port', (process.env.PORT || 3000));





export { app, db };

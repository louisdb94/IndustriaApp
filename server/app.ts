import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import setRoutes from './routes';
import setAuthRoutes from './config/shibboleth';
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

const pool = mysql.createPool({
    host: 'localhost',
//    host: 'node5390-industria-staging.cloud.interhostsolutions.be',
    user: 'root',
//    password: 'HAJzfboxsR',
    password: 'root',
    port: "8889",
    database: 'br_industria'
});

app.get('/test', (req, res) => {

  //search user with this rnumber
  //if found set currentUser
  var email_stud = "r0383901@kuleuven.be"
  let name_id = email_stud.substr(0,8);
  console.log(name_id);
  let student_exist = false;
  checkStudent(name_id);

  //functies om student aan te maken
  function checkStudent(rnumber){
      const sql = `SELECT id FROM user WHERE rnumber = '${rnumber}'`;
      pool.getConnection(function (error, connection) {
          connection.query(sql, (err, result) => {
              if (err) {throw err;}
              if(result.length > 0){
                student_exist = true;
                //CurrentUser  - Navigate to home
                res.send("student bestaat")
                console.log("bestaat")

              }
              else{
                // user - student
                  //education - experiences - language - socalmedia x4 - professional - skills - contact
                addUser(name_id);
                res.send("checking if student exist")
                //setCurrentUser
              }

              connection.release();
          })
      });
  }

  function addUser(rnumber) {
    console.log(rnumber);
    var email_stu = rnumber +  "@kuleuven.be"
      const sql = `INSERT INTO user SET rnumber = '${rnumber}', email = 'email_stu'`;
      pool.getConnection(function (error, connection) {
          connection.query(sql, (err, result) => {
              if (err) {throw err;}
              user_fk = result.insertId;
              console.log("user_fk", result)
              const sql1 = `INSERT INTO students SET rnumber = '${rnumber}', user_fk = '${user_fk}'`;
              connection.query(sql1, (err, result1) => {
                  if (err) {throw err;}
                  student_fk = result1.insertId;
                  const sql2 = `INSERT INTO education SET student_fk = '${student_fk}'`;
                  executeQuery(sql2);
                  const sql3 = `INSERT INTO experiences SET student_fk = '${student_fk}'`;
                  executeQuery(sql3);
                  const sql4 = `INSERT INTO language SET student_fk = '${student_fk}'`;
                  executeQuery(sql4);
                  const sql5 = `INSERT INTO socialmedia SET student_fk = '${student_fk}'`;
                  executeQuery(sql5);
                  executeQuery(sql5);
                  executeQuery(sql5);
                  executeQuery(sql5);
                  const sql6 = `INSERT INTO professional SET student_fk = '${student_fk}'`;
                  executeQuery(sql6);
                  const sql7 = `INSERT INTO skills SET student_fk = '${student_fk}'`;
                  executeQuery(sql7);
                  const sql8 = `INSERT INTO contact SET student_fk = '${student_fk}'`;
                  executeQuery(sql8);

              });
          });

          connection.release();
      });
  }

   function executeQuery(sql) {
      pool.getConnection(function (error, connection) {
              connection.query(sql, (err, result) => {
                  if (err) {throw err;}
                  connection.release();
              });
      });
  }
})

console.log('env variables', process.env.database);

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
        console.log("db connected");
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
setAuthRoutes(app);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port', process.env.PORT || 3000);
});



export { app, pool };

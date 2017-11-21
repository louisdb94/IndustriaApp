import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import setRoutes from './routes';
import * as  mysql from 'mysql';


const app = express();


dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : '8889',
    database  : 'industriaApp'
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
    let sql = 'CREATE DATABASE industriaApp';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createsuser', (req, res) => {
    let sql = `CREATE TABLE user (
      user_id int(11) NOT NULL,
      rnumber varchar(20) NOT NULL,
      email varchar(20) NOT NULL,
      password varchar(30) NOT NULL,
      role varchar(20) NOT NULL,
      PRIMARY KEY (user_id)
    )`

     db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});


// Create table
app.get('/createstudents', (req, res) => {
    let sql = `CREATE TABLE students (
      student_id int(10) NOT NULL,
      name varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Elon Musk',
      rnumber varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
      whoami longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
      gradYear int(4) NOT NULL,
      degree varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Electronics',
      cvChecked tinyint(1) NOT NULL DEFAULT '0',
      contactChecked tinyint(1) NOT NULL DEFAULT '0',
      countSkills int(11) NOT NULL DEFAULT '0',
      countLanguage int(11) NOT NULL DEFAULT '0',
      countEducation int(11) NOT NULL DEFAULT '0',
      numberCv int(11) NOT NULL DEFAULT '0',
      image tinyint(1) NOT NULL DEFAULT '0',
      user_fk int(11) NOT NULL,
      PRIMARY KEY (student_id),
      KEY user_fk (user_fk)
    )`

     db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });

});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});



let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});


export { app };

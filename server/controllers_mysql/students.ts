import {db} from '../app';
import * as  mysql from 'mysql';

import BaseSqlCtrl from './baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = 'students';

  // Update post
  updateName = (req, res) => {
      let sql = `UPDATE '${this.model}' SET name = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateRnumber = (req, res) => {
      let sql = `UPDATE '${this.model}' SET rnumber = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateWhoami = (req, res) => {
      let sql = `UPDATE '${this.model}' SET whoami = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateGradyear = (req, res) => {
      let sql = `UPDATE '${this.model}' SET gradYear = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateDegree = (req, res) => {
      let sql = `UPDATE '${this.model}' SET degree = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCvchecked = (req, res) => {
      let sql = `UPDATE '${this.model}' SET cvChecked = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };
  // Update post
  updateContactChecked = (req, res) => {
      let sql = `UPDATE '${this.model}' SET contactChecked = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCountSkills = (req, res) => {
      let sql = `UPDATE '${this.model}' SET countSkills = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCountLanguage = (req, res) => {
      let sql = `UPDATE '${this.model}' SET countLanguage = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateCountEduaction = (req, res) => {
      let sql = `UPDATE '${this.model}' SET countEducation = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateNumbercv = (req, res) => {
      let sql = `UPDATE '${this.model}' SET numberCv = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };

  // Update post
  updateImage = (req, res) => {
      let sql = `UPDATE '${this.model}' SET image = '${req.body}' WHERE id = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('Post updated...');
      });
  };



}

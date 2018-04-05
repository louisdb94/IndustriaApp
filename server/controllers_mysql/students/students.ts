import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as jwt from 'jsonwebtoken';
import sql_students from '../../models_mysql/students/students';

import ContactCtrl from './contact';
import SkillsCtrl from './skills';

import BaseSqlCtrl from '../baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = 'students';
  dummy = sql_students;

  updateAll = (req, res) => {
    let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
                             ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
                             ?? = ?
                             WHERE ?? = ?`;
    const inserts = [this.model,  'name', req.body.name,
                                  'rnumber', req.body.rnumber,
                                  'whoami', req.body.whoami,
                                  'gradYear', req.body.gradYear,
                                  'degree', req.body.degree,
                                  'cvChecked', req.body.cvChecked,
                                  'contactChecked', req.body.contactChecked,
                                  'countSkills', req.body.countSkills,
                                  'countProfessional', req.body.countProfessional,
                                  'countLanguage', req.body.countLanguage,
                                  'countEducation', req.body.countEducation,
                                  'numberCv', req.body.numberCv,
                                  'image', req.body.image,
                                  'id', req.body.id];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }

  selectStudents = (req, res) => {
    let sql = `SELECT * FROM ??`;
    const inserts = [this.model];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }
            const token = jwt.sign({ results: results },
            process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
            connection.release();
        });
    });
  }

  selectIdsStudents = (req, res) => {
    let sql = `SELECT ?? FROM ??`;
    const inserts = ['id',this.model];
    sql = mysql.format(sql, inserts);
    pool.getConnection(function (error, connection) {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                connection.release();
                throw err;
            }
            const token = jwt.sign({ results: results },
            process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
            res.status(200).json({ token: token });
            connection.release();
        });
    });
  }

  inner = (req, res) => {
  //  const sql = `SELECT name, degree, gradYear FROM students GROUP BY (id)  `;
    let sql = `SELECT ??, ??, ?? FROM ?? GROUP BY (??)`;
    const inserts = ['name', 'degree', 'gradYear', 'students', 'id'];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }

  innertje = (req, res) => {
    let sql = `SELECT DISTINCT ??, ??, ??, ??, ??, ??, ?? FROM ??
                  INNER JOIN ?? ON ?? = ??
                  INNER JOIN ?? ON ?? = ??
                  INNER JOIN ?? ON ?? = ??`;
    const inserts = ['students.id', 'name', 'degree','gradYear','skills.skill',
                      'language.type', 'contact.county', 'students',
                      'skills','students.id', 'skills.student_fk',
                      'language','students.id', 'language.student_fk',
                      'contact','students.id', 'contact.student_fk'];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }

  innerjoin = (req, res) => {


    let skills = [], values = [], value_types = [], email = [], phone = [],
      city = [], county = [], educ_type = [], educ_institution = [],
      educ_datefrom = [], educ_dateuntil = [], exp_function = [],
      exp_description = [], exp_datefrom = [], exp_dateuntil = [],
      social_type = [], social_url = [], social_checked = [],
      language_types = [], language_values = [], language_value_types = [],
      professional_skills = [], professional_values = [], professional_value_types = [],
      id = [], name = [], rnumber = [], whoami = [], gradYear = [], degree = [],
      cvChecked = [], contactChecked = [], countSkills = [], countProfessional = [],
      countLanguage = [], countEducation = [], numberCv = [], image = [], user_fk = []

    let test = {
      id, name, rnumber, whoami, gradYear, degree,
      cvChecked, contactChecked, countSkills, countProfessional,
      countLanguage, countEducation, numberCv, image, user_fk,
      skills, values, value_types, email, phone, city, county,
      educ_type, educ_institution, educ_datefrom, educ_dateuntil,
      exp_function, exp_datefrom, exp_dateuntil, exp_description,
      social_type, social_url, social_checked,
      language_types, language_values, language_value_types,
      professional_skills, professional_values, professional_value_types
    }

    let sql = `SELECT DISTINCT ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts = ['skill', 'value', 'value_type', 'students', 'skills',
                      'students.id', req.params.id,
                      'students.id', 'skills.student_fk'];
    sql = mysql.format(sql, inserts);

    pool.getConnection(function (error, connection) {
      const query = connection.query(sql, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }
        for (let i = 0; i < result.length; i++) {
          skills[i] = (result[i].skill);
          values[i] = (result[i].value);
          value_types[i] = (result[i].value_type);
        }
        connection.release();
      });
    });

    let sql1 = `SELECT DISTINCT ??, ??, ??,?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts1 = ['email', 'county', 'phone', 'city', 'students', 'contact',
                      'students.id', req.params.id,
                      'students.id', 'contact.student_fk'];
    sql1 = mysql.format(sql1, inserts1);
    pool.getConnection(function (error, connection) {
      const query1 = connection.query(sql1, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          email[i] = (result[i].email);
          phone[i] = (result[i].phone);
          city[i] = (result[i].city);
          county[i] = (result[i].county);
        }
        connection.release();

      });

    });

    let sql2 = `SELECT DISTINCT ??, ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts2 = ['type', 'institution', 'date_from', 'date_until','students', 'education',
                      'students.id', req.params.id,
                      'students.id', 'education.student_fk'];
    sql2 = mysql.format(sql2, inserts2);
    pool.getConnection(function (error, connection) {
      const query2 = connection.query(sql2, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          educ_type[i] = (result[i].type);
          educ_institution[i] = (result[i].institution);
          educ_datefrom[i] = (result[i].date_from);
          educ_dateuntil[i] = (result[i].date_until);
        }
        connection.release();
      });
    });

    let sql3 = `SELECT DISTINCT ??, ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts3 = ['function', 'description', 'date_from', 'date_until','students', 'experiences',
                      'students.id', req.params.id,
                      'students.id', 'experiences.student_fk'];
    sql3 = mysql.format(sql3, inserts3);
    pool.getConnection(function (error, connection) {
      const query3 = connection.query(sql3, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          exp_function[i] = (result[i].function);
          exp_description[i] = (result[i].description);
          exp_datefrom[i] = (result[i].date_from);
          exp_dateuntil[i] = (result[i].date_until);
        }
        connection.release();

      });
    });

    let sql4 = `SELECT DISTINCT ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts4 = ['type', 'url', 'checked','students', 'socialmedia',
                      'students.id', req.params.id,
                      'students.id', 'socialmedia.student_fk'];
    sql4 = mysql.format(sql4, inserts4);
    pool.getConnection(function (error, connection) {
      const query4 = connection.query(sql4, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          social_url[i] = (result[i].url);
          social_type[i] = (result[i].type);
          social_checked[i] = (result[i].checked);
        }
        connection.release();
      });
    });

    let sql5 = `SELECT ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts5 = ['type', 'value', 'value_type', 'students', 'language',
                      'students.id', req.params.id,
                      'students.id', 'language.student_fk'];
    sql5 = mysql.format(sql5, inserts5);

    pool.getConnection(function (error, connection) {
      const query5 = connection.query(sql5, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          language_types[i] = result[i].type;
          language_values[i] = result[i].value;
          language_value_types[i] = result[i].value_type;
        }
        connection.release();

      });
    });

    let sql6 = `SELECT ??, ??, ?? FROM ?? INNER JOIN ?? ON ?? = ? AND ?? = ??`;
    const inserts6 = ['skill', 'value', 'value_type', 'students', 'professional',
                      'students.id', req.params.id,
                      'students.id', 'professional.student_fk'];
    sql6 = mysql.format(sql6, inserts6);
    pool.getConnection(function (error, connection) {
      const query6 = connection.query(sql6, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          professional_skills[i] = result[i].skill;
          professional_values[i] = result[i].value;
          professional_value_types[i] = result[i].value_type;
        }
        connection.release();
      });
    });

    let sql7 = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts7 = [this.model, 'id', req.params.id];
    sql7 = mysql.format(sql7, inserts7);
    pool.getConnection(function (error, connection) {
      const query7 = connection.query(sql7, (err, result) => {
        if (err) {
          connection.release();
          throw err;
        }

        id[0] = result[0].id, name[0] = result[0].name, rnumber[0] = result[0].rnumber,
          whoami[0] = result[0].whoami, gradYear[0] = result[0].gradYear,
          degree[0] = result[0].degree, cvChecked[0] = result[0].cvChecked,
          contactChecked[0] = result[0].contactChecked,
          countSkills[0] = result[0].countSkills,
          countProfessional[0] = result[0].countProfessional,
          countLanguage[0] = result[0].countLanguage,
          countEducation[0] = result[0].countEducation,
          numberCv[0] = result[0].numberCv,
          image[0] = result[0].image,
          user_fk[0] = result[0].user_fk

        res.send(test);
        connection.release();

      });
    });


  }

  insertUser = (req, res) => {
    let sql = `INSERT INTO ?? SET ?? = ?`;
    const inserts = [this.model, 'user_fk', req.params.id];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }


  getStudentByRnumber = (req, res) => {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    const inserts = [this.model, 'rnumber', req.params.rnumber];
    sql = mysql.format(sql, inserts);
    this.executeQuery(sql, req, res, null, null);
  }
}

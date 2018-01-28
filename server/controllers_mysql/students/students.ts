import { pool } from '../../app';
import * as  mysql from 'mysql';
import sql_students from '../../models_mysql/students/students';

import ContactCtrl from './contact';
import SkillsCtrl from './skills';

import BaseSqlCtrl from '../baseSql';

export default class StudentsCtrl extends BaseSqlCtrl {

  model = 'students';
  dummy = sql_students;

  updateAll = (req, res) => {
    const sql = `UPDATE ${this.model} SET name = '${req.body.name}',
                                            rnumber = '${req.body.rnumber}',
                                            whoami = '${req.body.whoami}',
                                            gradYear = '${req.body.gradYear}',
                                            degree = '${req.body.degree}',
                                            cvChecked = '${req.body.cvChecked}',
                                            contactChecked = '${req.body.contactChecked}',
                                            countSkills = '${req.body.countSkills}',
                                            countProfessional = '${req.body.countProfessional}',
                                            countLanguage = '${req.body.countLanguage}',
                                            countEducation = '${req.body.countEducation}',
                                            numberCv = '${req.body.numberCv}',
                                            image = '${req.body.image}'

                                            WHERE id = ${req.body.id}`;
    this.executeQuery(sql, req, res, null, null);
  }

  inner = (req, res) => {
    const sql = `SELECT name, degree, gradYear FROM students GROUP BY (id)  `;
    this.executeQuery(sql, req, res, null, null);
  }

  innertje = (req, res) => {
    const sql = `SELECT  DISTINCT students.id, name, degree, gradYear, skills.skill, language.type, contact.county FROM students

                INNER JOIN skills  ON students.id = skills.student_fk
                INNER JOIN language ON students.id = language.student_fk
                INNER JOIN contact ON students.id = contact.student_fk`
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

    const sql = `SELECT DISTINCT skill, value, value_type FROM students t1

                INNER JOIN skills t2
                ON t1.id = '${req.params.id}'
                  AND t1.id = t2.student_fk`
      ;
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

      });
    });
    const sql1 = `SELECT DISTINCT email, county, phone, city FROM students t1

                INNER JOIN contact t2
                ON t1.id = '${req.params.id}'
                  AND t1.id = t2.student_fk`
      ;
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

      });

    });

    const sql2 = `SELECT DISTINCT type, institution, date_from, date_until FROM students t1

              INNER JOIN education t2
              ON t1.id = '${req.params.id}'
                AND t1.id = t2.student_fk`
      ;
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
      });
    });

    const sql3 = `SELECT DISTINCT function, description, date_from, date_until FROM students t1

            INNER JOIN experiences t2
            ON t1.id = '${req.params.id}'
              AND t1.id = t2.student_fk`
      ;
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

      });
    });

    const sql4 = `SELECT DISTINCT type, url, checked FROM students t1

          INNER JOIN socialmedia t2
          ON t1.id = '${req.params.id}'
            AND t1.id = t2.student_fk`
      ;
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


      });
    });

    const sql5 = `SELECT type, value, value_type FROM students t1

            INNER JOIN language t2

            ON t1.id = '${req.params.id}'
            AND t1.id = t2.student_fk`;

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

      });
    });


    const sql6 = `SELECT skill, value, value_type FROM students t1

            INNER JOIN professional t2

            ON t1.id = '${req.params.id}'
            AND t1.id = t2.student_fk`;
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
      });
    });

    const sql7 = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
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

      });
    });





  }

  insertUser = (req, res) => {

    const sql = `INSERT INTO ${this.model} SET user_fk = '${req.params.id}'`;
    this.executeQuery(sql, req, res, null, null);
  }


  getStudentByRnumber = (req, res) => {
    const sql = `SELECT id FROM ${this.model} WHERE rnumber = '${req.params.rnumber}'`;
    this.executeQuery(sql, req, res, null, null);
  }
}

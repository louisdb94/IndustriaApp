import * as  mysql from 'mysql';
import {app} from '../app';
import {db} from '../app';
import * as fs from 'fs';

app.get('/api/filesync-user', (req,res) => {

  let filesync = JSON.parse(fs.readFileSync('./server/config/users.json', 'utf8'));

  for(let i = 0; i < filesync.length ;i++ ){
    let sql = `INSERT INTO user SET rnumber = '${filesync[i].rnumber}', email= '${filesync[i].email}', role = 'Student'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
    });

  }
  res.send("ok");

})

app.get('/api/filesync-student', (req,res) => {

  let filesync = JSON.parse(fs.readFileSync('./server/config/students.json', 'utf8'));

  for(let i = 0; i < filesync.length ;i++ ){
    let sql = `SELECT id FROM user WHERE rnumber = '${filesync[i].rnumber}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;

        if(filesync[i].cvChecked){filesync[i].cvChecked = 1;}
        else{filesync[i].cvChecked = 0;}

        if(filesync[i].contactChecked){filesync[i].contactChecked = 1;}
        else{filesync[i].contactChecked = 0;}

        if(filesync[i].image){filesync[i].image = 1;}
        else{filesync[i].image = 0;}

        let sql1 = `INSERT INTO students SET name = '${filesync[i].name}',
                                            rnumber = '${filesync[i].rnumber}',
                                            whoami = '${filesync[i].whoami}',
                                            gradYear = '${filesync[i].gradYear}',
                                            degree = '${filesync[i].degree}',
                                            cvChecked = '${filesync[i].cvChecked}',
                                            contactChecked = '${filesync[i].contactChecked}',
                                            countSkills = '${filesync[i].countSkills}',
                                            countProfessional = '${filesync[i].countProfessional}',
                                            countLanguage = '${filesync[i].countLanguage}',
                                            countEducation = '${filesync[i].countEducation}',
                                            numberCv = '${filesync[i].numberCv}',
                                            user_fk = '${result[0].id}'`;
        let query = db.query(sql1, (err, result) => {
            if(err) throw err;

        });
    });

  }
  res.send("ok");

})

app.get('/api/filesync-cvs', (req,res) => {

  let filesync = JSON.parse(fs.readFileSync('./server/config/cvs.json', 'utf8'));

  for(let i = 0; i < filesync.length ;i++ ){
    let sql = `SELECT id FROM students WHERE rnumber = '${filesync[i].name}'`;
    let query = db.query(sql, (err, result) => {
      if(err) throw err;
      let sql1 = `INSERT INTO cvs SET  name = '${filesync[i].name}',
                                      mimetype= '${filesync[i].mimetype}',
                                      customName= 'Curriculum vitae',
                                      size= 'null',
                                      number= '${filesync[i].number}',
                                      student_fk = '${result[0].id}'`;
      let query = db.query(sql1, (err, result) => {
          if(err) throw err;
      });
    }
)}
  res.send("ok");

});

app.get('/api/filesync-other', (req,res) => {

  let filesync = JSON.parse(fs.readFileSync('./server/config/students.json', 'utf8'));

  for(let i = 0; i < filesync.length ;i++ ){
    let sql = `SELECT id FROM students WHERE rnumber = '${filesync[i].rnumber}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;

        //CONTACT

        if(filesync[i].contact){
          let sql1 = `INSERT INTO contact SET email = '${filesync[i].contact[0]}',
                                              phone = '${filesync[i].contact[1]}',
                                              county = '${filesync[i].contact[2]}',
                                              city = '${filesync[i].contact[3]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO contact SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        //EDUCATION

        if(filesync[i].education[0] && filesync[i].education[1] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[0]}',
                                                institution = '${filesync[i].education[1]}',
                                                date_from = '${filesync[i].educationDate[0]}',
                                                date_until = '${filesync[i].educationDate[1]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[2] && filesync[i].education[3] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[2]}',
                                                institution = '${filesync[i].education[3]}',
                                                date_from = '${filesync[i].educationDate[2]}',
                                                date_until = '${filesync[i].educationDate[3]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[4] && filesync[i].education[5] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[4]}',
                                                institution = '${filesync[i].education[5]}',
                                                date_from = '${filesync[i].educationDate[4]}',
                                                date_until = '${filesync[i].educationDate[5]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[6] && filesync[i].education[7] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[6]}',
                                                institution = '${filesync[i].education[7]}',
                                                date_from = '${filesync[i].educationDate[6]}',
                                                date_until = '${filesync[i].educationDate[7]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[8] && filesync[i].education[9] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[8]}',
                                                institution = '${filesync[i].education[9]}',
                                                date_from = '${filesync[i].educationDate[8]}',
                                                date_until = '${filesync[i].educationDate[9]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[10] && filesync[i].education[11] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[10]}',
                                                institution = '${filesync[i].education[11]}',
                                                date_from = '${filesync[i].educationDate[10]}',
                                                date_until = '${filesync[i].educationDate[11]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[12] && filesync[i].education[13] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[12]}',
                                                institution = '${filesync[i].education[13]}',
                                                date_from = '${filesync[i].educationDate[12]}',
                                                date_until = '${filesync[i].educationDate[13]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].education[14] && filesync[i].education[15] ){
            let sql2 = `INSERT INTO education SET type = '${filesync[i].education[14]}',
                                                institution = '${filesync[i].education[15]}',
                                                date_from = '${filesync[i].educationDate[14]}',
                                                date_until = '${filesync[i].educationDate[15]}',
                                                student_fk = '${result[0].id}'`;
            let query2 = db.query(sql2, (err, result) => {
                if(err) throw err;

            });
        }else{
          let sql3 = `INSERT INTO education SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }


        //EXPERIENCES

        if(filesync[i].experiences[0] && filesync[i].experiences[1] && filesync[i].experiences[2]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[0]}',
                                              description = '${filesync[i].experiences[1]}',
                                              period = '${filesync[i].experiences[2]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO experiences SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].experiences[3] && filesync[i].experiences[4] && filesync[i].experiences[5]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[3]}',
                                              description = '${filesync[i].experiences[4]}',
                                              period = '${filesync[i].experiences[5]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[6] && filesync[i].experiences[7] && filesync[i].experiences[8]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[6]}',
                                              description = '${filesync[i].experiences[7]}',
                                              period = '${filesync[i].experiences[8]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[9] && filesync[i].experiences[10] && filesync[i].experiences[11]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[9]}',
                                              description = '${filesync[i].experiences[10]}',
                                              period = '${filesync[i].experiences[11]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[12] && filesync[i].experiences[13] && filesync[i].experiences[14]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[12]}',
                                              description = '${filesync[i].experiences[13]}',
                                              period = '${filesync[i].experiences[14]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[15] && filesync[i].experiences[16] && filesync[i].experiences[17]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[15]}',
                                              description = '${filesync[i].experiences[16]}',
                                              period = '${filesync[i].experiences[17]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[18] && filesync[i].experiences[19] && filesync[i].experiences[20]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[18]}',
                                              description = '${filesync[i].experiences[19]}',
                                              period = '${filesync[i].experiences[20]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }
        if(filesync[i].experiences[21] && filesync[i].experiences[22] && filesync[i].experiences[23]){
          let sql1 = `INSERT INTO experiences SET function = '${filesync[i].experiences[21]}',
                                              description = '${filesync[i].experiences[22]}',
                                              period = '${filesync[i].experiences[23]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }

        //LANGUAGES

        if(filesync[i].language[0] && filesync[i].languageValue[0] && filesync[i].languageValue[1]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[0]}',
                                              value = '${filesync[i].languageValue[0]}',
                                              value_type = '${filesync[i].languageValue[1]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].language[1] && filesync[i].languageValue[2] && filesync[i].languageValue[3]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[1]}',
                                              value = '${filesync[i].languageValue[2]}',
                                              value_type = '${filesync[i].languageValue[3]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].language[2] && filesync[i].languageValue[4] && filesync[i].languageValue[5]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[2]}',
                                              value = '${filesync[i].languageValue[4]}',
                                              value_type = '${filesync[i].languageValue[5]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].language[3] && filesync[i].languageValue[6] && filesync[i].languageValue[7]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[3]}',
                                              value = '${filesync[i].languageValue[6]}',
                                              value_type = '${filesync[i].languageValue[7]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].language[4] && filesync[i].languageValue[8] && filesync[i].languageValue[9]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[4]}',
                                              value = '${filesync[i].languageValue[8]}',
                                              value_type = '${filesync[i].languageValue[9]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].language[5] && filesync[i].languageValue[10] && filesync[i].languageValue[11]){
          let sql1 = `INSERT INTO language SET type = '${filesync[i].language[5]}',
                                              value = '${filesync[i].languageValue[10]}',
                                              value_type = '${filesync[i].languageValue[11]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO language SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        //PROFESSIONAL

        if(filesync[i].professional[0] && filesync[i].professionalValue[0] && filesync[i].professionalValue[1]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[0]}',
                                              value = '${filesync[i].professionalValue[0]}',
                                              value_type = '${filesync[i].professionalValue[1]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[1] && filesync[i].professionalValue[2] && filesync[i].professionalValue[3]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[1]}',
                                              value = '${filesync[i].professionalValue[2]}',
                                              value_type = '${filesync[i].professionalValue[3]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[2] && filesync[i].professionalValue[4] && filesync[i].professionalValue[5]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[2]}',
                                              value = '${filesync[i].professionalValue[4]}',
                                              value_type = '${filesync[i].professionalValue[5]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[3] && filesync[i].professionalValue[6] && filesync[i].professionalValue[7]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[3]}',
                                              value = '${filesync[i].professionalValue[6]}',
                                              value_type = '${filesync[i].professionalValue[7]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[4] && filesync[i].professionalValue[8] && filesync[i].professionalValue[9]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[4]}',
                                              value = '${filesync[i].professionalValue[8]}',
                                              value_type = '${filesync[i].professionalValue[9]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[5] && filesync[i].professionalValue[10] && filesync[i].professionalValue[11]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[5]}',
                                              value = '${filesync[i].professionalValue[10]}',
                                              value_type = '${filesync[i].professionalValue[11]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].professional[6] && filesync[i].professionalValue[12] && filesync[i].professionalValue[13]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[6]}',
                                              value = '${filesync[i].professionalValue[12]}',
                                              value_type = '${filesync[i].professionalValue[13]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].professional[7] && filesync[i].professionalValue[14] && filesync[i].professionalValue[15]){
          let sql1 = `INSERT INTO professional SET skill = '${filesync[i].professional[7]}',
                                              value = '${filesync[i].professionalValue[14]}',
                                              value_type = '${filesync[i].professionalValue[15]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO professional SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        //SKILLS

        if(filesync[i].skills[0] && filesync[i].skillsValue[0] && filesync[i].skillsValue[1]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[0]}',
                                              value = '${filesync[i].skillsValue[0]}',
                                              value_type = '${filesync[i].skillsValue[1]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[1] && filesync[i].skillsValue[2] && filesync[i].skillsValue[3]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[1]}',
                                              value = '${filesync[i].skillsValue[2]}',
                                              value_type = '${filesync[i].skillsValue[3]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[2] && filesync[i].skillsValue[4] && filesync[i].skillsValue[5]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[2]}',
                                              value = '${filesync[i].skillsValue[4]}',
                                              value_type = '${filesync[i].skillsValue[5]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[3] && filesync[i].skillsValue[6] && filesync[i].skillsValue[7]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[3]}',
                                              value = '${filesync[i].skillsValue[6]}',
                                              value_type = '${filesync[i].skillsValue[7]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[4] && filesync[i].skillsValue[8] && filesync[i].skillsValue[9]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[4]}',
                                              value = '${filesync[i].skillsValue[8]}',
                                              value_type = '${filesync[i].skillsValue[9]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[5] && filesync[i].skillsValue[10] && filesync[i].skillsValue[11]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[5]}',
                                              value = '${filesync[i].skillsValue[10]}',
                                              value_type = '${filesync[i].skillsValue[11]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        if(filesync[i].skills[6] && filesync[i].skillsValue[12] && filesync[i].skillsValue[13]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[6]}',
                                              value = '${filesync[i].skillsValue[12]}',
                                              value_type = '${filesync[i].skillsValue[13]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }
        if(filesync[i].skills[7] && filesync[i].skillsValue[14] && filesync[i].skillsValue[15]){
          let sql1 = `INSERT INTO skills SET skill = '${filesync[i].skills[7]}',
                                              value = '${filesync[i].skillsValue[14]}',
                                              value_type = '${filesync[i].skillsValue[15]}',
                                              student_fk = '${result[0].id}'`;
          let query1 = db.query(sql1, (err, result) => {
              if(err) throw err;

          });
        }else{
          let sql3 = `INSERT INTO skills SET student_fk = '${result[0].id}'`;
          let query3 = db.query(sql3, (err, result) => {
              if(err) throw err;
          });
        }

        //SOCIALMEDIA

        // if(filesync[i].socialMedia[0] ){
        //   let sql1 = `INSERT INTO socialmedia SET type = 'null',
        //                                       url = '${filesync[i].socialMedia[0]}',
        //                                       checked = '1',
        //                                       student_fk = '${result[0].id}'`;
        //   let query1 = db.query(sql1, (err, result) => {
        //       if(err) throw err;

        //   });
        // }else{
        //   let sql3 = `INSERT INTO socialmedia SET student_fk = '${result[0].id}'`;
        //   let query3 = db.query(sql3, (err, result) => {
        //       if(err) throw err;
        //   });
        // }

        // if(filesync[i].socialMedia[1] ){
        //   let sql1 = `INSERT INTO socialmedia SET type = 'null',
        //                                       url = '${filesync[i].socialMedia[1]}',
        //                                       checked = '1',
        //                                       student_fk = '${result[0].id}'`;
        //   let query1 = db.query(sql1, (err, result) => {
        //       if(err) throw err;

        //   });
        // }else{
        //   let sql3 = `INSERT INTO socialmedia SET student_fk = '${result[0].id}'`;
        //   let query3 = db.query(sql3, (err, result) => {
        //       if(err) throw err;
        //   });
        // }
        // if(filesync[i].socialMedia[2] ){
        //   let sql1 = `INSERT INTO socialmedia SET type = 'null',
        //                                       url = '${filesync[i].socialMedia[2]}',
        //                                       checked = '1',
        //                                       student_fk = '${result[0].id}'`;
        //   let query1 = db.query(sql1, (err, result) => {
        //       if(err) throw err;

        //   });
        // }else{
        //   let sql3 = `INSERT INTO socialmedia SET student_fk = '${result[0].id}'`;
        //   let query3 = db.query(sql3, (err, result) => {
        //       if(err) throw err;
        //   });
        // }
        // if(filesync[i].socialMedia[3] ){
        //   let sql1 = `INSERT INTO socialmedia SET type = 'null',
        //                                       url = '${filesync[i].socialMedia[3]}',
        //                                       checked = '1',
        //                                       student_fk = '${result[0].id}'`;
        //   let query1 = db.query(sql1, (err, result) => {
        //       if(err) throw err;

        //   });
        // }else{
        //   let sql3 = `INSERT INTO socialmedia SET student_fk = '${result[0].id}'`;
        //   let query3 = db.query(sql3, (err, result) => {
        //       if(err) throw err;
        //   });
        // }








    });

  }
  res.send("ok");

})

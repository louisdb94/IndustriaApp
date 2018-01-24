import {connection} from '../../app';
import * as  mysql from 'mysql';
import companies from '../../models_mysql/company/companies';
import * as fs from 'fs';


import BaseSqlCtrl from '../baseSql';

export default class CompanyCtrl extends BaseSqlCtrl{

  model = 'companies';
  dummy = companies;

  updateAll =  (req, res) => {

            let sql = `UPDATE ${this.model} SET email = '${req.body.email}',
                                                whoami = '${req.body.whoami}',
                                                url = '${req.body.url}',
                                                name = '${req.body.name}',
                                                feature1 = '${req.body.feature1}',
                                                feature2 = '${req.body.feature2}',
                                                feature3 = '${req.body.feature3}',
                                                priority = '${req.body.priority}',
                                                image = '${req.body.image}'

                                                WHERE id = ${req.body.id}`;
            let query = connection.query(sql, (err, result) => {
                if(err) throw err;
                res.json(result);
            });
        };

  download =  (req, res) => {
    let sql = `SELECT * FROM companies WHERE id = '${req.params.id}'`;
    let query = connection.query(sql, (err, obj) => {
     if (err) { return console.error(err); }
     else{
       //console.log("obj.image: ", obj[0].image);

       if(obj[0].image == 1){
           fs.readFile('./uploads/images/' + obj[0].name + '.png', 'base64', function(err, data){
             if(err){console.log(err);}
             res.setHeader('Content-Disposition', 'attachment');
             res.send(data)
           })
         }
         else{
           fs.readFile('./uploads/images/standard.png', 'base64', function(err, data){
             if(err){console.log(err);}
             res.setHeader('Content-Disposition', 'attachment');
             res.send(data)
           })
         }
     }
    });
};

getCompanyByEmail =  (req, res) => {
  let sql = `SELECT id FROM ${this.model} WHERE email = '${req.params.email}'`;
  let query = connection.query(sql, (err, result) => {
      if(err) throw err;
      res.json(result);

  });
};

innerJoin = (req, res) => {


  let dummy = []

    let sql = `SELECT companies.id , companies.name AS company_name , companies.url, vacatures.name AS vacature_name, vacatures.type FROM companies

                  INNER JOIN vacatures
                    ON  companies.id = vacatures.company_fk`;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;

        for(let i = 0 ; i < result.length; i++){

          if(result[i].vacature_name == '') {
            result.splice(i,1);
          }

          //  dummy[i] = {id : result[i].id, type:result[i].type, company_name: result[i].company_name, vacature_name: result[i].vacature_name, url: result[i].url}


        }
        res.send(result);
    });
  }

  updatePriority = (req, res) => {
    let sql = `UPDATE ${this.model} SET priority = '${req.body.priority}',
                                        email = '${req.body.email}',
                                        name = '${req.body.name}'
                                                WHERE id = ${req.body.id}`;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
  }
}

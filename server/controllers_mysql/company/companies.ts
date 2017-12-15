import {db} from '../../app';
import * as  mysql from 'mysql';
import companies from '../../models_mysql/company/companies';
import * as fs from 'fs';


import BaseSqlCtrl from '../baseSql';

export default class CompanyCtrl extends BaseSqlCtrl{

  model = 'companies';
  dummy = companies;

  updateAll =  (req, res) => {
    
            let sql = `UPDATE ${this.model} SET rnumber = '${req.body.rnumber}',
                                                whoami = '${req.body.whoami}',
                                                url = '${req.body.url}',
                                                name = '${req.body.name}',
                                                feature1 = '${req.body.feature1}',
                                                feature2 = '${req.body.feature2}',
                                                feature3 = '${req.body.feature3}',
                                                priority = '${req.body.priority}',
                                                image = '${req.body.image}'
    
                                                WHERE id = ${req.body.id}`;
            let query = db.query(sql, (err, result) => {
                if(err) throw err;
                console.log(result);
                res.json(result);
            });
        };

  download =  (req, res) => {
    let sql = `SELECT * FROM companies WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, obj) => {
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

innerJoin = (req, res) => {
  // let count;
  // let sql = `SELECT count(id) FROM companies`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) throw err;
  //     console.log("length: ", JSON.stringify(result[0].count));
  //     count = result;
  // });

  // for(let i = 1; i <= count; i++){
    let sql = `SELECT * FROM companies t1 INNER JOIN vacatures t2 ON t1.id = '${req.params.id}' AND t1.id = t2.company_fk`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result.length)
        let type = [];
        for(let i = 0; i < result.length; i++){
          type[i] = (result[i]);
        }
        result = type;
        console.log(JSON.stringify(result));      
        res.send(result);
    });
  // };
  }

}

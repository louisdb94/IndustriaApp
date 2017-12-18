import {db} from '../../app';
import * as  mysql from 'mysql';
import contact_company from '../../models_mysql/company/contact';
import BaseSqlCtrl from '../baseSql';


export default class CompanyContactCtrl extends BaseSqlCtrl {

  model = 'contact_company';
  dummy = contact_company;


  updateAll = (req, res) => {
    let sql = `UPDATE ${this.model} SET email = '${req.body.email}', phone = '${req.body.phone}', address = '${req.body.address}', latitude = '${req.body.latitude}', longitude = '${req.body.longitude}'  WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
  };

}

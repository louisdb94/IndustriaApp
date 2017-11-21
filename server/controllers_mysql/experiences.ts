import {db} from '../app';
import experiences from '../models_mysql/experiences';
import * as  mysql from 'mysql';


export default class ExperienceCtrl {

  getsql = (req, res) => {
    db.query(experiences, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('Posts table created...');
    });
  }
}

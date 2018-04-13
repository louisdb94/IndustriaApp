import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import sql_users from '../../models_mysql/users';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

export default class UsersController extends DefaultController {

  model = 'user';

  // REFACTORED
  login = (req, res, next) => {

      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy('email',req.body.email).then(result => {
          if (!result[0]) {return res.status(404).send('No user found.');}
      var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
      if(passwordIsValid) {
          const user = result[0];
          const token = jwt.sign({ user: user },
          process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', {
          expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).json({ token: token });
      }
      else {
          return res.status(401).send({token: null });

      }
      });
  }

  //Refactored insert met crud
  register = (req, res) => {
      const map: Map<string, string> = new Map();
      for(var key in req.body) {
          if(req.body.hasOwnProperty(key)){
              if(key == 'password'){
                  req.body[key] = bcrypt.hashSync(req.body.password);
              }
            map.set(key, req.body[key])
          }
      }

      var crud_controller = this.model + "Crud";
      this[crud_controller].insert(map).then(result => {
          res.status(200).json(result);
      });
  }

  //Refactored update met crud
  updatePassword = (req, res) => {
      req.body.password = bcrypt.hashSync(req.body.password);
      this.update(res, req, 'email', req.body.email);
  }

  //Refactored
  getByRole = (req, res) => {
      this.getWhere(res, 'role', 'company');
  }

}

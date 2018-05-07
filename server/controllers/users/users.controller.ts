import { pool } from '../../app';
import * as nodemailer from 'nodemailer';
import * as  mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { DefaultController} from '../default.controller';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bedrijvenrelaties2018@gmail.com',
        pass: 'Industria2018'
    }
});

export class UsersController extends DefaultController {

    model = 'user';

    //Refactored select met crud
    get = (req, res) => {
        var crud_controller = this.model + "Crud";
        this[crud_controller].get().then(result => {
            for(let item of result){
              item.password = null;
            }
            res.status(200).json(result );
        });
    }

    getById = (req, res) => {
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy(this.model, 'id' ,req.params.id).then(result => {
          result[0].password = null;
          res.status(200).json( result );
      });
    }

  login = (req, res, next) => {

      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy('user', 'email', req.body.email).then(result => {
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
      this.update(req, res, 'email', JSON.stringify(req.body.email));
  }

  makeAdmin = (req, res) => {
    this.update(req, res, 'email', JSON.stringify(req.body.email));
}

  //Refactored
  getByRole = (req, res) => {
      this.getWhere(res, 'role', 'company');
  }

  getAdmins = (req, res) => {
      this.getWhere(res, 'admin', '1');
  }

  sendMail = (req, res) => {
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy(this.model, 'email', req.params.email).then(result => {
        if (result.length > 0) {
            this.sendMailBackEnd(result, req, res);
        }
        res.status(200).json( result );
      });
  }

  sendMailBackEnd(user, req, res){
    console.log("user: ", user);
    const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds

    // const mailOptions = {
    //     from: 'bedrijvenrelaties2018@gmail.com', // sender address
    //     to: req.params.email, // list of receivers
    //     subject: 'Password reset', // Subject line
    //     html: 'Dear user, you can set your new password via this link:  ' +
    //         'https://bedrijvenrelaties-industria.be/sendmail/' + token// plain text body
    // };

    const mailOptions = {
        from: 'bedrijvenrelaties2018@gmail.com', // sender address
        to: req.params.email, // list of receivers
        subject: 'Password reset', // Subject line
        html: 'Dear user, you can set your new password via this link:  ' +
            'http://localhost:4200/sendmail/' + token// plain text body
    };

    transporter.sendMail(mailOptions, function (mailerr, info) {
        if (mailerr) {
            console.log(mailerr);
        } else {
            console.log(info);
        }
    });
    res.status(200).json({ token: token });
    }

    ids : any;
    encrypt = (req, res) => {
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy(this.model, 'role', 'Company').then(result => {
        this.ids = result;
        res.status(200).send(result);
      });
    }

    encrypt2 = (req, res) => {
      var crud_controller = this.model + "Crud";

      for(let i = 0; i< this.ids.length; i ++){
        this[crud_controller].getBy(this.model, 'id', this.ids[i].id).then(result => {
            result[0].password = bcrypt.hashSync(result[0].password);
            const map: Map<string, string> = new Map();
            map.set('password', result[0].password);

            this[crud_controller].update('id', result[0].id, map).then(result => {
            })
        });

      }
      res.send("gelukt")
    }

}

import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import Student from '../models/student'
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      // user.comparePassword(req.body.password, (error, isMatch) => {
      //   if (!isMatch) { return res.sendStatus(403); }
      //   const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
      //   res.status(200).json({ token: token });
      // });

      else{
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      }

    });
  }

  // Get by rnumber
  getByRnumber = (req, res) => {
    Student.findOne({ rnumber: req.params.rnumber }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  sendMail = (req,res) => {
    console.log("random");
  }
}

import * as express from 'express';

import CatCtrl from './controllers/cat';
import CvCtrl from './controllers/cv';
import UserCtrl from './controllers/user';
import StudentCtrl from './controllers/student';
import Cat from './models/cat';
import User from './models/user';
import Student from './models/student';
import Cv from './models/cv';
import * as path from 'path';

import * as mime from 'mime';
import * as fs from 'fs';


export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const studentCtrl = new StudentCtrl();
  const cvCtrl = new CvCtrl();


  // CV
  router.route('/cv').get(cvCtrl.getAll);
  router.route('/cv/count').get(cvCtrl.count);
  router.route('/cv').post(cvCtrl.insert);
  router.route('/cv/:id').get(cvCtrl.get);
  router.route('/cv/:id').put(cvCtrl.update);
  router.route('/cv/:id').delete(cvCtrl.delete);
  //upload a pdf or image
  router.route('/upload')
    .post(cvCtrl.uploadCv);


  //download a cv of a student
  router.route('/download/:cv_id')
    .get(function (req, res) {

      // let name = "";
      // let mimetype = "";
      // Student.findOne({ 'cv._id': req.params.cv_id }, (err, obj) => {
      //   if (err) { return console.error(err); }
      //   name = obj.cv.name;
      //   mimetype = obj.cv.mimetype;
      // });
      //
      // res.download('./uploads/images/'+ name + '.' + mimetype);
      console.log("downloading");
      res.setHeader('Content-Type', 'application/pdf');
      res.download('./uploads/images/r0222222.pdf', function(err){
        if(err){
          return console.log(err);
        } else {
          return console.log("In de functie res.download");
        }
      });

      console.log("gedowload");



    });

  router.route('/cv/remove/:id')
    .get(function(req,res){

      let name = '';
      let type = '';
      Student.findOne({_id: req.params.id}, (err, obj) => {
        if (err) { return console.error(err); }
          name = obj.name;
          type = obj.type;
      })
      Student.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      console.log("cv verwijders");
      });

      //DELETEN
      fs.unlink('./uploads/images/'+ name + '.' + type);

  });

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Students
  router.route('/students').get(studentCtrl.getAll);
  router.route('/students/count').get(studentCtrl.count);
  router.route('/student').post(studentCtrl.insert);
  router.route('/student/:id').get(studentCtrl.get);
  router.route('/student/:id').put(studentCtrl.update);
  router.route('/student/:id').delete(studentCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import StudentCtrl from './controllers/student';
import Cat from './models/cat';
import User from './models/user';
import Student from './models/student';
import * as path from 'path';

import * as mime from 'mime';
import * as fs from 'fs';


export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const studentCtrl = new StudentCtrl();


  //upload a pdf or image
  router.route('/upload')
    .post(function (req, res)  {

      let rnumber = '';
      for(let i = 0; i< req.body.students.length; i++){
        rnumber += req.body.students[i];
      }

      let id = '';
      for(let i = 0; i< req.body.id.length; i++){
        id += req.body.id[i];
      }


      if (!(<any>req.files).files)
        return res.status(400).send('No files were uploaded.');

      let newCv = (<any>req.files).files;
      let type = newCv.mimetype.split('/')[1]
    //  console.log(type);
      newCv.mv('./uploads/images/'+ rnumber + "." +type ,function(err) {
       if (err)
         return res.status(500).send(err);

         Student.findOneAndUpdate({ _id: id }, {$set:{cv: {name: rnumber, mimetype: type}}},{upsert:true}, (err) => {
         if (err) { return console.error(err); }
         console.log("cv geupload");
       });


       res.status(200).redirect('back');
     });

  });


  //download a cv of a student
  router.route(`/download/:cv_id`)
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
      res.download('./uploads/images/r0222222.pdf', function(err){
        if(err){console.log(err)}
        console.log("In de functie res.download")
      });

      console.log("gedowload");

      //DELETEN
      //fs.unlink('./uploads/images/r0111111.jpeg');

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

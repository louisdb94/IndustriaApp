import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import StudentCtrl from './controllers/student';
import Cat from './models/cat';
import User from './models/user';
import Student from './models/student';

import * as mime from 'mime';


export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const studentCtrl = new StudentCtrl();


  //uploads
  router.route('/upload')
    .post(function (req, res)  {
      if (!req.files)
        return res.status(400).send('No files were uploaded.');

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      //let cv = req.files.cv;
      console.log("AAAAAAA")
    //  console.log(cv);

      console.log("CCCCCCc")

      console.log(req.body);

  //    cv.mv('./uploads/images/'+ cv.name+".jpg" ,function(err) {

  //     if (err)
//         return res.status(500).send(err);

      // res.status(200).redirect('back');
//     });



      // Use the mv() method to place the file somewhere on your server

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

import * as express from 'express';
import * as path from 'path';
import * as mime from 'mime';
import * as fs from 'fs';
import {db} from './app';
import * as  mysql from 'mysql';

import CatCtrl from './controllers/cat';
import CvCtrl from './controllers/cv';
import ImageCtrl from './controllers/image';
import UserCtrl from './controllers/user';
import StudentCtrl from './controllers/student';
import Cat from './models/cat';
import User from './models/user';
import Student from './models/student';
import Cv from './models/cv';
import Image from './models/image';

//MYSQL CONTROLLERS
import CvsCtrl from './controllers_mysql/cvs';
import ContactCtrl from './controllers_mysql/contact';
import EducationCtrl from './controllers_mysql/education';
import ExperienceCtrl from './controllers_mysql/experiences';
import LanguageCtrl from './controllers_mysql/language';
import SkillsCtrl from './controllers_mysql/skills';
import SocialmediaCtrl from './controllers_mysql/socialmedia';
import StudentsCtrl from './controllers_mysql/students';
import UsersCtrl from './controllers_mysql/users';


//MYSQL MODELS
import contacts from './models_mysql/contact';
import cvs from './models_mysql/cvs';
import education from './models_mysql/education';
import experiences from './models_mysql/experiences';
import language from './models_mysql/language';
import skills from './models_mysql/skills';
import socialmedia from './models_mysql/socialmedia';
import students from './models_mysql/students';
import users from './models_mysql/users';


export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const studentCtrl = new StudentCtrl();
  const cvCtrl = new CvCtrl();
  const imageCtrl = new ImageCtrl();

  //MYSQL CONTROLLERS
  const cvsCtrl = new CvsCtrl();
  const contactsCtrl = new ContactCtrl();
  const educationCtrl = new EducationCtrl();
  const experienceCtrl = new ExperienceCtrl();
  const languageCtrl = new LanguageCtrl();
  const skillsCtrl = new SkillsCtrl();
  const socialmediaCtrl = new SocialmediaCtrl();
  const studentsCtrl = new StudentsCtrl();
  const usersCtrl = new UsersCtrl();


  // CREATE MYSQL TABLES
  router.route('create-users').get(usersCtrl.getsql);
  router.route('create-students').get(studentsCtrl.getsql);
  router.route('create-cvs').get(cvsCtrl.getsql);
  router.route('create-contacts').get(contactsCtrl.getsql);
  router.route('create-education').get(educationCtrl.getsql);
  router.route('create-experience').get(experienceCtrl.getsql);
  router.route('create-language').get(languageCtrl.getsql);
  router.route('create-skills').get(skillsCtrl.getsql);
  router.route('create-socialmedia').get(socialmediaCtrl.getsql);


  // CV
  router.route('/cv').get(cvCtrl.getAll);
  router.route('/cv/:stud_id').get(cvCtrl.getAllFromStudent);
  router.route('/cv/count').get(cvCtrl.count);
  router.route('/cv').post(cvCtrl.insert);
  router.route('/cv/:id').get(cvCtrl.get);
  router.route('/cv/:id').put(cvCtrl.update);
  router.route('/cv/:id').delete(cvCtrl.delete);
  //upload a pdf or image
  router.route('/cv/upload').post(cvCtrl.uploadCv);
  //download a cv of a student
  router.route('/download/:cv_id').get(cvCtrl.downloadCv);

  router.route('/cv/remove/:id').post(cvCtrl.removeCv);


  // Image
  router.route('/image').get(imageCtrl.getAll);
  router.route('/image/:stud_id').get(imageCtrl.getAllFromStudent);
  router.route('/image/count').get(imageCtrl.count);
  router.route('/image').post(imageCtrl.insert);
  router.route('/image/:id').get(imageCtrl.get);
  router.route('/image/:id').put(imageCtrl.update);
  router.route('/image/:id').delete(imageCtrl.delete);
  //upload a pdf or image
  router.route('/image/upload').post(imageCtrl.upload);
  //download a cv of a student
  router.route('/downloadImage/:id').get(imageCtrl.download);

  router.route('/image/remove/:id').post(imageCtrl.remove);


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
  //router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:rnumber').get(userCtrl.getByRnumber);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);
  router.route('/send').post(userCtrl.sendMail);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

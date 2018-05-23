import * as express from 'express';
import {Authorization} from '../auth/verify-token';

import { StudentsController} from '../controllers/students/students.controller';
import { CompaniesController} from '../controllers/company/companies.controller';
import { UsersController} from '../controllers/users/users.controller';
import { ImageController} from '../controllers/students/image.controller';
import { CvsController} from '../controllers/students/cvs.controller';



export function setRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersController();
  const authorization = new Authorization();
  const studentsCtrl = new StudentsController();
  const companiesCtrl = new CompaniesController();
  const imageCtrl = new ImageController();
  const cvsCtrl = new CvsController();



  router.route('/users-login').post(usersCtrl.login);  //PRE LOGIN
  router.route('/student-getbyrnumber/:rnumber').get(studentsCtrl.getStudentByRnumber);  //PRE LOGIN
  router.route('/companies-getbyemail/:email').get(companiesCtrl.getCompanyByEmail); //PRE LOGIN

  // //Image
  router.route('/image/upload').post(imageCtrl.uploadImageStudent);
  router.route('/image/upload-company').post(imageCtrl.uploadImageCompany);
  router.route('/downloadImage/:id').get(imageCtrl.downloadImageStudent);
  router.route('/downloadImage-company/:id').get(imageCtrl.downloadImageCompany);
  //CVs
  router.route('/cv-add').post(cvsCtrl.insert);
  router.route('/cv/:id').get(cvsCtrl.getByStudentFk);
  router.route('/cv-delete/:id').delete(cvsCtrl.deleteCv);
  router.route('/cv/upload').post(cvsCtrl.uploadCv);
  router.route('/download/:id').get(cvsCtrl.downloadCv);

  // router.route('/user-getadmin').get(usersCtrl.getAdmins);

  // Apply the routes to our application with the prefix /api
  // app.use('/api', authorization.checkAccess, authorization.verifyToken , router);
  app.use('/api', router);


}

export function setAdminRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersController();
  const authorization = new Authorization();

  router.route('/users-getall').get(usersCtrl.get);
  router.route('/user-get/:id').get(usersCtrl.getById);
  router.route('/user-getbyrole').get(usersCtrl.getByRole);
  router.route('/user-makeadmin').put(usersCtrl.makeAdmin);
  router.route('/user-getadmin').get(usersCtrl.getAdmins);


  app.use('/api', authorization.verifyToken, authorization.checkAccessAdmin, router);

}

export function setAdminOrStudentRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersController();
  const authorization = new Authorization();
  const studentsCtrl = new StudentsController();
  const companiesCtrl = new CompaniesController();

  router.route('/users-insert').post(usersCtrl.register);

  app.use('/api', authorization.verifyToken, authorization.checkAccessAdminORStudent, router);
}

export function setAdminOrStudentZelfRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersController();
  const authorization = new Authorization();
  const studentsCtrl = new StudentsController();
  const companiesCtrl = new CompaniesController();

  router.route('/delete-student/:student_fk').get(studentsCtrl.deleteStudent);

  app.use('/api', authorization.verifyToken, authorization.checkAccessAdminORStudentZelf, router);
}

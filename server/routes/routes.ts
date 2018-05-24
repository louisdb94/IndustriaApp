import * as express from 'express';
import {Authorization} from '../auth/verify-token';

//CONTROLLERS

//User Controller
import { UsersController} from '../controllers/users/users.controller';

//Admin Controller
import { EventsController} from '../controllers/admin/events.controller';
import { PrivacylogController} from '../controllers/admin/privacylog.controller';
import { ParametersController} from '../controllers/admin/parameters.controller';
import { AdminCompanycontactController} from '../controllers/admin/admin_contactcompany.controller';


//Student Controller
import { ContactStudentsController} from '../controllers/students/contact.controller';
import { CvsController} from '../controllers/students/cvs.controller';
import { EducationController} from '../controllers/students/education.controller';
import { ExperiencesController} from '../controllers/students/experiences.controller';
import { ImageController} from '../controllers/students/image.controller';
import { LanguageController} from '../controllers/students/language.controller';
import { ProfessionalController} from '../controllers/students/professional.controller';
import { SkillsController} from '../controllers/students/skills.controller';
import { SocialmediaController} from '../controllers/students/socialmedia.controller';
import { StudentsController} from '../controllers/students/students.controller';


//Company Controller
import { CompaniesController} from '../controllers/company/companies.controller';
import { ContactCompanyController} from '../controllers/company/contact.controller';
import { PrioritiesController} from '../controllers/company/priorities.controller';
import { RequirementsController} from '../controllers/company/requirements.controller';
import { VacaturesController} from '../controllers/company/vacatures.controller';


var VerifyToken = require('../auth/verify-token');

const authorization = new Authorization();

//Controlers
const usersCtrl = new UsersController();

const eventsCtrl = new EventsController();
const privacylogCtrl = new PrivacylogController();
const parametersCtrl = new ParametersController();
const adminContactCtrl = new AdminCompanycontactController();

const contactStudentCtrl = new ContactStudentsController();
const cvsCtrl = new CvsController();
const educationCtrl = new EducationController();
const experienceCtrl = new ExperiencesController();
const imageCtrl = new ImageController();
const languageCtrl = new LanguageController();
const professionalCtrl = new ProfessionalController();
const skillsCtrl = new SkillsController();
const socialmediaCtrl = new SocialmediaController();
const studentsCtrl = new StudentsController();

const companiesCtrl = new CompaniesController();
const contactCompanyCtrl = new ContactCompanyController();
const prioritiesCtrl = new PrioritiesController();
const requirementsCtrl = new RequirementsController();
const vacaturesCtrl = new VacaturesController();

export  function setRoutes(app, router) {



  router.route('/users-login').post(usersCtrl.login);  //PRE LOGIN
  router.route('/student-getbyrnumber/:rnumber').get(studentsCtrl.getStudentByRnumber);  //PRE LOGIN
  router.route('/companies-getbyemail/:email').get(companiesCtrl.getCompanyByEmail); //PRE LOGIN


  //USERS
  router.route('/users-getall').get(authorization.checkAccessAdmin, usersCtrl.get);
  router.route('/user-get/:id').get(authorization.checkAccessAdmin, usersCtrl.getById);
  router.route('/user-getbyrole').get(authorization.checkAccessAdmin, usersCtrl.getByRole);
  router.route('/users-insert').post(authorization.checkAccessAdminORStudent, usersCtrl.register);
  router.route('/resetpass').put(authorization.verifyToken, usersCtrl.updatePassword);
  router.route('/user-makeadmin').put(authorization.checkAccessAdmin, usersCtrl.makeAdmin);
  router.route('/user-getadmin').get(authorization.checkAccessAdmin, usersCtrl.getAdmins);
  router.route('/sendmail/:email').get(authorization.verifyToken, usersCtrl.sendMail);
  router.route('/encrypt').get(usersCtrl.encrypt);
  router.route('/encrypt2').get(usersCtrl.encrypt2);


  //STUDENTS

  router.route('/delete-student/:student_fk').get(authorization.checkAccessAdminORStudentZelf,studentsCtrl.deleteStudent);
  router.route('/students-get/:id').get(authorization.checkAccessCompanyORStudentZelf,studentsCtrl.getById);
  router.route('/students-getall').get(authorization.checkAccessAdminORCompany,studentsCtrl.get); // admin of company
  router.route('/students-getallid').get(authorization.checkAccessAdminORCompany,studentsCtrl.get); // admin of company
  router.route('/student-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,studentsCtrl.updateById);

  //Skills
  router.route('/skills-getalldistinct').get(authorization.verifyToken,skillsCtrl.selectSkill);
  router.route('/skills-getfkbyskill/:skill').get(authorization.verifyToken,skillsCtrl.getbySkill);
  router.route('/skills-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,skillsCtrl.updateById);
  router.route('/skills-get/:id').get(authorization.verifyToken,skillsCtrl.getById);
  router.route('/skills-getall').get(authorization.verifyToken,skillsCtrl.get);
  router.route('/skills-getbystudentfk/:id').get(authorization.verifyToken,skillsCtrl.getByStudentFk);
  router.route('/skills-insert').post(authorization.checkAccessStudentZelfInsertOrUpdate,skillsCtrl.insert);
  router.route('/skills-delete/:id').delete(authorization.verifyToken,skillsCtrl.delete);

  //Professional
  router.route('/professional-getalldistinct').get(authorization.verifyToken,professionalCtrl.selectProfessional);
  router.route('/professional-getfkbyskill/:skill').get(authorization.verifyToken,professionalCtrl.getbySkill);
  router.route('/professional-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,professionalCtrl.updateById);
  router.route('/professional-getall').get(authorization.verifyToken,professionalCtrl.get);
  router.route('/professional-get/:id').get(authorization.verifyToken,professionalCtrl.getById);
  router.route('/professional-getbystudentfk/:id').get(authorization.verifyToken,professionalCtrl.getByStudentFk);
  router.route('/professional-insert').post(authorization.checkAccessStudentZelfInsertOrUpdate,professionalCtrl.insert);
  router.route('/professional-delete/:id').delete(authorization.verifyToken,professionalCtrl.delete);

  //Language
  router.route('/language-getalldistinct').get(authorization.verifyToken,languageCtrl.selectLanguage);
  router.route('/language-getfkbylang/:lang').get(authorization.verifyToken,languageCtrl.getbyLanguage);
  router.route('/language-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,languageCtrl.updateById);
  router.route('/language-get/:id').get(authorization.verifyToken,languageCtrl.getById);
  router.route('/language-getall').get(authorization.verifyToken,languageCtrl.get);
  router.route('/language-getbystudentfk/:id').get(authorization.verifyToken,languageCtrl.getByStudentFk);
  router.route('/language-insert').post(authorization.checkAccessStudentZelfInsertOrUpdate,languageCtrl.insert);
  router.route('/language-delete/:id').delete(authorization.verifyToken,languageCtrl.delete);

  //SocialMedia
  router.route('/socialmedia-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,socialmediaCtrl.updateById);
  router.route('/socialMedia-getall').get(authorization.verifyToken,socialmediaCtrl.get);
  router.route('/socialmedia-get/:id').get(authorization.verifyToken,socialmediaCtrl.getByStudentFk);

  //Education
  router.route('/education-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,educationCtrl.updateById);
  router.route('/education-getall').get(authorization.verifyToken,educationCtrl.get);
  router.route('/education-get/:id').get(authorization.verifyToken,educationCtrl.getByStudentFk);
  router.route('/education-insertForm').post(authorization.checkAccessStudentZelfInsertOrUpdate,educationCtrl.insert);
  router.route('/education-delete/:id').delete(authorization.verifyToken,educationCtrl.delete);

  //Experiences
  router.route('/experience-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,experienceCtrl.updateById);
  router.route('/experiences-getall').get(authorization.verifyToken,experienceCtrl.get);
  router.route('/experiences-getbystudentfk/:id').get(authorization.verifyToken,experienceCtrl.getByStudentFk);
  router.route('/experience-insertform').post(authorization.checkAccessStudentZelfInsertOrUpdate,experienceCtrl.insert);
  router.route('/experiences-delete/:id').delete(authorization.verifyToken,experienceCtrl.delete);

  //Contact Student
  router.route('/contact-update').put(authorization.checkAccessStudentZelfInsertOrUpdate,contactStudentCtrl.updateById);
  router.route('/contact-getall').get(authorization.verifyToken,contactStudentCtrl.get);
  router.route('/contact-get/:id').get(authorization.verifyToken,contactStudentCtrl.getById);
  router.route('/contact-getbystudentfk/:id').get(authorization.verifyToken,contactStudentCtrl.getByStudentFk);
  router.route('/contact-getCounty').get(authorization.verifyToken,contactStudentCtrl.selectContact);


  //COMPANIES
  router.route('/companies-get/:id').get(authorization.verifyToken,companiesCtrl.getById);
  router.route('/companies-getall').get(authorization.verifyToken,companiesCtrl.get);
  router.route('/companies-insert').post(authorization.checkAccessAdmin,companiesCtrl.insert);
  router.route('/companies-delete/:id').delete(authorization.checkAccessAdmin,companiesCtrl.delete);
  router.route('/companies-update').put(authorization.checkAccessCompanyZelfInsertOrUpdate,companiesCtrl.updateById);
  router.route('/companies-updatepriority').put(authorization.checkAccessAdmin,companiesCtrl.updateById);
  router.route('/delete-company').post(authorization.checkAccessAdmin,companiesCtrl.deleteCompany);
  router.route('/companies-innerjoin').get(companiesCtrl.innerJoinCompany);

  //Contact Company
  router.route('/contacts-update').put(authorization.checkAccessCompanyZelfInsertOrUpdate,contactCompanyCtrl.updateById);
  router.route('/contacts-getall').get(authorization.verifyToken,contactCompanyCtrl.get);
  router.route('/contacts-getbycompanyfk/:id').get(authorization.verifyToken,contactCompanyCtrl.getByCompanyFk);
  router.route('/contacts-insert').post(authorization.checkAccessCompanyZelfInsertOrUpdate,contactCompanyCtrl.insert);
  //Priorities
  router.route('/companies-priority').post(authorization.checkAccessAdmin,prioritiesCtrl.addPriority);
  router.route('/companies-deletepriority/:company_fk').get(authorization.checkAccessAdmin,prioritiesCtrl.deletePriority);
  router.route('/companies-getallpriorities').get(authorization.verifyToken,prioritiesCtrl.get);
  router.route('/companies-updatepriorityCompany').put(authorization.checkAccessAdmin,prioritiesCtrl.updateById);


  //Vacatures
  router.route('/vacatures-get/:id').get(vacaturesCtrl.getVacatureById);
  router.route('/vacatures-getbycompany/:id').get(authorization.verifyToken,vacaturesCtrl.getVacatureByCompanyFk);
  router.route('/vacatures-getall').get(authorization.verifyToken,vacaturesCtrl.get);
  router.route('/vacatures-delete/:id').delete(authorization.verifyToken,vacaturesCtrl.delete);
  router.route('/vacatures-update').put(authorization.checkAccessCompanyZelfInsertOrUpdate,vacaturesCtrl.updateById);
  router.route('/vacatures-insertform').post(authorization.checkAccessCompanyZelfInsertOrUpdate,vacaturesCtrl.insert);

  //Events
  router.route('/events-insert').post(authorization.verifyToken,eventsCtrl.insert);
  router.route('/events-getall').get(authorization.verifyToken,eventsCtrl.get);
  router.route('/events-update').put(authorization.checkAccessAdmin,eventsCtrl.updateById);
  router.route('/events-delete/:id').delete(authorization.verifyToken,eventsCtrl.delete);

  //PrivacyLog
  router.route('/privacylog-insert').post(privacylogCtrl.insert);
  router.route('/privacylog-delete/:id').delete(authorization.verifyToken,privacylogCtrl.delete);

  //Requirements
  router.route('/requirements-get/:id').get(authorization.verifyToken,requirementsCtrl.getRequirementByVacature);
  router.route('/requirements-getall').get(authorization.verifyToken,requirementsCtrl.get);
  router.route('/requirements-insertform').post(authorization.verifyToken,requirementsCtrl.insert);
  router.route('/requirements-delete/:id').delete(authorization.verifyToken,requirementsCtrl.delete);
  router.route('/requirements-update').put(authorization.verifyToken,requirementsCtrl.updateById);

  //Parameters
  router.route('/parameters-getparamsbyadmin').get(authorization.verifyToken,parametersCtrl.getByAdmin);
  router.route('/parameters-getall').get(authorization.verifyToken,parametersCtrl.get);
  router.route('/parameters-getparamscompany').get(authorization.verifyToken,parametersCtrl.getByParamsCompany);
  router.route('/parameters-getforcompany/:user_fk').get(authorization.verifyToken,parametersCtrl.getParamsForCompany);
  router.route('/parameters-add').post(authorization.checkAccessAdmin,parametersCtrl.insert);
  router.route('/parameters-delete/:id').delete(authorization.checkAccessAdmin,parametersCtrl.delete);
  router.route('/parameters-deletefromvalue/:value').delete(authorization.verifyToken,parametersCtrl.deleteFromValue);

  //Admin company contact
  router.route('/admin-companycontact-getall').get(authorization.checkAccessAdmin,adminContactCtrl.get);
  router.route('/admin-companycontact-insert').post(authorization.checkAccessAdmin,adminContactCtrl.insert);
  router.route('/admin-companycontact-update').put(authorization.checkAccessAdmin,adminContactCtrl.updateById);

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


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}

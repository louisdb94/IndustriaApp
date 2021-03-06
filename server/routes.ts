import * as express from 'express';
import * as path from 'path';
import * as mime from 'mime';
import * as fs from 'fs';
import {connection} from './app';
import * as  mysql from 'mysql';

import CvCtrl from './controllers/cv';
import UserCtrl from './controllers/user';
import StudentCtrl from './controllers/student';
import User from './models/user';
import Student from './models/student';
import Cv from './models/cv';
import Image from './models/image';

//MYSQL CONTROLLERS
import CvsCtrl from './controllers_mysql/students/cvs';
import ContactCtrl from './controllers_mysql/students/contact';
import EducationCtrl from './controllers_mysql/students/education';
import ExperienceCtrl from './controllers_mysql/students/experiences';
import ImageCtrl from './controllers_mysql/students/image';
import LanguageCtrl from './controllers_mysql/students/language';
import ProfessionalCtrl from './controllers_mysql/students/professional';
import SkillsCtrl from './controllers_mysql/students/skills';
import SocialmediaCtrl from './controllers_mysql/students/socialmedia';
import StudentsCtrl from './controllers_mysql/students/students';
import UsersCtrl from './controllers_mysql/users';

import CompanyCtrl from './controllers_mysql/company/companies';
import VacaturesCtrl from './controllers_mysql/company/vacatures';
import CompanyContactCtrl from './controllers_mysql/company/contact';
import CompanyRequirementCtrl from './controllers_mysql/company/requirement';
import EventsCtrl from './controllers_mysql/admin/events';
import PrivacylogCtrl from './controllers_mysql/admin/privacylog';

//MYSQL MODELS
import contacts from './models_mysql/students/contact';
import cvs from './models_mysql/students/cvs';
import education from './models_mysql/students/education';
import experiences from './models_mysql/students/experiences';
import language from './models_mysql/students/language';
import professional from './models_mysql/students/professional';
import skills from './models_mysql/students/skills';
import socialmedia from './models_mysql/students/socialmedia';
import students from './models_mysql/students/students';
import users from './models_mysql/users';

import companies from './models_mysql/company/companies';
import vacatures from './models_mysql/company/vacatures';
import contact_company from './models_mysql/company/contact';
import requirement from './models_mysql/company/requirement';
import events from './models_mysql/admin/events';
import privacylog from './models_mysql/admin/privacylog';
import SendmailCtrl from './config/sendmail';



export default function setRoutes(app) {

  const router = express.Router();

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
  const professionalCtrl = new ProfessionalCtrl();
  const skillsCtrl = new SkillsCtrl();
  const socialmediaCtrl = new SocialmediaCtrl();
  const studentsCtrl = new StudentsCtrl();
  const usersCtrl = new UsersCtrl();

  const companiesCtrl = new CompanyCtrl();
  const vacaturesCtrl = new VacaturesCtrl();
  const companyContactCtrl = new CompanyContactCtrl();
  const companyRequirementCtrl = new CompanyRequirementCtrl();
  const eventsCtrl = new EventsCtrl();
  const privacylogCtrl = new PrivacylogCtrl();
  const sendmail = new SendmailCtrl();


  // CREATE MYSQL TABLES
  router.route('/create-users').get(usersCtrl.getsql);
  router.route('/create-students').get(studentsCtrl.getsql);
  router.route('/create-cvs').get(cvsCtrl.getsql);
  router.route('/create-contacts').get(contactsCtrl.getsql);
  router.route('/create-education').get(educationCtrl.getsql);
  router.route('/create-experience').get(experienceCtrl.getsql);
  router.route('/create-language').get(languageCtrl.getsql);
  router.route('/create-skills').get(skillsCtrl.getsql);
  router.route('/create-socialmedia').get(socialmediaCtrl.getsql);

  router.route('/create-companies').get(companiesCtrl.getsql);
  router.route('/create-vacatures').get(vacaturesCtrl.getsql);

  //User
  router.route('/user-get/:id').get(usersCtrl.getbyId);
  router.route('/user-getbyrole').get(usersCtrl.getbyRole);
  router.route('/users-getall').get(usersCtrl.select);
  router.route('/users-insert').post(usersCtrl.insert);
  router.route('/user-delete/:id').get(usersCtrl.delete);
  router.route('/users-getbyrnumber/:rnumber').get(usersCtrl.getByRnumber);
  router.route('/users-login').post(usersCtrl.login);
  router.route('/resetpass').put(usersCtrl.resetPass);
  router.route('/delete-user/:student_fk').get(usersCtrl.deleteStudent);
  router.route('/user-makeadmin').put(usersCtrl.makeAdmin);
  router.route('/user-getadmin').get(usersCtrl.getAdmins);

  //Students
  router.route('/students-get/:id').get(studentsCtrl.getbyId);
  router.route('/students-getall').get(studentsCtrl.select);
  router.route('/students-getallid').get(studentsCtrl.selectIds);
  router.route('/students-insert').post(studentsCtrl.insert);
  router.route('/students-insert/:id').get(studentsCtrl.insertUser);
  router.route('/student-delete/:id').get(studentsCtrl.delete);
  router.route('/student-getbyrnumber/:rnumber').get(studentsCtrl.getStudentByRnumber);
  router.route('/student-update').put(studentsCtrl.updateAll);
  router.route('/innerjoin/:id').get(studentsCtrl.innerjoin);
  router.route('/inner').get(studentsCtrl.inner);
  router.route('/innertje').get(studentsCtrl.innertje);

  //Cvs
  router.route('/cv-add').post(cvsCtrl.addCv);
  router.route('/cv/:id').get(cvsCtrl.getbyFk);
  router.route('/cv-delete/:id').delete(cvsCtrl.delete);
  //upload a pdf or image
  router.route('/cv/upload').post(cvsCtrl.uploadCv);
  //download a cv of a student
  router.route('/download/:id').get(cvsCtrl.downloadCv);
  router.route('/cv/remove/:id').post(cvsCtrl.removeCv);
  router.route('/cvs-insert/:id').get(cvsCtrl.insertStudentFK);

  //Education
  router.route('/education-get/:id').get(educationCtrl.getbyFk);
  router.route('/education-getall').get(educationCtrl.select);
  router.route('/education-insert').post(educationCtrl.insert);
  router.route('/education-insert/:id').get(educationCtrl.insertStudentFK);
  router.route('/education-delete/:id').get(educationCtrl.delete);
  router.route('/education-update').put(educationCtrl.updateAll);

  //Experiences
  //router.route('/experiences-get/:id').get(experienceCtrl.getbyId);
  router.route('/experiences-get/:id').get(experienceCtrl.getbyFkExperience);
  router.route('/experiences-getall').get(experienceCtrl.select);
  router.route('/experiences-insert').post(experienceCtrl.insert);
  router.route('/experience-insertform').post(experienceCtrl.insertForm);
  router.route('/experience-insert/:id').get(experienceCtrl.insertStudentFK);
  router.route('/experiences-delete/:id').delete(experienceCtrl.delete);

  //Language
  router.route('/language-get/:id').get(languageCtrl.getbyId);
  router.route('/language-getbystudentfk/:id').get(languageCtrl.getbyStudentId);
  router.route('/language-getall').get(languageCtrl.select);
  router.route('/language-getalldistinct').get(languageCtrl.selectLanguage);
  router.route('/language-insert').post(languageCtrl.insert);
  router.route('/language-insert/:id').get(languageCtrl.insertStudentFK);
  router.route('/languageCtrl-delete/:id').get(languageCtrl.delete);
  router.route('/language-update').put(languageCtrl.updateAll);
  router.route('/language-getfkbylang/:lang').get(languageCtrl.getbyLanguage);

  //Professional
  router.route('/professional-get/:id').get(professionalCtrl.getbyId);
  router.route('/professional-getbystudentfk/:id').get(professionalCtrl.getbyStudentId);
  router.route('/professional-getall').get(professionalCtrl.select);
  router.route('/professional-getalldistinct').get(professionalCtrl.selectProfessional);
  router.route('/professional-insert').post(professionalCtrl.insert);
  router.route('/professional-insert/:id').get(professionalCtrl.insertStudentFK);
  router.route('/professional-delete/:id').get(professionalCtrl.delete);
  router.route('/professional-update').put(professionalCtrl.updateAll);
  router.route('/professional-getfkbyskill/:skill').get(professionalCtrl.getbySkill);

  //Skill
  router.route('/skills-get/:id').get(skillsCtrl.getbyId);
  router.route('/skills-getbystudentfk/:id').get(skillsCtrl.getbyStudentId);
  router.route('/skills-getall').get(skillsCtrl.select);
  router.route('/skills-getalldistinct').get(skillsCtrl.selectSkill);
  router.route('/skills-insert').post(skillsCtrl.insert);
  router.route('/skills-insert/:id').get(skillsCtrl.insertStudentFK);
  router.route('/skills-delete/:id').get(skillsCtrl.delete);
  router.route('/skills-update').put(skillsCtrl.updateAll);
  router.route('/skills-getfkbyskill/:skill').get(skillsCtrl.getbySkill);


  //SocialMedia
  router.route('/socialmedia-get/:id').get(socialmediaCtrl.getbyFk);
  router.route('/socialMedia-getall').get(socialmediaCtrl.select);
  router.route('/socialmedia-insert').post(socialmediaCtrl.insert);
  router.route('/socialmedia-insert/:id').get(socialmediaCtrl.insertStudentFK);
  router.route('/socialmedia-delete/:id').get(socialmediaCtrl.delete);
  router.route('/socialmedia-update').put(socialmediaCtrl.updateAll);

  //Contact
  router.route('/contact-get/:id').get(contactsCtrl.getbyId);
  router.route('/contact-getbystudentfk/:id').get(contactsCtrl.getbyStudentId);
  router.route('/contact-getall').get(contactsCtrl.select);
  router.route('/contact-insert').post(contactsCtrl.insert);
  router.route('/contact-insert/:id').get(contactsCtrl.insertStudentFK);
  router.route('/contact-delete/:id').get(contactsCtrl.delete);
  router.route('/contact-update').put(contactsCtrl.updateAll);

  //Companies
  router.route('/companies-get/:id').get(companiesCtrl.getbyId);
  router.route('/companies-getall').get(companiesCtrl.select);
  router.route('/companies-insert').post(companiesCtrl.insert);
  router.route('/companies-insert/:id').get(companiesCtrl.insertUser);
  router.route('/companies-delete/:id').get(companiesCtrl.delete);
  router.route('/downloadImage-company/:id').get(companiesCtrl.download);
  router.route('/companies-update').put(companiesCtrl.updateAll);
  router.route('/companies-innerjoin').get(companiesCtrl.innerJoin);
  router.route('/companies-innerJoin/:id').get(companiesCtrl.innerJoin);
  router.route('/companies-getbyemail/:email').get(companiesCtrl.getCompanyByEmail);
  router.route('/companies-updatepriority').put(companiesCtrl.updatePriority);


  //Vacature
  router.route('/vacatures-get/:id').get(vacaturesCtrl.getbyId);
  router.route('/vacatures-getbycompany/:id').get(vacaturesCtrl.getbyCompanyId);
  router.route('/vacatures-getall').get(vacaturesCtrl.select);
  router.route('/vacatures-insert').post(vacaturesCtrl.insert);
  router.route('/vacatures-insert/:id').get(vacaturesCtrl.insertCompanyFK);
  router.route('/vacatures-delete/:id').delete(vacaturesCtrl.delete);
  router.route('/vacatures-update').put(vacaturesCtrl.updateAll);
  router.route('/vacatures-insertform').post(vacaturesCtrl.insertForm);



  //Events
  router.route('/events-insert').post(eventsCtrl.insert);
  router.route('/events-getall').get(eventsCtrl.selectAll);
  router.route('/events-update').put(eventsCtrl.updateEvent);
  router.route('/events-delete/:id').delete(eventsCtrl.delete);

  //Privacylog
  router.route('/privacylog-insert').post(privacylogCtrl.insertPrivacylog);
  router.route('/privacylog-delete/:id').delete(privacylogCtrl.delete);

  //Contact Company
  router.route('/contacts-get/:id').get(companyContactCtrl.getbyId);
  router.route('/contacts-getbycompanyfk/:id').get(companyContactCtrl.getbyCompanyId);
  router.route('/contacts-getall').get(companyContactCtrl.select);
  router.route('/contacts-insert').post(companyContactCtrl.insert);
  router.route('/contacts-insert/:id').get(companyContactCtrl.insertCompanyFK);
  router.route('/contacts-delete/:id').get(companyContactCtrl.delete);
  router.route('/contacts-update').put(companyContactCtrl.updateAll);



  //Requirements
  router.route('/requirements-get/:id').get(companyRequirementCtrl.getbyFkExperience);
  router.route('/requirements-getall').get(companyRequirementCtrl.select);
  router.route('/requirements-insert').post(companyRequirementCtrl.insert);
  router.route('/requirements-insertform').post(companyRequirementCtrl.insertForm);
  router.route('/requirements-insert/:id').get(companyRequirementCtrl.insertVacatureFK);
  router.route('/requirements-delete/:id').delete(companyRequirementCtrl.delete);



  // Image
  router.route('/image').post(imageCtrl.insert);
  router.route('/image/:id').delete(imageCtrl.delete);
  //upload a pdf or image
  router.route('/image/upload').post(imageCtrl.upload);
  router.route('/image/upload-company').post(imageCtrl.uploadCompany);
  //download a cv of a student
  router.route('/downloadImage/:id').get(imageCtrl.download);
  router.route('/image/remove/:id').post(imageCtrl.remove);


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

  //sendmail
  router.route('/sendmail/:email').get(sendmail.mailToken)



  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

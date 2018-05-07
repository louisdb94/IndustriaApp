import * as express from 'express';

//CONTROLLERS

//User Controller
import { UsersController} from './controllers/users/users.controller';

//Admin Controller
import { EventsController} from './controllers/admin/events.controller';
import { PrivacylogController} from './controllers/admin/privacylog.controller';
import { ParametersController} from './controllers/admin/parameters.controller';
import { AdminCompanycontactController} from './controllers/admin/admin_contactcompany.controller';


//Student Controller
import { ContactStudentsController} from './controllers/students/contact.controller';
import { CvsController} from './controllers/students/cvs.controller';
import { EducationController} from './controllers/students/education.controller';
import { ExperiencesController} from './controllers/students/experiences.controller';
import { ImageController} from './controllers/students/image.controller';
import { LanguageController} from './controllers/students/language.controller';
import { ProfessionalController} from './controllers/students/professional.controller';
import { SkillsController} from './controllers/students/skills.controller';
import { SocialmediaController} from './controllers/students/socialmedia.controller';
import { StudentsController} from './controllers/students/students.controller';


//Company Controller
import { CompaniesController} from './controllers/company/companies.controller';
import { ContactCompanyController} from './controllers/company/contact.controller';
import { PrioritiesController} from './controllers/company/priorities.controller';
import { RequirementsController} from './controllers/company/requirements.controller';
import { VacaturesController} from './controllers/company/vacatures.controller';


var VerifyToken = require('./auth/verify-token');

export default function setRoutes2(app) {

  const router = express.Router();

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

  //USERS
  router.route('/users-getall').get(usersCtrl.get);
  router.route('/user-get/:id').get(usersCtrl.getById);
  router.route('/user-getbyrole').get(usersCtrl.getByRole);
  router.route('/users-insert').post(usersCtrl.register);
  router.route('/users-login').post(usersCtrl.login);
  router.route('/resetpass').put(usersCtrl.updatePassword);
  router.route('/user-makeadmin').put(usersCtrl.makeAdmin);
  router.route('/user-getadmin').get(usersCtrl.getAdmins);
  router.route('/sendmail/:email').get(usersCtrl.sendMail);
  router.route('/encrypt').get(usersCtrl.encrypt);
  router.route('/encrypt2').get(usersCtrl.encrypt2);


  //STUDENTS

  router.route('/delete-student/:student_fk').get(studentsCtrl.deleteStudent);
  router.route('/students-get/:id').get(studentsCtrl.getById);
  router.route('/students-getall').get(studentsCtrl.get);
  router.route('/students-getallid').get(studentsCtrl.get);
  router.route('/student-getbyrnumber/:rnumber').get(studentsCtrl.getStudentByRnumber);
  router.route('/student-update').put(studentsCtrl.updateById);

  //CVs
  router.route('/cv-add').post(cvsCtrl.insert);
  router.route('/cv/:id').get(cvsCtrl.getByStudentFk);
  router.route('/cv-delete/:id').delete(cvsCtrl.deleteCv);
  router.route('/cv/upload').post(cvsCtrl.uploadCv);
  router.route('/download/:id').get(cvsCtrl.downloadCv);

  //Image
  router.route('/image/upload').post(imageCtrl.uploadImageStudent);
  router.route('/image/upload-company').post(imageCtrl.uploadImageCompany);
  router.route('/downloadImage/:id').get(imageCtrl.downloadImageStudent);
  router.route('/downloadImage-company/:id').get(imageCtrl.downloadImageCompany);

  //Skills
  router.route('/skills-getalldistinct').get(skillsCtrl.selectSkill);
  router.route('/skills-getfkbyskill/:skill').get(skillsCtrl.getbySkill);
  router.route('/skills-update').put(skillsCtrl.updateById);
  router.route('/skills-get/:id').get(skillsCtrl.getById);
  router.route('/skills-getall').get(skillsCtrl.get);
  router.route('/skills-getbystudentfk/:id').get(skillsCtrl.getByStudentFk);
  router.route('/skills-insert').post(skillsCtrl.insert);
  router.route('/skills-delete/:id').delete(skillsCtrl.delete);

  //Professional
  router.route('/professional-getalldistinct').get(professionalCtrl.selectProfessional);
  router.route('/professional-getfkbyskill/:skill').get(professionalCtrl.getbySkill);
  router.route('/professional-update').put(professionalCtrl.updateById);
  router.route('/professional-getall').get(professionalCtrl.get);
  router.route('/professional-get/:id').get(professionalCtrl.getById);
  router.route('/professional-getbystudentfk/:id').get(professionalCtrl.getByStudentFk);
  router.route('/professional-insert').post(professionalCtrl.insert);
  router.route('/professional-delete/:id').delete(professionalCtrl.delete);

  //Language
  router.route('/language-getalldistinct').get(languageCtrl.selectLanguage);
  router.route('/language-getfkbylang/:lang').get(languageCtrl.getbyLanguage);
  router.route('/language-update').put(languageCtrl.updateById);
  router.route('/language-get/:id').get(languageCtrl.getById);
  router.route('/language-getall').get(languageCtrl.get);
  router.route('/language-getbystudentfk/:id').get(languageCtrl.getByStudentFk);
  router.route('/language-insert').post(languageCtrl.insert);
  router.route('/language-delete/:id').delete(languageCtrl.delete);

  //SocialMedia
  router.route('/socialmedia-update').put(socialmediaCtrl.updateById);
  router.route('/socialMedia-getall').get(socialmediaCtrl.get);
  router.route('/socialmedia-get/:id').get(socialmediaCtrl.getByStudentFk);

  //Education
  router.route('/education-update').put(educationCtrl.updateById);
  router.route('/education-getall').get(educationCtrl.get);
  router.route('/education-get/:id').get(educationCtrl.getByStudentFk);
  router.route('/education-insertForm').post(educationCtrl.insert);
  router.route('/education-delete/:id').delete(educationCtrl.delete);

  //Experiences
  router.route('/experience-update').put(experienceCtrl.updateById);
  router.route('/experiences-getall').get(experienceCtrl.get);
  router.route('/experiences-getbystudentfk/:id').get(experienceCtrl.getByStudentFk);
  router.route('/experience-insertform').post(experienceCtrl.insert);
  router.route('/experiences-delete/:id').delete(experienceCtrl.delete);

  //Contact Student
  router.route('/contact-update').put(contactStudentCtrl.updateById);
  router.route('/contact-getall').get(contactStudentCtrl.get);
  router.route('/contact-get/:id').get(contactStudentCtrl.getById);
  router.route('/contact-getbystudentfk/:id').get(contactStudentCtrl.getByStudentFk);
  router.route('/contact-getCounty').get(contactStudentCtrl.selectContact);


  //COMPANIES
  router.route('/companies-get/:id').get(companiesCtrl.getById);
  router.route('/companies-getall').get(companiesCtrl.get);
  router.route('/companies-insert').post(companiesCtrl.insert);
  router.route('/companies-delete/:id').delete(companiesCtrl.delete);
  router.route('/companies-update').put(companiesCtrl.updateById);
  router.route('/companies-getbyemail/:email').get(companiesCtrl.getCompanyByEmail);
  router.route('/companies-updatepriority').put(companiesCtrl.updateById);
  router.route('/delete-company').post(companiesCtrl.deleteCompany);
  router.route('/companies-innerjoin').get(companiesCtrl.innerJoinCompany);

  //Contact Company
  router.route('/contacts-update').put(contactCompanyCtrl.updateById);
  router.route('/contacts-getall').get(contactCompanyCtrl.get);
  router.route('/contacts-getbycompanyfk/:id').get(contactCompanyCtrl.getByCompanyFk);
  router.route('/contacts-insert').post(contactCompanyCtrl.insert);
  //Priorities
  router.route('/companies-priority').post(prioritiesCtrl.addPriority);
  router.route('/companies-deletepriority/:company_fk').get(prioritiesCtrl.deletePriority);
  router.route('/companies-getallpriorities').get(prioritiesCtrl.get);
  router.route('/companies-updatepriorityCompany').put(prioritiesCtrl.updateById);


  //Vacatures
  router.route('/vacatures-get/:id').get(vacaturesCtrl.getVacatureById);
  router.route('/vacatures-getbycompany/:id').get(vacaturesCtrl.getVacatureByCompanyFk);
  router.route('/vacatures-getall').get(vacaturesCtrl.get);
  router.route('/vacatures-delete/:id').delete(vacaturesCtrl.delete);
  router.route('/vacatures-update').put(vacaturesCtrl.updateById);
  router.route('/vacatures-insertform').post(vacaturesCtrl.insert);

  //Events
  router.route('/events-insert').post(eventsCtrl.insert);
  router.route('/events-getall').get(eventsCtrl.get);
  router.route('/events-update').put(eventsCtrl.updateById);
  router.route('/events-delete/:id').delete(eventsCtrl.delete);

  //PrivacyLog
  router.route('/privacylog-insert').post(privacylogCtrl.insert);
  router.route('/privacylog-delete/:id').delete(privacylogCtrl.delete);

  //Requirements
  router.route('/requirements-get/:id').get(requirementsCtrl.getRequirementByVacature);
  router.route('/requirements-getall').get(requirementsCtrl.get);
  router.route('/requirements-insertform').post(requirementsCtrl.insert);
  router.route('/requirements-delete/:id').delete(requirementsCtrl.delete);
  router.route('/requirements-update').put(requirementsCtrl.updateById);

  //Parameters
  router.route('/parameters-getparamsbyadmin').get(parametersCtrl.getByAdmin);
  router.route('/parameters-getall').get(parametersCtrl.get);
  router.route('/parameters-getparamscompany').get(parametersCtrl.getByParamsCompany);
  router.route('/parameters-getforcompany/:user_fk').get(parametersCtrl.getParamsForCompany);
  router.route('/parameters-add').post(parametersCtrl.insert);
  router.route('/parameters-delete/:id').delete(parametersCtrl.delete);
  router.route('/parameters-deletefromvalue/:value').delete(parametersCtrl.deleteFromValue);

  //Admin company contact
  router.route('admin-companycontact-getall').get(adminContactCtrl.get);
  router.route('admin-companycontact-insert').post(adminContactCtrl.insert);
  router.route('admin-companycontact-update').put(adminContactCtrl.updateById);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}

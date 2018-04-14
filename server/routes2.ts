import * as express from 'express';

//MODELS

//User Model and CRUD
import { UserModel, UserCrud } from './models/users';

//Admin Model and CRUD
import { EventModel, EventCrud } from './models/admin/events';
import { PrivacyLogModel, PrivacyLogCrud } from './models/admin/privacylog';

//Student Model and CRUD
import { StudentModel, StudentCrud } from './models/students';
import { StudentContactModel, StudentContactCrud } from './models/students/contact';
import { CvsModel, CvsCrud } from './models/students/cvs';
import { EducationModel, EducationCrud } from './models/students/education';
import { ExperienceModel, ExperienceCrud } from './models/students/experience';
import { LanguageModel, LanguageCrud } from './models/students/language';
import { ProfessionalModel, ProfessionalCrud } from './models/students/professional';
import { SkillsModel, SkillsCrud } from './models/students/skills';
import { SocialMediaModel, SocialMediaCrud } from './models/students/socialmedia';

//Company Model and CRUD
import { CompanyModel, CompanyCrud } from './models/companies';
import { ContactModel, ContactCrud } from './models/companies/contacts';
import { PrioritiesModel, PrioritiesCrud } from './models/companies/priorities';
import { RequirementsModel, RequirementsCrud } from './models/companies/requirements';
import { VacaturesModel, VacaturesCrud } from './models/companies/vacatures';

//CONTROLLERS

//User Controller
import { UsersController} from './controllers/users/users.controller';

//Admin Controller
import { EventsController} from './controllers/admin/events.controller';
import { PrivacylogController} from './controllers/admin/privacylog.controller';

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

  //Users
  router.route('/users-getall').get(usersCtrl.get);
  router.route('/user-get/:id').get(usersCtrl.getById);
  router.route('/user-getbyrole').get(usersCtrl.getByRole);
  router.route('/users-insert').post(usersCtrl.register);
  router.route('/users-login').post(usersCtrl.login);
  router.route('/resetpass').put(usersCtrl.updatePassword);
  router.route('/user-makeadmin').put(usersCtrl.makeAdmin);
  router.route('/user-getadmin').get(usersCtrl.getAdmins);


  //Students
  //router.route('/delete-student/:student_fk').get(studentsCtrl.deleteStudent);
  router.route('/students-get/:id').get(studentsCtrl.getById);
  router.route('/students-getall').get(studentsCtrl.get);
  router.route('/students-getallid').get(studentsCtrl.get);
  router.route('/student-getbyrnumber/:rnumber').get(studentsCtrl.getStudentByRnumber);
  router.route('/student-update').put(studentsCtrl.updateById);


  //Skills
  router.route('/skills-getalldistinct').get(skillsCtrl.selectSkill);
  router.route('/skills-getfkbyskill/:skill').get(skillsCtrl.getbySkill);
  router.route('/skills-update').put(skillsCtrl.updateById);
  router.route('/skills-get/:id').get(skillsCtrl.getById);

  //Professional
  router.route('/professional-getalldistinct').get(professionalCtrl.selectProfessional);
  router.route('/professional-getfkbyskill/:skill').get(professionalCtrl.getbySkill);
  router.route('/professional-update').put(professionalCtrl.updateById);
  router.route('/professional-get/:id').get(professionalCtrl.getById);

  //Language
  router.route('/language-getalldistinct').get(languageCtrl.selectLanguage);
  router.route('/language-getfkbylang/:lang').get(languageCtrl.getbyLanguage);
  router.route('/language-update').put(languageCtrl.updateById);
  router.route('/language-get/:id').get(languageCtrl.getById);

  //SocialMedia
  router.route('/socialmedia-update').put(socialmediaCtrl.updateById);

  //Education
  router.route('/education-update').put(educationCtrl.updateById);

  //Experiences
  router.route('/experience-update').put(experienceCtrl.updateById);

  //Contact
  router.route('/contact-update').put(contactStudentCtrl.updateById);






  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}

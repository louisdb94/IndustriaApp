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
import { EventController} from './controllers/admin/events.controller';
import { PrivacylogController} from './controllers/events/privacylog.controller';

//Student Controller
import { ContactController} from './controllers/students/contact.controller';
import { CvsController} from './controllers/students/cvs.controller';
import { EducationController} from './controllers/students/education.controller';
import { ExperienceController} from './controllers/students/experiences.controller';
import { ImageController} from './controllers/students/image.controller';
import { LanguageController} from './controllers/students/language.controller';
import { ProfessionalController} from './controllers/students/professional.controller';
import { SkillsController} from './controllers/students/skills.controller';
import { SocialmediaController} from './controllers/students/socialmedia.controller';
import { StudentsController} from './controllers/students/students.controller';


//Company Controller



var VerifyToken = require('./auth/verify-token');

export default function setRoutes2(app) {

  const router = express.Router();

}

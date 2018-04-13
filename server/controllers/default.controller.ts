import { pool } from '../app';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as  mysql from 'mysql';

//User Model and CRUD
import { UserModel, UserCrud } from '../models/users';

//Admin Model and CRUD
import { EventModel, EventCrud } from '../models/admin/events';
import { PrivacyLogModel, PrivacyLogCrud } from '../models/admin/privacylog';

//Student Model and CRUD
import { StudentModel, StudentCrud } from '../models/students';
import { StudentContactModel, StudentContactCrud } from '../models/students/contact';
import { CvsModel, CvsCrud } from '../models/students/cvs';
import { EducationModel, EducationCrud } from '../models/students/education';
import { ExperienceModel, ExperienceCrud } from '../models/students/experience';
import { LanguageModel, LanguageCrud } from '../models/students/language';
import { ProfessionalModel, ProfessionalCrud } from '../models/students/professional';
import { SkillsModel, SkillsCrud } from '../models/students/skills';
import { SocialMediaModel, SocialMediaCrud } from '../models/students/socialmedia';

//Company Model and CRUD
import { CompanyModel, CompanyCrud } from '../models/companies';
import { ContactModel, ContactCrud } from '../models/companies/contacts';
import { PrioritiesModel, PrioritiesCrud } from '../models/companies/priorities';
import { RequirementsModel, RequirementsCrud } from '../models/companies/requirements';
import { VacaturesModel, VacaturesCrud } from '../models/companies/vacatures';

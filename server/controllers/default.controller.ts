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

abstract class DefaultController {

  //Refactored insert met crud
  invoegen = (req, res) => {
      const map: Map<string, string> = new Map();
      for(var key in req.body) {
          if(req.body.hasOwnProperty(key)){
            map.set(key, req.body[key])
          }
      }

      var crud_controller = this.model + "Crud";
      this[crud_controller].insert(map).then(result => {
          res.status(200).json(result);
      });
  }

  //Refactored delete met crud
  verwijder = (req, res) => {
      let key_body, data_body;
      for(var key in req.body) {
          if(req.body.hasOwnProperty(key)){
            key_body = key;
            data_body = req.body[key];
          }
      }
      var crud_controller = this.model + "Crud";
      this[crud_controller].delete(key_body,data_body).then(result => {
          res.status(200).json(result);
      });
  }

  //Refactored update met crud
  update(res, req, name, field){
      const map: Map<string, string> = new Map();
      for(var key in req.body) {
          if(req.body.hasOwnProperty(key)){
            map.set(key, req.body[key])
          }
      }

      var crud_controller = this.model + "Crud";
      this[crud_controller].update(name, field, map).then(result => {
          res.status(200).json(result );
      });
  }

  //Refactored update met crud
  updateById = (req, res) => {
      this.update(res, req, 'id', req.body.id);
  }

  //Refactored select met crud
  get = (req, res) => {
      var crud_controller = this.model + "Crud";
      this[crud_controller].get().then(result => {
          res.status(200).json(result );
      });
  }

  getById = (req, res) => {
      this.getWhere(res, 'id', req.params.id);
  }

  getByCompanyFk = (req, res) => {
      this.getWhere(res, 'company_fk', req.params.id);
  }

  getWhere(res, name, field){
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy(name,field).then(result => {
          res.status(200).json( result );
      });
  }

}

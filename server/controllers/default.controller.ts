import { pool } from '../app';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as  mysql from 'mysql';

//User Model and CRUD
import { UserModel, UserCrud } from '../models/users';

//Admin Model and CRUD
import { EventModel, EventCrud } from '../models/admin/events';
import { PrivacyLogModel, PrivacyLogCrud } from '../models/admin/privacylog';
import { ParametersModel, ParametersCrud } from '../models/admin/parameters';

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

export abstract class DefaultController {

  abstract model : any;

    public userCrud = new UserCrud();

    public eventsCrud = new EventCrud();
    public privacylogCrud = new PrivacyLogCrud();
    public parametersCrud = new ParametersCrud();

    public studentsCrud = new StudentCrud();
    public contactCrud = new StudentContactCrud();
    public cvsCrud = new CvsCrud();
    public educationCrud = new EducationCrud();
    public experiencesCrud = new ExperienceCrud();
    public languageCrud = new LanguageCrud();
    public professionalCrud = new ProfessionalCrud();
    public skillsCrud = new SkillsCrud();
    public socialmediaCrud = new SocialMediaCrud();

    public companiesCrud = new CompanyCrud();
    public contact_companyCrud = new ContactCrud();
    public priorities_companyCrud = new PrioritiesCrud();
    public requirementsCrud = new RequirementsCrud();
    public vacaturesCrud = new VacaturesCrud();

  //Refactored insert met crud
  insert = (req, res) => {
    this.insertFunction(req, res);
  }

  insertFunction(req, res){
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

  delete = (req, res) => {
    this.deleteById(res, this.model, 'id', req.params.id);
  }

  deleteById(res, table, name, field){
    var crud_controller = this.model + "Crud";
      this[crud_controller].delete(table, name, field).then(result => {
        res.status(200).json(result);
      });
  }

  //Refactored update met crud
  update(req, res, name, field){
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

  updateTable(req, res, table, name, field){
    const map: Map<string, string> = new Map();
    for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
          map.set(key, req.body[key])
        }
    }

    var crud_controller = table + "Crud";
    this[crud_controller].update(name, field, map).then(result => {
        res.status(200).json(result );
    });
}

  //Refactored update met crud
  updateById = (req, res) => {
      this.update(req, res, 'id', req.body.id);
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

  getByStudentFk = (req, res) => {
      this.getWhere(res, 'student_fk', req.params.id);
  }

  getWhere(res, name, field){
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBy(this.model, name,field).then(result => {
          res.status(200).json( result );
      });
  }

  getDistinct(res, name ,table, selection){
    var crud_controller = this.model + "Crud";
    this[crud_controller].getDistinct(name, table).then(result => {
        for (let i = 0; i < result.length; i++) {
            if (result[i][selection] === '') {
                result.splice(i, 1);
            }
        }
        res.status(200).json( result );
    });
  }

  //Refactored update met crud
  getBySelection(res, selection, name, field){
      var crud_controller = this.model + "Crud";
      this[crud_controller].getBySelection(name, field, selection).then(result => {
          res.status(200).json(result );
      });
  }
}

import {DefaultCrud} from '../default-crud.crud';
import {StudentModel} from './student.model';

export class StudentCrud extends DefaultCrud<StudentModel>{

  constructor(){
    super("students");
  }

  parseObject(input: any): StudentModel {
    const _newStudent = new StudentModel();

    _newStudent.id = input.id;
    _newStudent.rnumber = input.rnumber;
    _newStudent.whoami = input.whoami;
    _newStudent.gradYear = input.gradYear;
    _newStudent.degree = input.degree;
    _newStudent.cvChecked = input.cvChecked;
    _newStudent.contactChecked = input.contactChecked;
    _newStudent.countSkills = input.countSkills;
    _newStudent.countProfessional = input.countProfessional;
    _newStudent.countLanguage = input.countLanguage;
    _newStudent.countEducation = input.countEducation;
    _newStudent.numberCv = input.numberCv;
    _newStudent.image = input.image;
    _newStudent.alumni = input.alumni;
    _newStudent.user_fk = input.user_fk;

    return _newStudent;
  }

}
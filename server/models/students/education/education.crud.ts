import {DefaultCrud} from '../../default-crud.crud';
import {EducationModel} from './education.model';

export class EducationCrud extends DefaultCrud<EducationModel>{

  constructor(){
    super("education");
  }

  parseObject(input: any): EducationModel {
    const _newEducation = new EducationModel();

    _newEducation.id = input.id;
    _newEducation.type = input.type;
    _newEducation.institution = input.institution;
    _newEducation.date_from = input.date_from;
    _newEducation.date_until = input.date_until;
    _newEducation.student_fk = input.student_fk;

    return _newEducation;
  }

}

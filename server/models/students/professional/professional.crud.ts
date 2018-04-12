import {DefaultCrud} from '../../default-crud.crud';
import {ProfessionalModel} from './professional.model';

export class ProfessionalCrud extends DefaultCrud<ProfessionalModel>{

  constructor(){
    super("professional");
  }

  parseObject(input: any): ProfessionalModel {
    const _newProfessional = new ProfessionalModel();

    _newProfessional.id = input.id;
    _newProfessional.skill = input.skill;
    _newProfessional.value = input.value;
    _newProfessional.value_type = input.value_type;
    _newProfessional.student_fk = input.student_fk;

    return _newProfessional;
  }
}

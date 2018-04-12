import {DefaultCrud} from '../../default-crud.crud';
import {ExperienceModel} from './experience.model';

export class ExperienceCrud extends DefaultCrud<ExperienceModel>{

  constructor(){
    super("experiences");
  }

  parseObject(input: any): ExperienceModel {
    const _newExperience = new ExperienceModel();

    _newExperience.id = input.id;
    _newExperience.function = input.function;
    _newExperience.description = input.description;
    _newExperience.period = input.period;
    _newExperience.student_fk = input.student_fk;

    return _newExperience;
  }

}

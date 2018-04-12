import {DefaultCrud} from '../../default-crud.crud';
import {SkillsModel} from './skills.model';

export class SkillsCrud extends DefaultCrud<SkillsModel>{

  constructor(){
    super("skills");
  }

  parseObject(input: any): SkillsModel {
    const _newSkills = new SkillsModel();

    _newSkills.id = input.id;
    _newSkills.skill = input.skill;
    _newSkills.value = input.value;
    _newSkills.value_type = input.value_type;
    _newSkills.student_fk = input.student_fk;

    return _newSkills;
  }

}

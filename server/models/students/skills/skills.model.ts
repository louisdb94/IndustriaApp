import {DefaultModel} from '../../default-model.model';

export class SkillsModel extends DefaultModel{
  skill: string;
  value: number;
  value_type: string;
  student_fk: number;
}

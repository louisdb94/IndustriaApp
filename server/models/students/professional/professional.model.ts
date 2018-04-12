import {DefaultModel} from '../../default-model.model';

export class ProfessionalModel extends DefaultModel{
  skill: string;
  value: number;
  value_type: string;
  student_fk: number;
}

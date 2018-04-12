import {DefaultModel} from '../../default-model.model';

export class ExperienceModel extends DefaultModel{
  function: string;
  description: string;
  period: string;
  student_fk: number;
}

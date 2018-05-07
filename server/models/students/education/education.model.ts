import {DefaultModel} from '../../default-model.model';

export class EducationModel extends DefaultModel{
  type: string;
  institution: string;
  date_from: number;
  date_until: number;
  student_fk: number;
}

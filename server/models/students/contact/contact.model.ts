import {DefaultModel} from '../../default-model.model';

export class StudentContactModel extends DefaultModel{
  email: string;
  phone: string;
  county: string;
  city: string;
  student_fk: number;
}

import {DefaultModel} from '../../default-model.model';

export class PrivacyLogModel extends DefaultModel{
  student_fk: number;
  cvCheck: boolean;
  contactCheck: boolean;
  timestamp_cv: string;
  timestamp_contact: string;

}

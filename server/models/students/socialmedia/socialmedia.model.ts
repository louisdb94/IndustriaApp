import {DefaultModel} from '../../default-model.model';

export class SocialMediaModel extends DefaultModel{
  type: string;
  url: string;
  checked: boolean;
  student_fk: number;
}

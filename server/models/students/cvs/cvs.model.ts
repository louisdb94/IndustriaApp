import {DefaultModel} from '../../default-model.model';

export class CvsModel extends DefaultModel{
  name: string;
  mimetype: string;
  size: number;
  number: number;
  customName: string;
  student_fk: number;
}

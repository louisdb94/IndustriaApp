import {DefaultModel} from '../../default-model.model';

export class LanguageModel extends DefaultModel{
  type: string;
  value: number;
  value_type: string;
  student_fk: number;
}

import {DefaultModel} from '../../default-model.model';

export class ParametersModel extends DefaultModel{
  parameter: string;
  value: string;
  role: string;
  user_fk: number;

}

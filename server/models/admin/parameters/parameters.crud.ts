import {DefaultCrud} from '../../default-crud.crud';
import {ParametersModel} from './parameters.model';

export class ParametersCrud extends DefaultCrud<ParametersModel>{

  constructor(){
    super("parameters");
  }

  parseObject(input: any): ParametersModel {
    const _newParameters = new ParametersModel();

    _newParameters.id = input.id;
    _newParameters.parameter = input.parameter;
    _newParameters.value = input.value;
    _newParameters.role = input.role;
    _newParameters.user_fk = input.user_fk;

    return _newParameters;
  }
}

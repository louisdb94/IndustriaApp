import {DefaultCrud} from '../../default-crud.crud';
import {VacaturesModel} from './vacatures.model';

export class VacaturesCrud extends DefaultCrud<VacaturesModel>{

  constructor(){
    super("vacatures");
  }

  parseObject(input: any): VacaturesModel {
    const _newVacature = new VacaturesModel();

    _newVacature.id = input.id;
    _newVacature.name = input.name;
    _newVacature.type = input.type;
    _newVacature.about = input.about;
    _newVacature.company_fk = input.company_fk;

    return _newVacature;
  }
}

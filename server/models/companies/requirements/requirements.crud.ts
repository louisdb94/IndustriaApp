import {DefaultCrud} from '../../default-crud.crud';
import {RequirementsModel} from './requirements.model';

export class RequirementsCrud extends DefaultCrud<RequirementsModel>{

  constructor(){
    super("requirements");
  }

  parseObject(input: any): RequirementsModel {
    const _newRequirement = new RequirementsModel();

    _newRequirement.id = input.id;
    _newRequirement.name = input.name;
    _newRequirement.vacatures_fk = input.vacatures_fk;

    return _newRequirement;
  }

}

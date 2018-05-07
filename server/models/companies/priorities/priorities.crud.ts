import {DefaultCrud} from '../../default-crud.crud';
import {PrioritiesModel} from './priorities.model';

export class PrioritiesCrud extends DefaultCrud<PrioritiesModel>{

  constructor(){
    super("priorities_company");
  }

  parseObject(input: any): PrioritiesModel {
    const _newPriority = new PrioritiesModel();

    _newPriority.id = input.id;
    _newPriority.name = input.name;
    _newPriority.profile_page = input.profile_page;
    _newPriority.student_profile = input.student_profile;
    _newPriority.job_openings = input.job_openings;
    _newPriority.size = input.size;
    _newPriority.company_fk = input.company_fk;

    return _newPriority;
  }

}

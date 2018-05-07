import {DefaultModel} from '../../default-model.model';

export class PrioritiesModel extends DefaultModel{
  name: string;
  profile_page: boolean;
  student_profile: boolean;
  job_openings: boolean;
  size: string;
  company_fk: number;

}

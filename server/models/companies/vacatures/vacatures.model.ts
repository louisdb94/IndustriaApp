import {DefaultModel} from '../../default-model.model';

export class VacaturesModel extends DefaultModel{
  name: string;
  type: string;
  about: string;
  company_fk: number;
}

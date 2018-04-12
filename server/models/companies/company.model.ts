import {DefaultModel} from '../default-model.model';

export class CompanyModel extends DefaultModel{
  name: string;
  url: string;
  email: string;
  feature1: string;
  feature2: string;
  feature3: string;
  whoami: string;
  image: boolean;
  priority: string;
  user_fk: number;

}

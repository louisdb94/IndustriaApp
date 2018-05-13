import {DefaultModel} from '../../default-model.model';

export class Admin_companycontactModel extends DefaultModel{
  name: string;
  email: string;
  phone: number;
  address: string;
  company_fk: number;

}

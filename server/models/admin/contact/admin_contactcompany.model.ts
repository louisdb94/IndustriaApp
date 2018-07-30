import {DefaultModel} from '../../default-model.model';

export class Admin_companycontactModel extends DefaultModel{
  name: string;
  contact: string;
  emailContact: string;
  hr: string;
  emailHR: string;
  phone: number;
  address: string;
  company_fk: number;

}

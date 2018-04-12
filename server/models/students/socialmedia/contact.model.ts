import {DefaultModel} from '../../default-model.model';

export class ContactModel extends DefaultModel{
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  company_fk: number;
}

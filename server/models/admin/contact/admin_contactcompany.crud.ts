import {DefaultCrud} from '../../default-crud.crud';
import {Admin_companycontactModel} from './admin_contactcompany.model';

export class Admin_companycontactCrud extends DefaultCrud<Admin_companycontactModel>{

  constructor(){
    super("admin_companycontact");
  }

  parseObject(input: any): Admin_companycontactModel {
    const _newAdminContact = new Admin_companycontactModel();

    _newAdminContact.id = input.id;
    _newAdminContact.name = input.name;
    _newAdminContact.email = input.email;
    _newAdminContact.phone = input.phone;
    _newAdminContact.address = input.address;
    _newAdminContact.company_fk = input.company_fk;

    return _newAdminContact;
  }
}

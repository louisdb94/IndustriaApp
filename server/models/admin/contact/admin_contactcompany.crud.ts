import {DefaultCrud} from '../../default-crud.crud';
import {AdminContactCompanyModel} from './admin_contactcompany.model';

export class AdminContactCompanyCrud extends DefaultCrud<AdminContactCompanyModel>{

  constructor(){
    super("admin_companycontact");
  }

  parseObject(input: any): AdminContactCompanyModel {
    const _newAdminContact = new AdminContactCompanyModel();

    _newAdminContact.id = input.id;
    _newAdminContact.name = input.name;
    _newAdminContact.email = input.email;
    _newAdminContact.phone = input.phone;
    _newAdminContact.address = input.address;
    _newAdminContact.company_fk = input.company_fk;

    return _newAdminContact;
  }
}

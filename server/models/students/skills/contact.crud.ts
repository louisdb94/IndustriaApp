import {DefaultCrud} from '../../default-crud.crud';
import {ContactModel} from './contact.model';

export class ContactCrud extends DefaultCrud<ContactModel>{

  constructor(){
    super("contact_company");
  }

  parseObject(input: any): ContactModel {
    const _newContact = new ContactModel();

    _newContact.id = input.id;
    _newContact.email = input.email;
    _newContact.phone = input.phone;
    _newContact.address = input.address;
    _newContact.latitude = input.latitude;
    _newContact.longitude = input.longitude;
    _newContact.company_fk = input.company_fk;

    return _newContact;
  }

}

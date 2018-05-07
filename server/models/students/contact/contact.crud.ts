import {DefaultCrud} from '../../default-crud.crud';
import {StudentContactModel} from './contact.model';

export class StudentContactCrud extends DefaultCrud<StudentContactModel>{

  constructor(){
    super("contact");
  }

  parseObject(input: any): StudentContactModel {
    const _newContact = new StudentContactModel();

    _newContact.id = input.id;
    _newContact.email = input.email;
    _newContact.phone = input.phone;
    _newContact.county = input.county;
    _newContact.city = input.city;
    _newContact.student_fk = input.student_fk;

    return _newContact;
  }

}

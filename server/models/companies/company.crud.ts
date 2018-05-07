import {DefaultCrud} from '../default-crud.crud';
import {CompanyModel} from './company.model';

export class CompanyCrud extends DefaultCrud<CompanyModel>{

  constructor(){
    super("companies");
  }

  parseObject(input: any): CompanyModel {
    const _newCompany = new CompanyModel();

    _newCompany.id = input.id;
    _newCompany.name = input.name;
    _newCompany.url = input.url;
    _newCompany.email = input.email;
    _newCompany.feature1 = input.feature1;
    _newCompany.feature2 = input.feature2;
    _newCompany.feature3 = input.feature3;
    _newCompany.whoami = input.whoami;
    _newCompany.image = input.imag;
    _newCompany.priority = input.priority;
    _newCompany.user_fk = input.user_fk;

    return _newCompany;
  }
}

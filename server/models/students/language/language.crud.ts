import {DefaultCrud} from '../../default-crud.crud';
import {LanguageModel} from './language.model';

export class LanguageCrud extends DefaultCrud<LanguageModel>{

  constructor(){
    super("language");
  }

  parseObject(input: any): LanguageModel {
    const _newLanguage = new LanguageModel();

    _newLanguage.id = input.id;
    _newLanguage.type = input.type;
    _newLanguage.value = input.value;
    _newLanguage.value_type = input.value_type;
    _newLanguage.student_fk = input.student_fk;

    return _newLanguage;
  }

}

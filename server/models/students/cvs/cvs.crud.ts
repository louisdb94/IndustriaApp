import {DefaultCrud} from '../../default-crud.crud';
import {CvsModel} from './cvs.model';

export class CvsCrud extends DefaultCrud<CvsModel>{

  constructor(){
    super("cvs");
  }

  parseObject(input: any): CvsModel {
    const _newCvs = new CvsModel();

    _newCvs.id = input.id;
    _newCvs.name = input.name;
    _newCvs.mimetype = input.mimetype;
    _newCvs.size = input.size;
    _newCvs.number = input.number;
    _newCvs.customName = input.customName;
    _newCvs.student_fk = input.student_fk;

    return _newCvs;
  }

}

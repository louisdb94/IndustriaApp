import {DefaultCrud} from '../../default-crud.crud';
import {PrivacyLogModel} from './privacylog.model';

export class PrivacyLogCrud extends DefaultCrud<PrivacyLogModel>{

  constructor(){
    super("privacylog");
  }

  parseObject(input: any): PrivacyLogModel {
    const _newPrivacyLog = new PrivacyLogModel();

    _newPrivacyLog.id = input.id;
    _newPrivacyLog.student_fk = input.student_fk;
    _newPrivacyLog.cvCheck = input.cvCheck;
    _newPrivacyLog.contactCheck = input.contactCheck;
    _newPrivacyLog.timestamp_cv = input.timestamp_cv;
    _newPrivacyLog.timestamp_contact = input.timestamp_contact;

    return _newPrivacyLog;
  }

}

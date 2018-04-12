import {DefaultCrud} from '../../default-crud.crud';
import {SocialMediaModel} from './socialmedia.model';

export class SocialMediaCrud extends DefaultCrud<SocialMediaModel>{

  constructor(){
    super("socialmedia");
  }

  parseObject(input: any): SocialMediaModel {
    const _newSocialMedia = new SocialMediaModel();

    _newSocialMedia.id = input.id;
    _newSocialMedia.type = input.type;
    _newSocialMedia.url = input.url;
    _newSocialMedia.checked = input.checked;
    _newSocialMedia.student_fk = input.student_fk;

    return _newSocialMedia;
  }

}

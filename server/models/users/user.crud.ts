import {DefaultCrud} from '../default-crud.crud';
import {UserModel} from './user.model';

export class UserCrud extends DefaultCrud<UserModel>{

  constructor(){
    super("user");
  }

}

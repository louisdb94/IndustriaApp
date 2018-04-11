import { DefaultCrud } from '../default-crud.crud';
import { UserModel } from './user.model';

export class UserCrud extends DefaultCrud<UserModel>{

  constructor() {
    super("user");
  }

  parseObject(input: any): UserModel {
    const _newUser = new UserModel();

    _newUser.id = input.id;
    _newUser.email = input.email;
    _newUser.rnumber = input.rnumber;
    _newUser.password = input.password;
    _newUser.role = input.role;
    _newUser.admin = input.admin;

    return _newUser;
  }
}

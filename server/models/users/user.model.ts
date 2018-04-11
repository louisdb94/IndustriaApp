import {DefaultModel} from '../default-model.model';

export class UserModel extends DefaultModel{
  rnumber: string;
  email: string;
  password: string;
  role: string;
  admin: boolean;

  // public static parseObject(input: string){
  //
  //   const newObject = new UserModel();
  //   newObject.email = input.email;
  //
  //   return newObject;
  // }
}

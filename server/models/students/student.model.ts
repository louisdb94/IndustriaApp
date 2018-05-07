import {DefaultModel} from '../default-model.model';

export class StudentModel extends DefaultModel{
  name: string;
  rnumber: string;
  whoami: string;
  gradYear: number;
  degree: string;
  cvChecked: boolean;
  contactChecked: boolean;
  countSkills: number;
  countProfessional: number;
  countLanguage: number;
  countEducation: number;
  numberCv: number;
  image: boolean;
  alumni: boolean;
  user_fk: number;
}
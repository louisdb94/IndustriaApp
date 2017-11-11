import Student from '../models/student';
import BaseCtrl from './base';

export default class CatCtrl extends BaseCtrl {
  model = Student;


  //first increment number of cvs in StudentModel
  incrementCv = (req, res) => {
    Student.findOneAndUpdate({ _id: req.params.id }, {$inc:{numberCv: 1 }}, (err, obj) => {
      if (err) { return console.error(err); }
    })

  }

  addCv = (req, res) => {
    //insert this cv object_id into student cvs array
    Student.findOne({_id: req.params.id}, (err, obj) => {
      if(err) {return console.log(err);}
      obj.cvs.push[req.params.cv_id]; //insert cv_id into student_model
    })
  }


}

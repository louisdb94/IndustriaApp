import Cv from '../models/cv';
import Student from '../models/student';
import BaseCtrl from './base';

export default class CvCtrl extends BaseCtrl {
  model = Cv;


  uploadCv = (req, res) => {

    let rnumber = '';
    for(let i = 0; i< req.body.students.length; i++){
      rnumber += req.body.students[i];
    }

    let id = '';
    for(let i = 0; i< req.body.id.length; i++){
      id += req.body.id[i];
    }


    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    let newCv = (<any>req.files).files;
    let type = newCv.mimetype.split('/')[1]

    let i = 0;
    let numberCv;
    if(i == 0){
console.log("TEST1")

    //first increment number of cvs in StudentModel
    Student.findOneAndUpdate({ _id: id }, {$inc:{numberCv: 1 }}, (err, obj) => {
      if (err) { return console.error(err); }
      numberCv = obj.numberCv;
      console.log("numberCV", numberCv)
    })
    i++;
    }

console.log("TEST2")
    //get the number of cvs from this studentModel and assign to variable

    // Student.findOne({_id: id}, (err, obj) => {
    //   if (err) { return console.error(err); }
    //   numberCv = obj.numberCv;
    // })
let new_cv_id;
if(i == 1){
console.log("NumberCvasdfasdf", numberCv)
console.log("TEST3")
    //insert new cv in Cv model
    let new_cv = new this.model({name: rnumber, mimetype: type, size: 0, uploader: id, number: numberCv});
    new_cv.save(function(err, new_cv){
      if(err){return console.error(err)}
      else{console.log("new cv uploaded in Cv_model")}
    })
    new_cv_id = new_cv._id;
    i++;
console.log("New CV", new_cv)
console.log("NEWWWW CV", new_cv._id)
}

console.log("TEST4")
    //find the id of this newCv
    // let cvId ;
    // Cv.findOne({name: rnumber, mimetype: type, uploader: id, number: numberCv}, (err, obj) => {
    //   if (err) { return console.error(err); }
    //     cvId = obj._id;
    // })

if(i ==2) {
console.log("TEST5")
    //insert this cv object_id into student cvs array
    Student.findOne({_id: id}, (err, obj) => {
      if(err) {return console.log(err);}
      obj.cvs.push[new_cv_id];
    })
    i++;
}

if(i ==3){
console.log("TEST6")
    newCv.mv('./uploads/images/'+ rnumber + '(' + numberCv +')'+ "." +type ,function(err) {
     if (err)
       return res.status(500).send(err);

      //  Student.findOneAndUpdate({ _id: id }, {$set:{cv: {name: rnumber, mimetype: type}}},{upsert:true}, (err) => {
      //  if (err) { return console.error(err); }
      //  console.log("cv geupload");
     });


     res.status(200).redirect('back');
   };
}
}

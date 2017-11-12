import Cv from '../models/cv';
import Student from '../models/student';
import BaseCtrl from './base';
import * as fs from 'fs';

export default class CvCtrl extends BaseCtrl {
  model = Cv;

  uploadCv = (req, res) => {

    //retrieve all data from formdata
    let rnumber = '';
    for(let i = 0; i< req.body.students.length; i++){
      rnumber += req.body.students[i];
    }
    let id = '';
    for(let i = 0; i< req.body.id.length; i++){
      id += req.body.id[i];
    }
    let cvnumber = req.body.cvnumber;
    console.log("CVNUMBER", cvnumber);

    //check if there is a file in formdata
    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    //add file to server
    let newCv = (<any>req.files).files;
    let type = newCv.mimetype.split('/')[1]
    newCv.mv('./uploads/cvs/'+ rnumber + "(" + cvnumber + ")" + "." +type ,function(err) {
     if (err)
       return res.status(500).send(err);
     });
     res.status(200).redirect('back');

     //increment number of cv in StudentModel
     Student.findOneAndUpdate({ _id: id }, {$inc:{numberCv: 1 }}, (err, obj) => {
       if (err) { return console.error(err); }
     });
   };


   getAllFromStudent = (req, res) => {
     this.model.find({"uploader": req.params.stud_id}, (err, docs) => {
       if (err) { return console.error(err); }
       res.json(docs);
     });
   }

   removeCv = (req, res) => {
     // //decrement number of cv in StudentModel -> NIET WANT ANDERS FOUT BIJ UPLOADEN
     // Student.findOneAndUpdate({ _id: req.body.uploader }, {$inc:{numberCv: -1 }}, (err, obj) => {
     //   if (err) { return console.error(err); }
     // });

     //DELETEN
     fs.unlink('./uploads/cvs/'+ req.body.name + "("+ req.body.number +")" +'.' + req.body.mimetype);


   }

   downloadCv = (req, res) => {


     this.model.findOne({ _id: req.params.cv_id }, (err, obj) => {
       if (err) { return console.error(err); }
       else{
           res.download('./uploads/cvs/'+obj.name + '(' + obj.number +')' + '.' + obj.mimetype, function(err){
             if(err){
               console.log(err);
             } else {
               console.log("In de functie res.download");
             }
           });
         }
     });



   }

}

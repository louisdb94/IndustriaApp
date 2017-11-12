import Image from '../models/image';
import Student from '../models/student';
import BaseCtrl from './base';
import * as fs from 'fs';

export default class ImageCtrl extends BaseCtrl {
  model = Image;

  upload = (req, res) => {

    //retrieve all data from formdata
    let rnumber = '';
    for(let i = 0; i< req.body.students.length; i++){
      rnumber += req.body.students[i];
    }
    let id = '';
    for(let i = 0; i< req.body.id.length; i++){
      id += req.body.id[i];
    }

    //check if there is a file in formdata
    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    //add file to server
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv('./uploads/images/'+ rnumber + '.jpeg' ,function(err) {
     if (err)
       return res.status(500).send(err);
     });
     res.status(200).redirect('back');

     Student.findOne({_id: id}, (err, obj) => {
       if(err) { return console.error(err);}
       else{
         obj.image = true;
       }
     });
   };




   getAllFromStudent = (req, res) => {
     this.model.find({"uploader": req.params.stud_id}, (err, docs) => {
       if (err) { return console.error(err); }
       res.json(docs);
     });
   }

   remove = (req, res) => {
     //DELETEN
     fs.unlink('./uploads/images/'+ req.body.name +'.' + req.body.mimetype);

   }

   download = (req, res) => {

     Student.findOne({ _id: req.params.id }, (err, obj) => {
       if (err) { return console.error(err); }
       else{
           if(obj.image){
             fs.readFile('./uploads/images/' + obj.rnumber + '.jpeg', 'base64', function(err, data){
               if(err){console.log(err);}
               res.setHeader('Content-Disposition', 'attachment');
               res.send(data)
             })
           }
           else{
             fs.readFile('./uploads/images/standard.jpeg', 'base64', function(err, data){
               if(err){console.log(err);}
               res.setHeader('Content-Disposition', 'attachment');
               res.send(data)
             })
           }
         }
     });







  }

}

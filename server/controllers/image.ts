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
    newImage.mv('./uploads/images/'+ rnumber + "." +type ,function(err) {
     if (err)
       return res.status(500).send(err);
     });
     res.status(200).redirect('back');
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


        // fs.readFile('./uploads/images/r0222222.jpeg', function(err, data){
        //   if(err){console.log(err);}
        //   console.log(data);
        // })

        res.setHeader('Content-disposition', 'attachment; filename=r0222222.jpeg');
        res.setHeader('Content-Type', 'application/image');
        res.download('./uploads/images/r0222222.jpeg', 'r0222222.jpeg', function(err){
          if(err){console.log(err)}

        })



  }

}

import Image from '../models/image';
import Student from '../models/student';
import BaseCtrl from './base';
import * as fs from 'fs';
import {db} from '../app';

export default class ImageCtrl extends BaseCtrl {
  model = Image;

  upload = (req, res) => {

    console.log("this is rnumber: ", req.body.students);
    console.log("this is id: ", req.body.id);
    console.log("this is files: ", req.files);

    //check if there is a file in formdata
    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    //add file to server
    let rnumber = req.body.students;
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv('./uploads/images/'+ rnumber + '.jpeg' ,function(err) {
     if (err){return res.status(500).send(err);}
     else{res.status(200).redirect('back');}
     });

     let sql = `UPDATE students SET image = '1' WHERE id = '${req.body.id}'`;
     let query = db.query(sql, (err, obj) => {
       if (err) { return console.error(err); }
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

  //  download = (req, res) => {

  //   fs.readFile('./uploads/images/standard.jpeg', 'base64', function(err, data){
  //     if(err){console.log(err);}
  //     res.setHeader('Content-Disposition', 'attachment');
  //     res.send(data)
  //   })

    //  Student.findOne({ _id: req.params.id }, (err, obj) => {
    //    if (err) { return console.error(err); }
    //    else{
    //        if(obj.image){
    //          fs.readFile('./uploads/images/' + obj.rnumber + '.jpeg', 'base64', function(err, data){
    //            if(err){console.log(err);}
    //            res.setHeader('Content-Disposition', 'attachment');
    //            res.send(data)
    //          })
    //        }
    //        else{
    //          fs.readFile('./uploads/images/standard.jpeg', 'base64', function(err, data){
    //            if(err){console.log(err);}
    //            res.setHeader('Content-Disposition', 'attachment');
    //            res.send(data)
    //          })
    //        }
    //      }
    //  });
  //}

     // Select single post
     download =  (req, res) => {
         let sql = `SELECT * FROM students WHERE id = '${req.params.id}'`;
         let query = db.query(sql, (err, obj) => {
          if (err) { return console.error(err); }
          else{
            console.log("obj.image: ", obj[0].image);

            if(obj[0].image == 1){
                fs.readFile('./uploads/images/' + obj[0].rnumber + '.jpeg', 'base64', function(err, data){
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
     };
}

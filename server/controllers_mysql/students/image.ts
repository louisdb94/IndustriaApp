import {db} from '../../app';
import * as  mysql from 'mysql';
import BaseSqlCtrl from '../baseSql';
import * as fs from 'fs';

export default class ImageCtrl extends BaseSqlCtrl {
  
  model = 'image';
  dummy = null;

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
    newImage.mv('./uploads/images/'+ rnumber + '.jpg' ,function(err) {
     if (err){return res.status(500).send(err);}
     else{res.status(200).redirect('back');}
     });

     let sql = `UPDATE students SET image = '1' WHERE id = '${req.body.id}'`;
     let query = db.query(sql, (err, obj) => {
       if (err) { return console.error(err); }
     });
   };

   uploadCompany = (req, res) => {
    //check if there is a file in formdata
    if (!(<any>req.files).files)
      return res.status(400).send('No files were uploaded.');

    //add file to server
    let name = req.body.name;
    let newImage = (<any>req.files).files;
    let type = newImage.mimetype.split('/')[1]
    newImage.mv('./uploads/images/'+ name + '.png' ,function(err) {
     if (err){return res.status(500).send(err);}
     else{res.status(200).redirect('back');}
     });

     let sql = `UPDATE companies SET image = '1' WHERE id = '${req.body.id}'`;
     let query = db.query(sql, (err, obj) => {
       if (err) { return console.error(err); }
     });
   };


   remove = (req, res) => {
     //DELETEN
     fs.unlink('./uploads/images/'+ req.body.name +'.' + req.body.mimetype);

   }

     // Select single post
     download =  (req, res) => {
         let sql = `SELECT * FROM students WHERE id = '${req.params.id}'`;
         let query = db.query(sql, (err, obj) => {
          if (err) { return console.error(err); }
          else{
            console.log("obj.image: ", obj[0].image);

            if(obj[0].image == 1){
                fs.readFile('./uploads/images/' + obj[0].rnumber + '.jpg', 'base64', function(err, data){
                  if(err){console.log(err);}
                  res.setHeader('Content-Disposition', 'attachment');
                  res.send(data)
                })
              }
              else{
                fs.readFile('./uploads/images/standard.jpg', 'base64', function(err, data){
                  if(err){console.log(err);}
                  res.setHeader('Content-Disposition', 'attachment');
                  res.send(data)
                })
              }
          }
         });
     };
}

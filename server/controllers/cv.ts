import Cv from '../models/cv';
import Student from '../models/student';
import BaseCtrl from './base';

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
    newCv.mv('./uploads/images/'+ rnumber + "(" + cvnumber + ")" + "." +type ,function(err) {
     if (err)
       return res.status(500).send(err);
     });
     res.status(200).redirect('back');

     //increment number of cv in StudentModel
     Student.findOneAndUpdate({ _id: id }, {$inc:{numberCv: 1 }}, (err, obj) => {
       if (err) { return console.error(err); }
     });
   };

}

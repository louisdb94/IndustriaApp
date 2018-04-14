import { pool } from '../../app';
import * as  mysql from 'mysql';
import * as fs from 'fs';
import { DefaultController} from '../default.controller';

export class CvsController extends DefaultController {
  model = 'cvs';

  deleteCv = (req,res) => {
    var crud_controller = this.model + "Crud";
    this[crud_controller].delete(this.model, 'id', req.params.id).then(result => {
      const root = process.cwd();

      if(req.body.name){
        fs.unlink(root + '/uploads/cvs/' + req.body.name + "(" + req.body.number + ")" + '.' + req.body.mimetype);
      }
      res.status(200).json(result);
    });
  }

  uploadCv = (req, res) => {
    const root = process.cwd();

    //retrieve all data from formdata
    let rnumber = req.body.rnumber;
    let id = req.body.id;
    let cvnumber = req.body.numberCv;

    //check if there is a file in formdata
    if (!(<any>req.files).files) {
      return res.status(400).send('No files were uploaded.');
    }

    //add file to server
    let newCv = (<any>req.files).files;
    let type = newCv.mimetype.split('/')[1]
    newCv.mv(root + '/uploads/cvs/' + rnumber + "(" + cvnumber + ")" + "." + type, function (err) {
      if (err)
        return res.status(500).send(err);
    });
    res.status(200).redirect('back');

    this.updateTable(req, res, 'students', 'id', req.body.id);
  }

  downloadCv = (req, res) => {
    const root = process.cwd();
    var crud_controller = this.model + "Crud";
    this[crud_controller].getBy(this.model, 'id', req.params.id).then(result => {
      res.download(root + '/uploads/cvs/' + result[0].name + '(' + result[0].number + ')' + '.' + result[0].mimetype, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    });
  }
}

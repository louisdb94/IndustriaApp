import { Component, ViewChild, OnInit, enableProdMode } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModelGroup, NgForm } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import { Location } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import {formData} from 'form-data';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

enableProdMode();
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'profile-header',  // <home></home>
  styleUrls: ['./profile-header.component.scss'],
  templateUrl: './profile-header.component.html'
})
export class HeaderProfile {

  files: File[];
  data: any;
  student = {};
  rnumber = String;
  id = String;
  numberCv = Number;
  cropperSettings: CropperSettings;
  image1: String;
  image2: String;
  image3: String;
  cvs = [];

  addCvForm: FormGroup;

  editMode = false;
  cropDone = false;
  editCV = false;
  name = 'Elon Musk';
  major = 'ICT';
  catchPhrase = 'I am an enthousiastic and young Industrial Engineer looking for a job in UI design.';
  height: number | string = '100px';

  constructor(  private studentService: StudentService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                private sanitizer: DomSanitizer,
                private formBuilder: FormBuilder,){

                    this.cropperSettings = new CropperSettings();
                    this.cropperSettings.width = 100;
                    this.cropperSettings.height = 100;
                    this.cropperSettings.croppedWidth = 300;
                    this.cropperSettings.croppedHeight = 300;
                    this.cropperSettings.canvasWidth = 400;
                    this.cropperSettings.canvasHeight = 300;
                    this.cropperSettings.noFileInput = false;

                    this.data = {};
                }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.getStudentById(id);
      this.getCvFromStudent(id);

      this.image1 = "../../../uploads/images/";
      this.image3 = ".jpg";

      this.files = [];



    });
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(
      data => {this.student = data, this.rnumber = data.rnumber, this.id = data._id,
                this.numberCv = data.numberCv},
      error => console.log(error)
    );
  }

  save(student) {
    this.editMode = false;
    this.cropDone = true;

    this.studentService.editStudent(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  myUploader(event) {


    let files: File[] = event.files;

    let formData: FormData = new FormData();
    for(let i = 0; i<files.length;i++){
         formData.append('files', files[i], files[i].name);
    }
    formData.append('cvnumber', (<any>this.numberCv))
    let rnumber = this.rnumber;
    for(let i = 0; i<rnumber.length;i++){
         formData.append('students', rnumber[i]);
    }

    let id = this.id;
    for(let i = 0; i<id.length;i++){
         formData.append('id', id[i]);
    }

    for(let i = 0; i < files.length; i++) {
        let file = (<any>files[i]);

        if(!this.isFileSelected(file)){
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
          this.files.push(file);
        }

        this.addCvForm = this.formBuilder.group({
          name: rnumber,
          uploader: id,
          mimetype: file.type.split('/')[1],
          number: this.numberCv
        });

        if(this.hasFiles()) {
          this.http.post('/api/upload', formData, {}).subscribe(res => console.log('gelukt', res));
        }
    }
    console.log("number before incrmeent", this.numberCv);
    (<any>this.numberCv) ++;
    console.log("number after incrmeent", this.numberCv);

    this.studentService.addcv(this.addCvForm.value).subscribe(
      res => {
        const newCv = res.json();
        this.cvs.push(newCv);
      }
    );


  }

  isFileSelected(file: File): boolean{
        for(let sFile of this.files){
            if((sFile.name + sFile.type + sFile.size) === (file.name + file.type+file.size)) {
                return true;
            }
        }
        return false;
  }
  hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

downloadCv(cv_id){
  console.log("KEEKEKE", cv_id);
  this.studentService.download(cv_id).subscribe();
//  this.http.get(`/api/download/${cv_id}`).subscribe();

}

removeCv(cv){
  this.studentService.removeCv(cv).subscribe(
    res => {
      const pos = this.cvs.map(elem => elem._id).indexOf(cv._id);
      this.cvs.splice(pos, 1);
      this.toast.setMessage('item deleted successfully.', 'success');
    },
    error => console.log(error)
  );



  const cvs: any = {};
  cvs.name = cv.name;
  cvs.number = cv.number;
  cvs.uploader = cv.uploader;
  cvs.mimetype = cv.mimetype;

  this.http.post(`/api/cv/remove/${cv._id}`, cvs).subscribe();

}

getCvFromStudent(id){
  this.studentService.getCvFromStudent(id).subscribe(
    data => {this.cvs = data},
    error => console.log(error)
  )
}

}

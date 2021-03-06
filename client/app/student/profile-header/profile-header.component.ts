import { Component, ViewChild, OnInit, enableProdMode, Input} from '@angular/core';
import { StudentService } from '../../services/student.service';
import { SocialmediaService } from '../../services/socialmedia.service';
import { FileService } from '../../services/file.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModelGroup, NgForm } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Location } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {formData} from 'form-data';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PrivacylogService } from '../../services/admin/privacylog.service';

enableProdMode();
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

// review Tom -> components should end with Component so HeaderProfile ===> HeaderProfileComponent
@Component({
  selector: 'profile-header',  // <home></home>
  styleUrls: ['./profile-header.component.scss'],
  templateUrl: './profile-header.component.html'
})
export class HeaderProfile implements OnInit { 
  // --> review Tom: added OnInit interface
  files: File[];
  data: any;
  id: String;
  rnumber = String;
  numberCv = Number;

  socialmedia = [];
  // review Tom: bad pratice -> you must type this student object..
  @Input() student: any;
  // review Tom: bad pratice -> you must type this cv object..
  cv= <any>{};
  cvs= [];
  student_id = 0;
  marked = false;
  cropperSettings: CropperSettings;
  addCvForm: FormGroup;
  addImageForm: FormGroup;
  editMode = false;
  cropDone = false;
  editCV = false;
  height: number | string = '100px';

  im = 'data:image/JPEG;base64,';
  privacylog = { student_fk: '', cvCheck: '', contactCheck: '', timestamp_cv: '' , timestamp_contact: ''};

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(  private studentService: StudentService,
                private fileService: FileService,
                private socialmediaService: SocialmediaService,
                private privacylogService: PrivacylogService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private http: HttpClient,
                public sanitizer: DomSanitizer,
                private formBuilder: FormBuilder,
                public auth: AuthService) {

                    this.cropperSettings = new CropperSettings();
                    this.cropperSettings.width = 200;
                    this.cropperSettings.height = 200;
                    this.cropperSettings.croppedWidth = 300;
                    this.cropperSettings.croppedHeight = 300;
                    this.cropperSettings.canvasWidth = 400;
                    this.cropperSettings.canvasHeight = 300;
                    this.cropperSettings.noFileInput = true;

                    this.data = {};
                }
  // tom review: if you use ngOnInit you need to implement OnInit interface!                
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.student_id = params['id'];
      this.getCvFromStudent(this.student_id);
      this.downloadImage(this.student_id);
      this.getSocialMediaById(this.student_id);
      this.files = [];
    });
  }

  getSocialMediaById(id){
    this.socialmediaService.getSocialmediaById(id).subscribe(
          data => {this.socialmedia = data},
      error => console.log(error)
    );

  }

  save(student, socialmedia){

    this.editMode = false;
    this.cropDone = true;

    this.studentService.editStudentMysql(student).subscribe(
      res => {
        this.student = student;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );

    for(let i = 0; i < 4; i++){
      if(this.socialmedia[i] != null){
        this.socialmediaService.editSocialmediaMysql(this.socialmedia[i]).subscribe(
          res => {},
          error => console.log(error)
        );
      }
    }
  }

  fileChangeListener($event, student) {

      //Upload image to server
      var file:File = $event.target.files[0];
      if(file.size < 2550594){
        let formData: FormData = new FormData();
        formData.append('files', file, file.name);

        formData.append('students', student.rnumber);

        formData.append('id', student.id);

        let random = formData.get('students');

        if(file) {
          this.fileService.uploadImage(formData).subscribe(
            res => console.log('gelukt', res));
        }
      }
      else{
        alert('File is too large (< 2.5mb)');
      }
  }

  add(){
    window.location.reload();
  }

  myUploader(event, student) {

    let files: File[] = event.files;

    let formData: FormData = new FormData();
    for(let i = 0; i<files.length;i++){
         formData.append('files', files[i], files[i].name);
    }

    formData.append('rnumber', student.rnumber);
    formData.append('id', student.id);

    for(let i = 0; i < files.length; i++) {
        let file = (<any>files[i]);

        if(!this.isFileSelected(file)){
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
          this.files.push(file);
        }

        if(this.hasFiles()) {
          student.numberCv++;
          formData.append('cvnumber', (<any>student.numberCv));
          this.http.post('/api/cv/upload', formData).subscribe(res => console.log('gelukt', res));

          this.addCvForm = this.formBuilder.group({
            name: student.rnumber,
            uploader: student.id,
            mimetype: file.type.split('/')[1],
            size: file.size,
            number: student.numberCv
          });

          this.fileService.addCv(this.addCvForm.value).subscribe(
            res => {
              const newCv = res.json();
              this.cvs.push(newCv);
            }
          );
        }
    }
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


  downloadCv(cv){
    window.open('/api/download/' + cv.id)
  }


  downloadImage(id){
    this.fileService.downloadImage(id).subscribe(
      data => {this.im += data._body},
      error => console.log(error)
    );

  }

  removeCv(cv){
    this.fileService.removeCv(cv).subscribe(
      res => {
        const pos = this.cvs.map(elem => elem.id).indexOf(cv.id);
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

    this.http.post(`/api/cv/remove/${cv.id}`, cvs).subscribe();

  }

  getCvFromStudent(id){
    this.fileService.getCvFromStudent(id).subscribe(
      data => {this.cvs = data},
      error => console.log(error)
    )
  }

  changeChecked(e, student){
    this.privacylog.student_fk = student.id;
    this.privacylog.timestamp_cv = JSON.parse(JSON.stringify(new Date(Date.now())));
    if(e.target.checked){
      student.cvChecked = 1;
    }
    else{
      student.cvChecked = 0;
    }
    this.privacylog.contactCheck = student.contactChecked;
    this.privacylog.cvCheck = student.cvChecked;
    this.http.post('/api/privacylog-insert', this.privacylog).subscribe();
    this.save(student, null);
  }

  changeSocialMediaChecked(e, student, socialmedia, i){
    if(e.target.checked){
      socialmedia[i].checked = 1;
    }
    else{
      socialmedia[i].checked = 0;
    }

    this.save(student, socialmedia);
  }
}

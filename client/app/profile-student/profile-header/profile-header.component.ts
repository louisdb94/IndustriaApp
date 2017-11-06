import { Component, ViewChild, OnInit, enableProdMode } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormsModule, ReactiveFormsModule,NgModelGroup, NgForm } from '@angular/forms';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import {Location} from '@angular/common';

import {FileUploadModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';



enableProdMode();
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'profile-header',  // <home></home>
  styleUrls: [ './profile-header.component.scss' ],
  templateUrl: './profile-header.component.html'
})
export class HeaderProfile {


  data: any;
  student= {};
  cropperSettings: CropperSettings;
  image1: String;
  image2: String;
  image3: String;

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent, private http : HttpClient) {

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

      this.image1 = "../../assets/img/";
      this.image2 = "/";
      this.image3 = ".jpg";
    });
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe(
      data => this.student = data,
      error => console.log(error)
    );
  }


  public editMode = false;
  public cropDone = false;
  public editCV = false;
  public name = 'Elon Musk';
  public major = 'ICT';
  public catchPhrase = 'I am an enthousiastic and young Industrial Engineer looking for a job in UI design.';

  save(student){
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

  cvEdit(){
    this.editCV = true;
    this.cropDone = true;
  }

  height : number | string = '100px';


  photoFiles: any[] = [];
  onUpload(event) {
      for(let file of event.files) {
        this.photoFiles.push(file);
      }
      this.http.post('/api/upload', this.student).subscribe();
    }

}

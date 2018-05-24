import { Component, ViewChild, OnInit, enableProdMode, Input } from '@angular/core';
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
import { FileService } from '../../../services/file.service';
import { CompanyService } from '../../../services/company/company.service';
import { AuthService } from '../../../services/auth.service';



enableProdMode();
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'profile-header-company',  // <home></home>
  styleUrls: ['./profile-header.component.scss'],
  templateUrl: './profile-header.component.html'
})
export class CompanyHeaderProfile {

  files: File[];
  data: any;
  id: String;
  rnumber = String;

  https = "https://";

  @Input() company;

  company_id = 0;
  addImageForm: FormGroup;
  editMode = false;
  cropDone = false;
  height: number | string = '100px';

  im = 'data:image/JPEG;base64,';

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;

  constructor(  private activatedRoute: ActivatedRoute,
                private fileService: FileService,
                private http: HttpClient,
                private companyService: CompanyService,
                public sanitizer: DomSanitizer,
                private formBuilder: FormBuilder,
                public auth: AuthService){

                    this.data = {};
                }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.company_id = params['id'];
      this.downloadImage(this.company_id);
    });
  }


  save(company){
    this.editMode = false;
    this.cropDone = true;

    this.companyService.editCompany(company).subscribe(
      res => {
        this.company = company;
      },
      error => console.log(error)
    );
  }

  fileChangeListener($event, company) {

      //Upload image to server
      var file:File = $event.target.files[0];
      if(file.size < 2550594){
        let formData: FormData = new FormData();
        formData.append('files', file, file.name);
        formData.append('name', company.name);
        formData.append('id', company.id);
        formData.append('image', '1');

        if(file) {
          this.fileService.uploadImageCompany(formData).subscribe(
            res => {}
          );}
      }
      else{
        alert('File is too large (< 2.5mb)');
      }
  }

  add(){
    window.location.reload();
  }

  downloadImage(id){
    this.fileService.downloadImageCompany(id).subscribe(
      data => {this.im += data._body},
      error => console.log(error)
    );
  }
}

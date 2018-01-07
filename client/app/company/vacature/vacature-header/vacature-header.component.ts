import { Component, ViewChild, OnInit, enableProdMode, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModelGroup, NgForm } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import { Location } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {formData} from 'form-data';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileService } from '../../../services/file.service';
import { CompanyService } from '../../../services/company/company.service';
import { VacatureService } from '../../../services/company/vacature.service';


enableProdMode();
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'vacature-header',  // <home></home>
  styleUrls: ['./vacature-header.component.scss'],
  templateUrl: './vacature-header.component.html'
})
export class CompanyHeaderVacature {

  files: File[];
  data: any;
  id: String;
  rnumber = String;

  https = "https://";

  @Input() company;
  @Input() vacature;

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
                private vacatureService: VacatureService,
                private sanitizer: DomSanitizer,
                private formBuilder: FormBuilder,){

                    this.data = {};
                }


  ngOnInit() {
      this.downloadImage(this.vacature.company_fk);
  }


  save(company, vacature){
    this.editMode = false;
    this.cropDone = true;

    this.companyService.editCompany(company).subscribe(
      res => {this.company = company, this.saveVacature(vacature)},
      error => console.log(error)
    );
  }

  saveVacature(vacature){
    this.vacatureService.editVacature(vacature).subscribe(
      res => {
        this.vacature = vacature;
      },
      error => console.log(error)
    );
  }

  downloadImage(id){
    this.fileService.downloadImageCompany(id).subscribe(
      data => {this.im += data._body},
      error => console.log(error)
    );
  }
}

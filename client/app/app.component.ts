import { Component, OnInit } from '@angular/core';


// import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
// import { jqxEditorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxeditor';
// import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
// import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
// import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDropDownList';
// import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxDateTimeInput';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { DataTableModule } from "ng2-data-table";
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  messageNav: String;
  test = false;

  constructor(private translate: TranslateService, private data: DataService, public auth: AuthService){
    translate.setDefaultLang('en');
  }

  ngOnInit(){
    this.data.navMessage.subscribe(message => this.messageNav = message);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  logout(){
    this.data.changeMessageId("");
    this.data.changeMessageNav("default message");
    this.auth.loggedIn = false;
    this.auth.logout();
  }
}

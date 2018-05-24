import { Component, OnInit } from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { DataTableModule } from "ng2-data-table";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  messageNav: String;
  test = false;

  constructor(private translate: TranslateService, public auth: AuthService){
    translate.setDefaultLang('en');
  }

  ngOnInit(){
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  logout(){
    this.auth.loggedIn = false;
    this.auth.logout();
  }
}

import { Component, OnInit } from '@angular/core';
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

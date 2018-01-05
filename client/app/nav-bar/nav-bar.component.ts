import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  messageNav: String;
  studentString: String;
  companyString: String;

  constructor(public auth: AuthService, public data: DataService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.studentString = "/profile-student/";
    this.companyString = "/profile-company/";
   }

  switchLanguage(language) {
    this.translate.use(language);
  }

  logout(){
    this.data.changeMessageId("");
    this.data.changeMessageNav("default message");
    this.auth.loggedIn = false;
    this.auth.logout();
  }

}

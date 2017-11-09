import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  

  ngOnInit() {
  }

  constructor(public auth: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en');
   }

  switchLanguage(language) {
    console.log(language);
    this.translate.use(language);
  }

}

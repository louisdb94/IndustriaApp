import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstPageComponent implements OnInit {

  constructor(public auth: AuthService,private appcomponent: AppComponent, private router: Router) {}

  ngOnInit(){
    if(this.auth.currentUser.role == "Company"){
      this.router.navigate(['/home-companies']);
    }
    if(this.auth.currentUser.role == "Student"){
      this.router.navigate(['/home-students']);
    }
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

}

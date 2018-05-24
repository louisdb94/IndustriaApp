import { Component, OnInit } from '@angular/core';
import {MailService} from '../../services/mail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(  private mailService: MailService,
                private router: Router,
                private appcomponent: AppComponent,
                public toast: ToastComponent) { }

  public emailStudent: any;
  public email: any;

  ngOnInit() {
  }

  nodemailer(email){
    this.mailService.nodemailer(email).subscribe(
      res => {this.navigate()},
      error => console.log(error)
    )
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

  navigate(){

      this.router.navigate([''])

  }

}

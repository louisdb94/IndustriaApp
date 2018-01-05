import { Component, OnInit } from '@angular/core';
import {MailService} from '../../services/mail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(  private mailService: MailService,
                private router: Router,
                public toast: ToastComponent) { }

  ngOnInit() {
  }

  nodemailer(email){
    this.mailService.nodemailer(email).subscribe(
      res => {this.navigate()},
      error => console.log("error sending mail")
    )
  }

  navigate(){

      this.router.navigate([''])

  }

}

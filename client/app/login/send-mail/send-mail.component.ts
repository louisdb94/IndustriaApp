import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MailService} from '../../services/mail.service';
import { UserService} from '../../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../../shared/toast/toast.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {

  public pass: any;
  public pass2: any;
  token = String;
  currentUser = { id: '', email: '', rnumber: '', password: ''};
  resetForm: FormGroup;
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);
  password2 = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);

  constructor(  private activatedRoute: ActivatedRoute,
                private mailService: MailService,
                private formBuilder: FormBuilder,
                public toast: ToastComponent,
                private userService: UserService,
                private http: HttpClient,
                private appcomponent: AppComponent,
                private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.decodeToken(this.token);
    });

    this.resetForm = this.formBuilder.group({
      password: this.password,
      password2: this.password2
    });
  }

  decodeToken(token){
    const decodedUser = this.mailService.decodeUserFromToken(token);
    this.setCurrentUser(decodedUser);
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  setCurrentUser(decodedUser) {
    this.currentUser.id = decodedUser[0].id;
    this.currentUser.email = decodedUser[0].email;
    this.currentUser.rnumber = decodedUser[0].rnumber;
    this.currentUser.password = '';
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

  check(){
    if(this.resetForm.value.password == this.resetForm.value.password2){
      this.currentUser.password = this.resetForm.value.password;
      this.http.put('/api/resetpass', this.currentUser).subscribe();
      this.router.navigate(['']);
    }else{
      this.toast.setMessage("please check if passwords are equal.", 'info');
    }
  }
}

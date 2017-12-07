import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { CompanyService } from '../../services/company/company.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
  selector: 'profile-company',  // <home></home>
  styleUrls: [ './profile.component.scss' ],
  templateUrl: './profile.component.html'
})
export class CompanyProfile implements OnInit {

  constructor(  public auth: AuthService,
                public dataService: DataService,
                public companyService: CompanyService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent) {}

  data: any;
  company_id: Number;
  company: {};

  messageId: String;
  messageNav: String;

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.company_id = params['id'];
      this.getCompanyById(this.company_id);
      this.companyService.innerJoin(this.company_id).subscribe(
        data => {console.log("Tis gelukt: ", data)}
      )
    });

    this.dataService.idMessage.subscribe(message => this.messageId = message);
    this.dataService.navMessage.subscribe(message => this.messageNav = message);
  }

  getCompanyById(id){
    console.log("company id: ", id);
    this.companyService.getCompanyById(id).subscribe(
      data => {this.company = data[0]},
      error => console.log("error")
    );
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

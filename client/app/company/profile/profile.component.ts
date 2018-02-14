import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { CompanyService } from '../../services/company/company.service';
import { VacatureService } from '../../services/company/vacature.service';
import { CompanyContactService } from '../../services/company/contact.service';
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
                public companyContactService: CompanyContactService,
                public vacatureService: VacatureService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent) {}

  data: any;
  company_id: Number;
  company: any;
  contacts: any;
  vacatures: any;
  priority: any;

  messageId: String;
  messageNav: String;

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.company_id = params['id'];
      this.getCompanyById(this.company_id);
      this.getVacaturesByCompanyId(this.company_id);
      this.getContactById(this.company_id);
    });
    this.dataService.idMessage.subscribe(message => this.messageId = message);
    this.dataService.navMessage.subscribe(message => this.messageNav = message);
  }

  getCompanyById(id){
    this.companyService.getCompanyById(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.company = result[0];
        this.priority = result[0].priority;
      },
      error => console.log("error")
    );
  }

  getVacaturesByCompanyId(id){
    this.vacatureService.getVacatureByCompanyId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.vacatures = result;
      },
      error => console.log("error")
    );
  }

  getContactById(id){
    this.companyContactService.getContactByCompanyId(id).subscribe(
      data => {
        let result = this.dataService.decryption(data);
        this.contacts = result[0];
      },
      error => console.log(error)
    )
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

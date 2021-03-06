import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { CompanyService } from '../../services/company/company.service';
import { CompanyContactService } from '../../services/company/contact.service';
import { VacatureService } from '../../services/company/vacature.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
  selector: 'vacature-company',  // <home></home>
  styleUrls: [ './vacature.component.scss' ],
  templateUrl: './vacature.component.html'
})
export class CompanyVacature implements OnInit {

  constructor(  public auth: AuthService,
                public dataService: DataService,
                public companyService: CompanyService,
                public companyContactService: CompanyContactService,
                public vacatureService: VacatureService,
                private translate: TranslateService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent) {}

  data: any;
  vacature_id: Number;
  company: any;
  contacts: any;
  vacature: any;
  company_fk: Number;

  messageId: String;
  messageNav: String;


  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.vacature_id = params['id'];
      this.getVacatureById(this.vacature_id);
    });

    this.dataService.idMessage.subscribe(message => this.messageId = message);
    this.dataService.navMessage.subscribe(message => this.messageNav = message);
  }

  getVacatureById(id){
    this.vacatureService.getVacatureById(id).subscribe(
      data => {this.vacature = data[0], this.company_fk = data[0].company_fk, this.getCompanyByVacatureId(data[0].company_fk), this.getContactByCompanyId(data[0].company_fk)},
      error => console.log("error")
    )
  }

  getCompanyByVacatureId(id){
    this.companyService.getCompanyById(id).subscribe(
      data => {this.company = data[0]},
      error => console.log("error")
    );
  }

  getContactByCompanyId(id){
    this.companyContactService.getContactByCompanyId(id).subscribe(
      data => {this.contacts = data[0]},
      error => console.log(error)
    )
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

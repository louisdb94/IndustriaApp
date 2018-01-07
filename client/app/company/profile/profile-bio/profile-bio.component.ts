import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'profile-bio-company',  // <home></home>
  styleUrls: [ './profile-bio.component.scss' ],
  templateUrl: './profile-bio.component.html'
})
export class CompanyBioProfile {
  public editMode = false;
  @Input() company: {};

  constructor(  private companyService: CompanyService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private auth: AuthService) {}

  save(company){
    this.editMode = false;

    this.companyService.editCompany(company).subscribe(
      res => {
        this.company = company;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}

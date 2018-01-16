import { Component, OnInit, Input } from '@angular/core';
import { VacatureService } from '../../../services/company/vacature.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'vacature-about-company',  // <home></home>
  styleUrls: [ './vacature-about.component.scss' ],
  templateUrl: './vacature-about.component.html'
})
export class CompanyAboutVacature {
  public editMode = false;
  @Input() vacature: any;

  constructor(  private vacatureService: VacatureService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                public auth: AuthService) {}

  save(vacature){
    this.editMode = false;

    this.vacatureService.editVacature(vacature).subscribe(
      res => {
        this.vacature = vacature;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}

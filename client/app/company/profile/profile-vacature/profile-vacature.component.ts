import { Component, OnInit, Input, NgZone } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { VacatureService } from '../../../services/company/vacature.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'profile-vacature-company',  // <home></home>
  styleUrls: [ './profile-vacature.component.scss' ],
  templateUrl: './profile-vacature.component.html'
})
export class CompanyVacatureProfile {

  vac1: String;
  vac2: String;
  vac3: String;

  refresh: Subject<any> = new Subject();
  companyVacature = "/vacature-company/";

  public valueInput : number;
  public isUpdated = false;
  public editMode = false;
  public addClicked = false;
  public deleteClicked = false;

  registerForm: FormGroup;
  vac1Form = new FormControl(String);
  vac2Form = new FormControl(String);
  vac3Form = new FormControl(String);
  idForm = new FormControl(String);

  @Input() vacatures;
  @Input() company;

  constructor(  private formBuilder: FormBuilder,
                private zone:NgZone,
                private vacatureService: VacatureService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                public auth: AuthService){}


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      vac1Form: this.vac1Form,
      vac2Form: this.vac2Form,
      vac3Form: this.vac3Form,
      idForm: this.idForm,
    });

    this.changeVacature(this.vacatures, null, null, null, null);
  }

  changeVacature(vacatures, vac1, vac2, vac3, vacature){
    this.vacatures = vacatures;
    if(this.addClicked == true && vac1 != null && vac2 != null && vac3 != null){
      let i = this.vacatures.length;
      let temp = {name: null, type: null, about: null};
      this.vacatures.push(temp);
      if(this.vacatures[i]){
        this.vacatures[i].name = this.vac1;
        this.vacatures[i].type = this.vac2;
        this.vacatures[i].about = this.vac3;
        console.log(this.vacatures);
      }
    }

    if(this.deleteClicked){
      let i = vacature.id;
      for(let x = 0; x < this.vacatures.length; x++){
        if(this.vacatures[x].id == vacature.id){
          this.vacatures.splice(x,1);
          console.log(this.vacatures);
        }
      }
    }
    this.addClicked = false;
    this.deleteClicked = false;
  }

  save(vacatures, vac1, vac2, vac3, vacature){

    console.log("vac1", vac1);
    console.log("vac2", vac2);
    console.log("vac3", vac3);

    this.registerForm.value.vac1Form = vac1;
    this.registerForm.value.vac2Form = vac2;
    this.registerForm.value.vac3Form = vac3;
    this.registerForm.value.idForm = this.company.id;

    if(this.addClicked && vac1 != null && vac2 != null && vac3 != null){
      this.vacatureService.addVacatureForm(this.registerForm.value).subscribe(
        res => {this.changeVacature(vacatures, vac1, vac2, vac3, vacature) }
      );
    }

    if(!this.deleteClicked){
      this.editMode = false;
    }
  }

  edit(){
    this.editMode = true;
  }

  deleteVacature(vacatures, vacature){
    this.deleteClicked = true;
    console.log(vacature.id);
    this.vacatureService.deleteVacature(vacature.id).subscribe(
      res => {this.changeVacature(vacatures, null, null, null, vacature)},
      error => console.log(error)
    );
  }
}

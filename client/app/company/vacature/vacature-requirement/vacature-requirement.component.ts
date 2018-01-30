import { Component, OnInit, Inject, Input } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { checkAndUpdateNode } from '@angular/core/src/view/view';
import {CompanyRequirementService} from '../../../services/company/requirement.service';
import { VacatureService } from '../../../services/company/vacature.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'vacature-requirement-company',  // <home></home>
  styleUrls: [ './vacature-requirement.component.scss' ],
  templateUrl: './vacature-requirement.component.html'
})
export class CompanyRequirementVacature {

  req1: String;

  public valueInput : number;
  public isUpdated = false;
  public editMode = false;
  public addClicked = false;
  public deleteClicked = false;

  registerForm: FormGroup;
  req1Form = new FormControl(String);
  idForm = new FormControl(String);

  requirement = {};
  requirements = [];
  id: Number;
  lengthRequirements: any;

  @Input() vacature

  constructor(  private formBuilder: FormBuilder,
                private companyRequirementService: CompanyRequirementService,
                private vacatureService: VacatureService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                public auth: AuthService){}


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      req1Form: this.req1Form,
      idForm: this.idForm,
    });

    this.getRequirementsById(this.vacature.id, null);
  }

  getRequirementsById(id, req1){
    this.companyRequirementService.getRequirementById(id).subscribe(
      res => {this.requirements = res, this.lengthRequirements = Object.keys(res).length, this.changeRequirement(req1)}
    )
  }

  changeRequirement(req1){

    if(this.addClicked == true && req1 != null){
      let i = this.lengthRequirements--;
      if(this.requirements[i]){
        this.requirements[i].name = this.req1;
      }
    }
  }

  save(vacature, requirements, req1){

    for(let i = 0; i < this.requirements.length; i++){
      if(this.requirements[i]){
        this.companyRequirementService.editRequirements(requirements[i]).subscribe(
          res => {},
          error => console.log(error)
        );
      }
    }

    this.registerForm.value.req1Form = req1;
    this.registerForm.value.idForm = this.vacature.id;

    if(this.addClicked && req1 != null){
      this.companyRequirementService.addRequirementForm(this.registerForm.value).subscribe(
        res => {this.getRequirementsById(this.vacature.id, req1)}
      )
    }

    this.vacatureService.editVacature(vacature).subscribe(
      res => {
        this.vacature = vacature;
      },
      error => console.log(error)
    );

    if(!this.deleteClicked){
      this.editMode = false;
    }

    this.deleteClicked = false;
    this.addClicked = false;
  }

  edit(){
    this.editMode = true;
  }

  deleteRequirement(){
    this.deleteClicked = true;

    let i = this.lengthRequirements - 1;
    let requirementId = this.requirements[i].id;
    this.companyRequirementService.deleteRequirement(requirementId).subscribe(
      res => {this.getRequirementsById(this.vacature.id, null);},
      error => console.log(error)
    );
  }
}

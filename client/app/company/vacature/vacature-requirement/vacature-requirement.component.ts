import { Component, OnInit, Inject, Input } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataTableModule } from "ng2-data-table";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { checkAndUpdateNode } from '@angular/core/src/view/view';
import {CompanyRequirementService} from '../../../services/company/requirement.service';
import { VacatureService } from '../../../services/company/vacature.service';


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

  constructor(private formBuilder: FormBuilder, private companyRequirementService: CompanyRequirementService, private vacatureService: VacatureService,
    private activatedRoute: ActivatedRoute, public toast: ToastComponent){}


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      req1Form: this.req1Form,
      idForm: this.idForm,
    });

    this.getRequirementsById(this.vacature.id, null);
  }

  getRequirementsById(id, req1){
    this.companyRequirementService.getRequirementById(id).subscribe(
      res => {this.requirements = res, this.lengthRequirements = Object.keys(res).length, this.changeRequirement(req1), console.log("length in getExperienceById: ", this.lengthRequirements), console.log("Experiences: ", this.requirements)}
    )
  }

  changeRequirement(req1){

    if(this.addClicked == true && req1 != null){
      console.log("length in callback: ", this.lengthRequirements)
      let i = this.lengthRequirements--;
      if(this.requirements[i]){
        this.requirements[i].name = this.req1;
        console.log(this.requirements);
      }
    }
  }

  save(vacature, req1){

    console.log("req1", req1);

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

  deleteExperience(){
    this.deleteClicked = true;

    let i = this.lengthRequirements - 1;
    console.log("i: ", i);
    let requirementId = this.requirements[i].id;
    console.log("requirement ID: ", requirementId);
    this.companyRequirementService.deleteRequirement(requirementId).subscribe(
      res => {this.getRequirementsById(this.vacature.id, null);},
      error => console.log(error)
    );
  }
}
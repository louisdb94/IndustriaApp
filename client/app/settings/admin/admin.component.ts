import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService} from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { CompanyService} from '../../services/company/company.service';
import { CompanyContactService} from '../../services/company/contact.service';
import { ParametersService } from "../../services/admin/parameters.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(  private formBuilder: FormBuilder,
                private companyService : CompanyService,
                private companyContactService : CompanyContactService,
                private userService : UserService,
                private paramService : ParametersService,
                public toast: ToastComponent,
                public auth: AuthService,

              ) {}

  admins = [];
  users = [];
  addAdminForm: FormGroup;
  admin = new FormControl('1');
  admin_email = new FormControl('', Validators.required);

  priorities = [];
  editLogo = false;

  companies = [];
  editPriority = false;

  addUserForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  priority = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);

  parameters = [];
  addParamForm: FormGroup;
  parameter = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  user_fk = new FormControl('', Validators.required);


  ngOnInit() {
    this.getAdmins();
    this.getPriorities();
    this.getCompanies();
    this.getParameters();

    this.addAdminForm = this.formBuilder.group({
    email: this.admin_email,
    admin: this.admin,
    });
    this.addUserForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
    priority: this.priority,
    role: this.role,
    name: this.name
    });
    this.addParamForm = this.formBuilder.group({
    parameter: this.parameter,
    value: this.value,
    user_fk: this.user_fk,
    role: this.role
    });

  }

  //ADD admin tab

  getAdmins(){
      this.userService.getadmin().subscribe(
        data => {
          this.admins = data;
        },
        error => console.log(error)
      );
  }

  deleteAdmin(user){
    user.admin = '0';
    this.userService.makeAdmin(user).subscribe(
      res => {},
      error => console.log(error)
    );
    this.admins.splice(this.admins.indexOf(user.email), 1);

  }

  makeAdmin(user){
    let found = false;
    for(let i = 0; i< this.users.length;i++){
      if(this.users[i].email == user.email ){
        user.admin = '1';
        this.userService.makeAdmin(user).subscribe(
          res => {},
          err => {}
          );
        this.admins.push(user);
        found = true;
      }
    }
    if(!found){
      this.toast.setMessage('invalid user', 'danger');

    }
  }

  //Priorities tab

  getPriorities(){
    this.companyService.getCompaniesPriorities().subscribe(
      data => {
        this.priorities = data;
      }
    )
  }

  changePriority(e, priority, type) {
    if(type == "profile_page") {
      if (e.target.checked) {
        priority.profile_page = 1;
      }else {
        priority.profile_page = 0;
      }
    }else if(type == "student_profile"){
      if (e.target.checked) {
        priority.student_profile = 1;
      }else {
        priority.student_profile = 0;
      }
    }else {
      if (e.target.checked) {
        priority.job_openings = 1;
      }else {
        priority.job_openings = 0;
      }
    }
    this.save(priority);
  }

  save(priority){
    this.companyService.editPriorityCompany(priority).subscribe();
  }

  saveLogoSize(priorities){
    for(let priority of priorities){
      this.save(priority);
    }
    this.editLogo = false;
  }

  //Companies tab

  getCompanies(){
    this.companyService.getCompanies().subscribe(
      result => {this.companies = result},
      error => console.log(error)
    )
  }
  saveUpdatePriority(users, companies){
    for(let i = 0; i < companies.length; i++){
      if(companies[i]){
        let addPriority = {name: '', company_fk: 0};
        addPriority.name = companies[i].name;
        addPriority.company_fk = companies[i].id;
         if(companies[i].priority == "FREE"){
           this.companyService.addPrioritiesFromCompanyId(addPriority).subscribe(
             res => {this.updatePriority(companies[i]);}
           );
         }else{
           this.companyService.deletePrioritiesFromCompanyId(addPriority.company_fk).subscribe(
             res => {this.updatePriority(companies[i]);}
           );
         }
      }
    }
    this.editPriority = false;
  }
  updatePriority(editPriority){
    this.companyService.editPriority(editPriority).subscribe(
      data => {},
      error => console.log("error")
    );
  }
  deleteCompany(user) {
    this.userService.deleteWholeCompany(user).subscribe(
      data => { this.toast.setMessage('item deleted successfully.', 'success');},
      error => console.error
    );
    const pos = this.companies.map(elem => elem.id).indexOf(user.id);
    this.companies.splice(pos, 1);
  }
  addCompany() {
    let addCompanyForm = {email: '', password: '', role: 'Company', rnumber: '', admin: '0'};
    addCompanyForm.email = this.addUserForm.value.email;
    addCompanyForm.password = this.addUserForm.value.password;

    let editPriority = {name: '', email: '', priority: '', user_fk: ''};
    editPriority.priority = this.addUserForm.value.priority;
    editPriority.email = this.addUserForm.value.email;
    editPriority.name = this.addUserForm.value.name;

    let addPriority = {name: '', company_fk: 0};
    addPriority.name = this.addUserForm.value.name

    this.userService.registerMysql(addCompanyForm)
        .subscribe( data =>{
          editPriority.user_fk = data.insertId;
          this.companyService.addCompanyFromUserId(editPriority)
              .subscribe(data =>{
                let company_fk = {company_fk: data.insertId}
                this.companyContactService.addContactFromCompanyId(company_fk).subscribe(
                  data => {
                    this.toast.setMessage('successfully added!', 'success');
                  }
                );
                addPriority.company_fk = data.insertId;
                if(editPriority.priority == "FREE"){
                  this.companyService.addPrioritiesFromCompanyId(addPriority).subscribe(
                    data => {}
                  );
                }
              });
            });
        this.companies.push(addCompanyForm);
  }

  //Parameters tab

  getParameters(){
    this.paramService.getParametersByAdmin().subscribe(
      data => {this.parameters = data;},
      error => console.log(error)
    );
  }

  addParam(AddParamForm){
    this.addParamForm.value.user_fk = this.auth.currentUser.id;
    this.addParamForm.value.role = "admin";
    this.addParamForm.value.value = AddParamForm.value;
    this.addParamForm.value.parameter = AddParamForm.parameter;

    this.paramService.addParam(this.addParamForm.value).subscribe();
  }


}

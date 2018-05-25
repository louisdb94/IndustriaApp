import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService} from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { CompanyService} from '../../services/company/company.service';
import { CompanyContactService} from '../../services/company/contact.service';
import { ParametersService } from "../../services/admin/parameters.service";
import { AuthService } from '../../services/auth.service';
import { AdminCompanycontactService} from '../../services/admin/admin_companycontact.service';


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
                private adminContactService : AdminCompanycontactService,
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
  editEmail = false;
  editPhone = false;
  adminCompanycontacts = [];
  newMail : string;

  addUserForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  priority = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);

  parameters = [];
  admin_priorities = [];
  company_priorities = [];
  freePriority = [];
  checkedPriority = 0;
  setChecked = 0;
  addParamForm: FormGroup;
  parameter = new FormControl('');
  value = new FormControl('');
  user_fk = new FormControl('', Validators.required);


  ngOnInit() {
    this.getAdmins();
    this.getPriorities();
    this.getCompanies();
    this.getParametersAdmin();
    this.getParametersCompanies();
    this.getAdminCompanyContacts();


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

  save(priority){
    this.companyService.editPriorityCompany(priority).subscribe();
  }

  saveLogoSize(priorities){
    for(let priority of priorities){
      this.save(priority);
    }
    this.editLogo = false;
  }

  setCheck(check){
    if(check == 1){
      this.setChecked = 1;
      return true;
    }
    else {
      this.setChecked = 0;
      return true;
    }

  }

  //Companies tab

  getCompanies(){
    this.getPriorities();
    this.companyService.getCompanies().subscribe(
      results => {
        this.companies = results;
        for(let result of results){
          if(result.priority == "FREE"){
            this.freePriority.push(result);
          }
        }
      },
      error => console.log(error)
    )
  }
  getAdminCompanyContacts(){
    this.adminContactService.getContacts().subscribe(
      data => {this.adminCompanycontacts = data;},
      error => {console.log(error);}
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

    let admin_companycontact = {name: '', email: '', phone: '', address: '', company_fk: 0};
    admin_companycontact.name = this.addUserForm.value.name;
    admin_companycontact.email = this.addUserForm.value.email;

    this.userService.registerMysql(addCompanyForm)
        .subscribe( data =>{
          editPriority.user_fk = data.insertId;
          this.companyService.addCompanyFromUserId(editPriority)
              .subscribe(data =>{
                let company_fk = {company_fk: data.insertId};
                admin_companycontact.company_fk = data.insertId;
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
                this.adminContactService.insertContact(admin_companycontact).subscribe();
              });
            });
        this.companies.push(addCompanyForm);
  }
  keyDownFunctionMail(item, company){
    company.email = item;
    this.adminContactService.editContact(company).subscribe();
    this.editEmail = false;
  }
  keyDownFunctionPhone(item, company){
    company.phone = item;
    this.adminContactService.editContact(company).subscribe();
    this.editPhone = false;

  }

  //Parameters tab

  getParametersCompanies(){
    this.paramService.getParametersCompany().subscribe(
      data => {
        for(let item of data){
          if(item.parameter == "priority"){
            this.company_priorities.push(item);
          }
        }
        if(this.company_priorities.length == 0){
          this.company_priorities.push({});
        }
      },
      error => console.log(error)
    );
  }

  getParametersAdmin(){
    this.paramService.getParametersByAdmin().subscribe(
      data => {
        this.parameters = data;
        for(let item of data){
          if(item.parameter == "priority"){
            this.admin_priorities.push(item);
          }
        }
      },
      error => console.log(error)
    );
  }

  addParam(AddParamForm){
    this.addParamForm.value.user_fk = this.auth.currentUser.id;
    this.addParamForm.value.role = "admin";
    this.addParamForm.value.value = AddParamForm.value;
    this.addParamForm.value.parameter = AddParamForm.parameter;
    this.paramService.addParam(this.addParamForm.value).subscribe(
      data => {this.getParametersAdmin()}
    );
  }

  changePriority(e, priority, delete_priority, item){
    if(delete_priority == true){
      this.paramService.getParametersForCompany(item.user_fk).subscribe(
        data => {
          for(let company_p of data){
            if(company_p.value == priority.value){
              this.paramService.deleteParameter(company_p.id).subscribe();
            }
          }
        }
      );
    }
    else{
      let addParam = {parameter: priority.parameter, value: priority.value, user_fk: item.user_fk};
      this.paramService.addParam(addParam).subscribe();
    }
  }

  removePriority(priority){
    this.paramService.deletePriorityFromValue(priority.value).subscribe(
      data => {
        window.location.reload();
      }
    );
  }

  deleteParameter(parameter){
    this.paramService.deleteParameter(parameter.id).subscribe(
      data => {this.getParametersAdmin()}
    )
  }

}

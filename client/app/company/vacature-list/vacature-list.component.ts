import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company/company.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import {OrderListModule} from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import {AccordionModule} from 'primeng/primeng';

import { Subject } from 'rxjs/Subject';

import {FilterVacature} from '../../pipes/filterVacatures.pipe';


@Component({
  selector: 'app-vacature-list',
  templateUrl: './vacature-list.component.html',
  styleUrls: ['./vacature-list.component.scss'],
  providers: [ FilterVacature]
})
export class VacatureListComponent implements OnInit {


    constructor(  private companyService: CompanyService, public auth: AuthService,
                  private http: HttpClient, private dataService: DataService) { }

    vacatures = [];
    companies = [];
    companies_all = [];

    filters = ['Vacature', 'Type', 'Company'];
    model = {
      filter: this.filters[0]
    };

    public searchText : any;
    public searchSkill : any;

    // review tom: added variable p
    public p: any;

    ngOnInit() {

      if(this.auth.loggedIn == false && this.auth.currentUser.role !== "Company" ){
        this.auth.loginStudent(localStorage.getItem('token'));
      }

      this.getinnerjoin();
      this.getCompanies();
    }

    getCompanies(){
      this.companyService.getCompanies().subscribe(
        data => {
          this.companies_all = data;
          for(let company of this.companies_all){
            if(company.priority !== "ONDERNEMERSDAG"){
              this.companies.push(company);
            }
          }
        },
        error => console.log(error)
       )
    }

    //sort array on companies alphabetically
    sort(array){
      array.sort( function(name1, name2) {
        if ( name1.name < name2.name ){
          return -1;
        }else if( name1.name > name2.name ){
            return 1;
        }else{
          return 0;
        }
     });
    }

    //Get all students -> add to students[]
    getinnerjoin(){
      this.companyService.getinnerjoin().subscribe(
        data => {
          // let result = this.dataService.decryption(data);
          for(let i =0; i< data.length ; i++){
            if(data[i].vacature_name != ""){
              this.vacatures.push(data[i]);
            }
          }},
        error => console.log(error)
      )
    }


    //order by gradYear in searchBox when clicking on 'GradYear'
    clickGrad = 0;
    sortVacature(){
        if(this.clickGrad === 0){
          this.vacatures.sort( function(name1, name2) {
            if ( name1.vacature_name < name2.vacature_name ){
              return -1;
            }else if( name1.vacature_name > name2.vacature_name ){
                return 1;
            }else{
              return 0;
            }
          });
        this.clickGrad = 1;
        }
      else{
        this.vacatures.sort( function(name1, name2) {
          if ( name1.vacature_name > name2.vacature_name ){
            return -1;
          }else if( name1.vacature_name < name2.vacature_name ){
              return 1;
          }else{
            return 0;
          }
        });
        this.clickGrad = 0;
      }
    }
    //order by Name in searchBox when clicking on 'Name'
    clickName = 0;
    sortType(){
      if(this.clickName === 0){
        this.vacatures.sort( function(name1, name2) {
          if ( name1.type < name2.type ){
            return -1;
          }else if( name1.type > name2.type ){
              return 1;
          }else{
            return 0;
          }
        });
      this.clickName = 1;
      }
      else{
        this.vacatures.sort( function(name1, name2) {
          if ( name1.type > name2.type ){
            return -1;
          }else if( name1.type < name2.type ){
              return 1;
          }else{
            return 0;
          }
        });
        this.clickName = 0;
      }
    }

    //order by Name in searchBox when clicking on 'Name'
    clickDegree = 0;
    sortCompanyName(){
      if(this.clickDegree === 0){
        this.vacatures.sort( function(name1, name2) {
          if ( name1.company_name < name2.company_name ){
            return -1;
          }else if( name1.company_name > name2.company_name ){
              return 1;
          }else{
            return 0;
          }
        });
      this.clickDegree = 1;
      }
      else{
        this.vacatures.sort( function(name1, name2) {
          if ( name1.company_name > name2.company_name ){
            return -1;
          }else if( name1.company_name < name2.company_name ){
              return 1;
          }else{
            return 0;
          }
        });
        this.clickDegree = 0;
      }
    }





  }

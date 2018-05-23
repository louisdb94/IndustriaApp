import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';
import { DataService } from '../services/data.service';
import { StudentService } from '../services/student.service';
import { UserService } from '../services/user.service';
import { ContactService} from '../services/contact.service';
import { ExperienceService } from '../services/experience.service';
import {MailService} from '../services/mail.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as jwt from 'jsonwebtoken';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router,
              public auth: AuthService,
              private fileService: FileService,
              public dataService: DataService,
              public studentService: StudentService,
              public userService: UserService,
              public contactService: ContactService,
              public experienceService: ExperienceService,
              public mailService: MailService,
              public toast: ToastComponent,
            ) { }

  cvs = [];
  student : any;
  contact : any;
  experiences : any;
  deleteMode = false;


  ngOnInit() {
    if(this.auth.loggedIn == false && this.auth.currentUser.role !== "Company" ){
      this.auth.loginStudent(localStorage.getItem('token'));
    }

    if(this.auth.currentUser.role == "Student"){
      this.getStudent();
      this.getExperiences();
      this.getContact();
      this.getCVFromStudent();
    }
  }

  getStudent(){
    this.studentService.getStudentByIdMysql(this.auth.currentUser.studentId).subscribe(
      data => {
        this.student = data[0];
        let currentToken = jwt.sign(JSON.stringify(this.auth.currentUser), 'user');
        localStorage.setItem('token', currentToken);
      },
      error => console.log(error),
    );
  }

  getExperiences(){
    this.experienceService.getExperienceById(this.auth.currentUser.studentId).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.experiences = data;
      },
      error => console.log(error)
    )
  }

  getContact(){
    this.contactService.getContactByStudentId(this.auth.currentUser.studentId).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.contact = data;
      },
      error => console.log(error)
    )
  }

  getCVFromStudent(){
    this.fileService.getCvFromStudent(this.auth.currentUser.studentId).subscribe(
      data => {
        // let result = this.dataService.decryption(data);
        this.cvs = data;
      },
      error => console.log(error)
    )
  }

  downloadCv(){
    for(let cv of this.cvs){
      window.open('/api/download/' + cv.id)
    }
  }

  downloadPersonalInformation(){
    // let name;
    // if(this.student.name == undefined){
    //   name = "no name input";
    // }else{
    //   name = this.student.name;
    // }
    let personal_information = {
      content: [
        {
          text: this.student.name + "   " + this.student.rnumber + '\n',
          style: 'name'
        },
        {
          text: "Degree: " + this.student.degree,
          style: 'degree'
        },
        {
          text: "Graduation Year: " + this.student.gradYear,
          style: 'degree'
        },
        {
          text: '\n\n',
        },
        {
          text: this.student.whoami,
          style: 'whoami'
        },

        {
          text: '\n\n',
        },
        {
          text: 'Contact Information',
          style: 'name'
        },
        {
          text: '\n',
        },
        {
          text: 'Email: ' + this.contact[0].email,
          style: 'contact'
        },
        {
          text: 'Phone Number: ' + this.contact[0].phone,
          style: 'contact'
        },
        {
          text: 'County: ' + this.contact[0].county,
          style: 'contact'
        },

        {
          text: 'City: ' + this.contact[0].city,
          style: 'contact'
        },
      ],
      styles: {
        name: {
          fontSize: 18,
          bold: true
        },
        degree: {
          fontSize: 14,
          bold: false
        },
        whoami: {
          fontSize: 10,
          bold: false
        },
        contact: {
          fontSize: 12,
          bold: false
        }
      }
    };
    pdfMake.createPdf(personal_information).open();
  }

  nodemailer(email){
    this.mailService.nodemailer(email).subscribe(
      res => {this.router.navigate(['/home-students'])},
      error => console.log("error sending mail")
    )
  }

  delete(){
    if(this.auth.currentUser.role == "Student"){
      this.userService.deleteWholeUser(this.student).subscribe(
        data => {
          if(data){
            this.auth.logout();
          }
        }
      );
    }
    if(this.auth.currentUser.role == "Company"){
      let company = {id: 0, user_fk: 0};
      company.id = this.auth.currentUser.companyId;
      company.user_fk = this.auth.currentUser.id;
      this.userService.deleteWholeCompany(company).subscribe();
    }
    this.auth.logout();
  }
}

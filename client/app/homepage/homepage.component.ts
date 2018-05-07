import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef  } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CompanyService} from '../services/company/company.service';
import { VacatureService} from '../services/company/vacature.service';
import { UserService} from '../services/user.service';
import { DataService } from "../services/data.service";
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FileService} from '../services/file.service';
import { EventsService } from "../services/admin/events.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {DropdownModule} from 'primeng/primeng';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {

  rnbShibb : any;
  jwtHelper: JwtHelper = new JwtHelper();

  students = [];
  student = {};
  rnumberStudent: String;
  messageId: String;
  messageNav: String;

  companies = [];
  priorities = [];
  highPriority = [];
  middlePriority = [];
  lowPriority = [];

  editSize : any;

  highImg = [];
  middleImg = [];
  lowImg = [];

  https = "https://";
  companyProfile = "/profile-company/";

  users = [];

  constructor(private studentService: StudentService,
    private data: DataService,
    private route: ActivatedRoute,
    private userService : UserService,
    private companyService : CompanyService,
    private vacatureService : VacatureService,
    private eventsService : EventsService,
    private fileService : FileService,
    private http: HttpClient,
    public auth: AuthService,
    private translate: TranslateService,
    public sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private modal: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!localStorage.getItem('token') && this.auth.currentUser.role !== "Company" ){
        this.auth.loginStudent(params['id']);
      }else if(localStorage.getItem('token') && this.auth.currentUser.role !== "Company"){
        this.auth.loginStudent(localStorage.getItem('token'));
      }
    });

    this.getEvents();
    this.getCompanies();
    this.getStudentsMysql();
    this.getUsers();
    this.getPriorities();


    this.data.idMessage.subscribe(message => this.messageId = message);
    this.data.navMessage.subscribe(message => this.messageNav = message);
  }

  //BEGIN OF CALENDAR CODE

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'week';
    viewDate: Date = new Date();

    modalData: {
      action: string;
      event: CalendarEvent;
    };

    cols = {title: null, start: null, end: null, color: null};
    eventIndustria = [];
    allEvents = [];
    idEvent : Number;

    editMode = false;

    refresh: Subject<any> = new Subject();
    dateString = '2017-12-21T00:00:00';

    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }

    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
    addEvent(events): void {
      this.events.push({
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: null,
      });

      this.eventIndustria.push(this.cols);
      this.eventIndustria[0].id = events[this.events.length - 1].id + 1;
      this.eventIndustria[0].title =  this.events[this.events.length - 1].title;
      this.eventIndustria[0].start = this.events[this.events.length - 1].start;
      this.eventIndustria[0].end =  this.events[this.events.length - 1].end;
      this.eventIndustria[0].color =  this.events[this.events.length - 1].color;

      this.eventsService.insertEvent(this.eventIndustria[0]).subscribe(
        data => {}
      );

      this.editMode = false;
      this.getEvents();
    }
    saveEvent(event, index){

      this.eventIndustria.push(this.cols);
      this.eventIndustria[0].id = event.id;
      this.eventIndustria[0].title =  event.title;
      this.eventIndustria[0].start = event.start;
      this.eventIndustria[0].end =  event.end;
      this.eventIndustria[0].color =  null;


      this.eventsService.editEvent(this.eventIndustria[0]).subscribe(
        data => {},
        error => {console.log("Error")}
      )

      this.editMode = false;
    }
    deleteEvent(event){
      this.eventsService.deleteEvent(event.id).subscribe(
        data => {this.getEvents()},
        error => {console.log("error")}
      )
    }
    getEvents(){
      this.eventsService.getEvents().subscribe(
        data => {this.changeDateAndColor(data)}
      );
    }
    changeDateAndColor(data){
      this.events = data;
      let eventLength = this.events.length;
      this.editMode = false;
      if(eventLength != 0){
        for(let i = 0; i < eventLength; i++){
          if(this.events[i]){
            this.events[i].start = new Date(this.events[i].start);
            this.events[i].end = new Date(this.events[i].end);
            this.events[i].color = colors.red;
            this.refresh.next();
          }
        }
      }
    }

    //END OF CALENDAR

  private compare = new BehaviorSubject<String>("default message");
  compareID = this.compare.asObservable();

  getStudentsMysql() {
    this.studentService.getStudentsMysql().subscribe(
      data => {this.students = data;},
      error => console.log(error)
    );

  }
  getUsers(){
      this.userService.getAllUsers().subscribe(
        data => {this.users = data;},
        error => console.error
      );
  }
  getPriorities(){
    this.companyService.getCompaniesPriorities().subscribe(
      data => {this.priorities = data;}
    )
  }
  getCompanies(){
    this.companyService.getCompanies().subscribe(
      data => {this.sortCompaniesByPriority(data);},
      error => console.log(error)
    )
  }

  switchLanguage(language) {
    this.translate.use(language);
  }

  sortCompaniesByPriority(data){
    this.companies = data;
    if(data.length != 0){
      let x = 0, y = 0, z = 0;
      for(let i = 0; i < data.length; i++){
        if(data[i]){
          let img = {im : 'data:image/PNG;base64,', id: null};
          if(data[i].priority == "HIGH" || (data[i].priority == "FREE")){
            if(data[i].priority == "HIGH"){
              this.highPriority[x] = data[i];
              this.highImg.push(img);
              this.highImg[x].id = data[i].id;
              x++;
              this.downloadImage(data[i].id);
            }

            else{
              for(let item of this.priorities){
                if(data[i].name == item.name && item.size == "Large" && data[i].priority == "FREE"){
                  this.highPriority[x] = data[i];
                  this.highImg.push(img);
                  this.highImg[x].id = data[i].id;
                  x++;
                  this.downloadImage(data[i].id);
                }
              }
            }
          }

          if(data[i].priority == "MIDDLE" || (data[i].priority == "FREE")){
            if(data[i].priority == "MIDDLE"){
              this.middlePriority[y] = data[i];
              this.middleImg.push(img);
              this.middleImg[y].id = data[i].id;
              y++;
              this.downloadImage(data[i].id);
            }

            else{
              for(let item of this.priorities){
                if(data[i].name == item.name && item.size == "Medium" && data[i].priority == "FREE"){
                  this.middlePriority[y] = data[i];
                  this.middleImg.push(img);
                  this.middleImg[y].id = data[i].id;
                  y++;
                  this.downloadImage(data[i].id);
                }
              }
            }
          }

          if(data[i].priority == "LOW" || (data[i].priority == "FREE")){
            if(data[i].priority == "LOW"){
              this.lowPriority[z] = data[i];
              this.lowImg.push(img);
              this.lowImg[z].id = data[i].id;
              z++;
              this.downloadImage(data[i].id);
            }

            else{
              for(let item of this.priorities){
                if(data[i].name == item.name && item.size == "Small" && data[i].priority == "FREE"){
                  this.lowPriority[z] = data[i];
                  this.lowImg.push(img);
                  this.lowImg[z].id = data[i].id;
                  z++;
                  this.downloadImage(data[i].id);
                }
              }
            }
          }
        }
      }
    }
  }

  downloadImage(id){
    this.fileService.downloadImageCompany(id).subscribe(
      data => {this.showImage(data, id)},
      error => console.log(error)
    );
  }
  showImage(data, id){
    for(let i = 0; i < this.highPriority.length; i++){
      if(this.highPriority[i].id == id){
        this.highImg[i].im += data._body;
      }
    }
    for(let i = 0; i < this.middlePriority.length; i++){
      if(this.middlePriority[i].id == id){
        this.middleImg[i].im += data._body;
      }
    }
    for(let i = 0; i < this.lowPriority.length; i++){
      if(this.lowPriority[i].id == id){
        this.lowImg[i].im += data._body;
      }
    }
    this.refresh.next();
  }


}

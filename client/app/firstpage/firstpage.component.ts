import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AppComponent } from '../app.component';
import { DataService } from "../services/data.service";

@Component({
  selector: 'firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstPageComponent implements OnInit {

  messageNav: String;
  messageId: String;

  constructor(private appcomponent: AppComponent, private data: DataService) {}

  ngOnInit(){
    this.data.navMessage.subscribe(message => this.messageNav = message);
    this.data.idMessage.subscribe(message => this.messageId = message);
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

}

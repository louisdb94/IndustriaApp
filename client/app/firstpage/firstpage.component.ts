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

  messageNav: boolean;

  constructor(private appcomponent: AppComponent, private data: DataService) {}

  ngOnInit(){
    this.data.navMessage.subscribe(message => this.messageNav = message);
  }

  switchLanguage(language) {
    this.appcomponent.switchLanguage(language);
  }

}

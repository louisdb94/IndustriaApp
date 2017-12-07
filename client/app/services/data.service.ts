import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageId = new BehaviorSubject<String>("default message");
  idMessage = this.messageId.asObservable();

  private rnumber = new BehaviorSubject<String>("default message");
  dataRnumber = this.rnumber.asObservable();

  private user_Id = new BehaviorSubject<Number>(null);
  id_user = this.user_Id.asObservable();

  private messageNav = new BehaviorSubject<String>("default message");
  navMessage = this.messageNav.asObservable();

  constructor() {}

  changeMessageId(message: String) {
    this.messageId.next(message);
  }

  changeRnumber(message: String) {
    this.rnumber.next(message);
  }

  changeUserId(message: Number) {
    this.user_Id.next(message);
  }

  changeMessageNav(message: String) {
    this.messageNav.next(message);
  }
}
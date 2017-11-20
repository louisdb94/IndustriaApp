import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageId = new BehaviorSubject<String>("default message");
  idMessage = this.messageId.asObservable();

  private messageNav = new BehaviorSubject<boolean>(false);
  navMessage = this.messageNav.asObservable();

  constructor() {}

  changeMessageId(message: String) {
    this.messageId.next(message);
  }

  changeMessageNav(message: boolean) {
    this.messageNav.next(message);
  }
}
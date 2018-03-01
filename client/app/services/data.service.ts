import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';

import CryptoJS from 'crypto-js';


@Injectable()
export class DataService {

  jwtHelper: JwtHelper = new JwtHelper();

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

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).results;
  }

  decryption(data){
    let encoded = this.decodeUserFromToken(data.token);
    let decrypted = CryptoJS.AES.decrypt(encoded, 'secret key 123');
    let plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  }
  decryption2(data){
    data = JSON.parse(data._body);
    let encoded = this.decodeUserFromToken(data.token);
    let decrypted = CryptoJS.AES.decrypt(encoded, 'secret key 123');
    let plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  }
}

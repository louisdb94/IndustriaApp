import { Component, ViewChild, OnInit, enableProdMode, Input, ElementRef, NgZone } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { CompanyContactService } from '../../../services/company/contact.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService} from '../../../services/contact.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'vacature-contact-company',  // <home></home>
  styleUrls: ['./vacature-contact.component.scss'],
  templateUrl: './vacature-contact.component.html'
})
export class CompanyContactVacature implements OnInit {

  data: any;

  public latitude: number;
  public longitude: number;
  public searchControl = new FormControl();
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @Input() company;
  @Input() contacts;
  editMode = false;
  clickMap = false;

  constructor(  private companyService: CompanyService,
                private companyContactService: CompanyContactService,
                private contactService: ContactService,
                private activatedRoute: ActivatedRoute,
                public toast: ToastComponent,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private auth: AuthService){}


  ngOnInit(){
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          this.contacts.address = place.formatted_address;
          this.contacts.latitude = place.geometry.location.lat();
          this.contacts.longitude = place.geometry.location.lng();
        });
      });
    });
  }


  showMap(){

    //set google maps defaults
    this.clickMap = true;
    this.zoom = 10;
    this.latitude = this.contacts.latitude;
    this.longitude = this.contacts.longitude;

    //set current position
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  saveContact(contacts){
    this.companyContactService.editContact(contacts).subscribe(
      res => {},
      error => console.log(error)
    );

    this.editMode = false;
  }
}

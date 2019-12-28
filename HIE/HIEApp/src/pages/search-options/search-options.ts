//import { Component, NgZone, ViewChild , ɵEMPTY_ARRAY} from '@angular/core';
import { Component, NgZone, ViewChild} from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import { Global_Variables } from '../../app/properties';
import { APIService } from '../../providers/api-service';
//declare var Card: any;

@Component({
  selector: 'page-search-options',
  templateUrl: 'search-options.html'
})
export class SearchOptionsPage {
  oCuisine: string = 'Any';
  oSlides: string[] = [];
  @ViewChild('mySlider') mySlider: any;
  bLoaded: boolean = false;
  bIsFormValid: boolean = true;
  constructor(private zone: NgZone, public navCtrl: NavController, public oEvents: Events, public oAPIService: APIService) {
  }

  ionViewWillEnter() {
    this.oEvents.subscribe("Region", (data) => {
      this.isFormValid ( ) ;
      this.zone.run(() => {
        Global_Variables.searchRegion = data ;
        this.isFormValid();
      });
    });
    this.oEvents.subscribe("Cuisines", (data) => {
      this.zone.run(() => {
        Global_Variables.searchCuisine = data ;
        this.isFormValid();
      });
    });
    Global_Variables.sCurrentPage = 'Home';
    this.bLoaded = false;
    this.oSlides = [];
    this.oAPIService.send2ServerP("slides/").then((data: any) => {
      this.oSlides = data.result;
      this.bLoaded = true;
    });
  }

  ionViewWillLeave() {
    this.oEvents.unsubscribe("Region");
    this.oEvents.unsubscribe("Cuisines");
    this.bLoaded = false;
    this.oSlides = [];
  }

  getCuisines() {
    return Global_Variables.searchCuisine ;
  }
  isFormValid() {
    this.bIsFormValid = !("" == Global_Variables.selectedCuisines &&
      (Global_Variables.searchRegion == '%' || Global_Variables.searchRegion == 'Any'));
  }
  onSearch() {
    this.navCtrl.push(SearchResultPage);
  }
}

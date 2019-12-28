import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { Global_Variables } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html'
})
export class AboutUsPage {
  sAboutUsHTML: string ;
  bLoaded: boolean = false ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public oAPIService: APIService) {
    Global_Variables.sCurrentPage = 'About us' ;
    this.oAPIService.send2ServerPlainText("aboutus").then((data) => {
      console.log ( data ) ;
      this.sAboutUsHTML = data._body;
      this.bLoaded = true ;
      console.log(JSON.stringify(this.sAboutUsHTML));
    });
  }
}

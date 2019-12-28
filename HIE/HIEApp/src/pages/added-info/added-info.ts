import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-added-info',
  templateUrl: 'added-info.html',
})
export class AddedInfoPage {

  text:String = "" ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.text = "Menu saved successfully!" ;
  }

  ok ( )
  {    
    this.navCtrl.setRoot('MerchantHomePage') ;
  }

}

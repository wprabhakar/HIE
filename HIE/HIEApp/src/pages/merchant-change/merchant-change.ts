import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
//import { CartService } from '../../providers/cart-service';
import { Global_Variables } from '../../app/properties';

@Component({
  selector: 'page-merchant-change',
  templateUrl: 'merchant-change.html',
//  templateUrl: '../login-error/login-error.html',
})
export class MerchantChangePage {

  oItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController
    // ,private oService: CartService
  ) {
    this.oItem = navParams.get("oNewMerchant");
//    this.oItem.Confirmed = 'N' ;
    Global_Variables.canSwith2Merchant = 1;
  }
  onClick ( ) {
    alert ( "Clicked") ;
  }
  cancelPressed() {
    console.log ( "cancelPressed") ;
    Global_Variables.canSwith2Merchant = 2;
    this.navCtrl.pop();
    //this.viewCtrl.dismiss();
  }
  okPressed() {
    //    this.oService.removeAllItems();
    // this.oService.removeAllItems() ;
    // Global_Variables.oMID = this.oItem.ID;
    // this.oService.setID(this.oItem.ID);
    // this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: this.oItem, MerchantID: this.oItem.ID });
    console.log ( "okPressed") ;
    Global_Variables.canSwith2Merchant = 1;

    this.viewCtrl.dismiss({ response: 'OK' });

    //    this.navCtrl.pop();
  }

}

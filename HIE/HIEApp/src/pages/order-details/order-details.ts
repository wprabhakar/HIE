import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {
  oTID:string = '' ;
  o: any = {} ;
  bLoaded: boolean = false ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private readonly oAPIService: APIService) {
    this.oTID = navParams.get("TID");
    this.o = navParams.get ( "Transaction") ;
    this.o.COMMENT = 'Test Comment' ;
    this.bLoaded = true ;
    console.log ( JSON.stringify (this.o) ) ;
  }
  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
//    this.getDetails() ;
  }
  /*
  getDetails() {
    this.bLoaded = false ;
    this.oAPIService.send2ServerP("customer/orderdetails/" + this.oTID).then((data: any) => {
      this.oItem = data.result[0];
      this.oItem.COMMENT = 'This is a comment' ;
      this.bLoaded = true ;
      console.log ( this.oItem ) ;
    });
  }*/
  changeOrderStatus() {
    this.oAPIService.send2ServerP("merchant/confirm/" + this.o.ID, true, { 'COMMENT': this.o.COMMENT }).then((data: any) => {
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    }).then(() => {
      this.navCtrl.pop ( ) ;
    });
  }
}

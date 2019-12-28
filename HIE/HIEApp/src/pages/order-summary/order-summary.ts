import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { IncomingOrderPage } from '../incoming-order/incoming-order';
//import { OrderHistoryPage } from '../order-history/order-history';
import { APIService } from '../../providers/api-service';
import { Global_Variables } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html'
})
export class OrderSummaryPage {
//  oItems: any[] = [];
  bLoaded: boolean = false;
  oItem: any = {
    INCOMING_ORDER: 0,
    CONFIRMED_ORDER: 0,
    HISTORY_ORDER: 0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public oAPIService: APIService) { 
    Global_Variables.sCurrentPage = 'Orders' ;
  }

  ionViewWillEnter() {
    console.log ( "ionViewWillEnter") ;
    this.fetchItems ( ) ;
  }

  fetchItems() {
//    this.oItems = [];
    this.bLoaded = false;
    this.oItem.INCOMING_ORDER = 0 ;
    this.oItem.CONFIRMED_ORDER = 0 ;
    this.oItem.HISTORY_ORDER = 0 ;
    this.oAPIService.send2ServerP("ordersummary").then((data: any) => {
      var n = data.result.length - 1 ;
      data.result.forEach((obj, i) => {
        if (obj.STATUS == 'P')
          this.oItem.INCOMING_ORDER = obj.TC;
        else
          if (obj.STATUS == 'C')
            this.oItem.CONFIRMED_ORDER = obj.TC;
          else
            if (obj.STATUS == 'D')
              this.oItem.HISTORY_ORDER = obj.TC;
        if ( i >= n )
        {
//          this.oItems = data.result;
          this.bLoaded = true;
        }
      });
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    });
  }

  onIncomingOrder() {
    this.navCtrl.push('IncomingOrderPage');
  }
  onConfirmedOrder() {
    this.navCtrl.push('ConfirmedOrderPage');
  }
  onHistoryOrder() {
    this.navCtrl.push('OrderHistoryPage');
  }
}

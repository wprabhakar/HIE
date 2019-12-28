import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { OrderDetailsPage } from '../order-details/order-details';
import { lookupTime } from '../../app/properties';
//import { lookupStatus } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-incoming-order',
  templateUrl: 'incoming-order.html'
})
export class IncomingOrderPage {
  public oItems: any[] = [];
  private bLoaded = false;
  private oItemGroupedByDate: any;
  sErrorText: string = 'No Pending Order' ;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public oAPIService: APIService) {
  }

  ionViewDidEnter() {
    this.fetchItems();
  }
  goBack() {
    this.navCtrl.pop();
  }
  /*
    iProcessed: number = 0;
    iTotalEntries: number = 0;
    getDetails(oItem: any) {
      this.oAPIService.send2ServerP("customer/orderdetails/" + oItem.ID).then((data: any) => {
        oItem.DETAILS = data.result;
        this.oItems.push(oItem);
        this.iProcessed++;
        if (this.iProcessed == this.iTotalEntries) {
          this.oItemGroupedByDate = this.groupByDate();
          console.log(this.oItemGroupedByDate);
          this.bLoaded = true;
        }
      });
    }
  */
  fetchItems() {
    this.bLoaded = false;
    this.oItems = [];
    // this.iProcessed = 0;
    // this.iTotalEntries = 0;
    this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'P' }).then((data: any) => {
      //      this.iTotalEntries = data.result.length;
      if (data.result.length == 0) {
        this.oItemGroupedByDate = [] ;
        this.bLoaded = true;
        return;
      }
      console.log ( JSON.stringify ( data.result ) ) ;
      this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
      this.oItems = data.result;
      this.oItems.forEach((obj, idx) => {
        obj.PICKUPTIME = lookupTime(obj.PICKUPSTART);
        if (idx == this.oItems.length - 1) {
          this.oItemGroupedByDate = this.groupByDate();
          this.bLoaded = true;
        }
      });

    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    });
  }
  nextPage() {
    this.navCtrl.push('ConfirmedOrderPage')
      .then(() => {
        this.navCtrl.remove(this.viewCtrl.index);
      });
  }
  getStyle(sPickupOn: String): String {
    return "ksd-back-1";
  }
  groupByDate() {
    //    var groupKey = 0 ;

    var groups = this.oItems.reduce(function (o, a) {
//      if ( a._D.length == 0 ) return o ;
      var m = a.PICKUPON;
      (o[m]) ? o[m].data.push(a) : o[m] = { PICKUPON: m, data: [a] };
      return o;
    }, {});
    var result = Object.keys(groups).map(function (k) {
      return groups[k];
    });
    //    console.log ( result ) ;
    return result;
  }

  changeOrderStatus(oItem: any) {
    this.oAPIService.send2ServerP("merchant/confirm/" + oItem.TRANSACTION_ID, true).then((data: any) => {
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    }).then(() => {
      this.fetchItems();
    });
  }

  showOrderDetails(oItem: any) {
    this.navCtrl.push(OrderDetailsPage, { 'TID': oItem.ID, 'Transaction': oItem });
  }
}

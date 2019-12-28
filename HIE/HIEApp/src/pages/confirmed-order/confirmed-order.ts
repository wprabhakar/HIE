import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { lookupTime } from '../../app/properties';
//import { lookupStatus } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-incoming-order',
  templateUrl: 'confirmed-order.html'
})
export class ConfirmedOrderPage {
  public oItems: any[] = [];
  private bLoaded = false;
  private oItemGroupedByDate: any;
  sErrorText: string = 'No Pending Order' ;
//  private oParent: any ;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public oAPIService: APIService) {
  }

  ionViewDidEnter() {
    this.fetchItems();
  }

  goBack() {
    this.navCtrl.pop() ;
  }
  fetchItems() {
    this.bLoaded = false;
    this.oItems = [];
    this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'C' }).then((data: any) => {
      if (data.result.length == 0) {
        this.oItemGroupedByDate = [] ;
        this.bLoaded = true;
        return;
      }
      this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
      data.result.forEach((obj, idx) => {
        obj.PICKUPTIME = lookupTime(obj.PICKUPSTART);
        this.oItems.push ( obj ) ;
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
    this.navCtrl.push('OrderHistoryPage').then(() => {
        this.navCtrl.remove(this.viewCtrl.index);
    });
  }
  getStyle(sPickupOn: String): String
  {
      return "ksd-back-1" ;
  }

  groupByDate() {
    var groups = this.oItems.reduce(function (o, a) {
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
    this.oAPIService.send2ServerP("merchant/fulfilled/" + oItem.TRANSACTION_ID, true).then((data: any) => {
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    }).then(() => {
      this.fetchItems();
    });
  }
}

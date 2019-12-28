import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { lookupTime } from '../../app/properties';
//import { lookupStatus } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html'
})
export class OrderHistoryPage {
  public oItems: any[] = [];
  private bLoaded = false;
  private oItemGroupedByDate: any ;
  bSearching: boolean = false ;
  sText: string = '';
  oAllItems: any[] = [];
  loading: Loading;

  sErrorText: string = 'NO RESULT' ;
  constructor(public navCtrl: NavController, public oAPIService: APIService,     private readonly loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    this.fetchItems();
  }
  goBack() {
    this.navCtrl.pop();
  }
  fetchItems() {
    this.loading = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.loading.present();
    this.oItems = [];
    this.oAllItems = [] ;
    this.bLoaded = false;
    this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'D' }).then((data: any) => {
      if ( data.result.length == 0 )
      {
        this.oItemGroupedByDate = [] ;        
        this.loading.dismissAll() ;
        this.bLoaded = true ;
        return ;
      }
      this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
      this.oItems = data.result ;
      this.oAllItems = data.result ;
      this.oItems.forEach((obj, idx) => {
        obj.PICKUPTIME = lookupTime(obj.PICKUPSTART);
        if (idx == this.oItems.length - 1) {
          this.oItemGroupedByDate = this.groupByDate();
          this.loading.dismissAll() ;
          this.bLoaded = true;
        }
      });
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
      this.loading.dismissAll() ;
    });
  }
  groupByDate ( )
  {
    var groups = this.oItems.reduce ( function ( o, a ) 
    {
      var m = a.PICKUPON ;
      ( o[m] ) ? o[m].data.push(a) : o[m] = { PICKUPON: m, data:[a]} ;
      return o ;
    }, {} ) ;
    var result = Object.keys(groups).map ( function (k) {
      return groups[k] ;
    })  ;
    return result ;
 }
  getStyle(sPickupOn: string): string
  {
  //  console.log ( sPickupOn ) ;
    var inputDate = new Date(sPickupOn);
    var todaysDate = new Date();

    var bToday = (inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0));

    if ( bToday )
      return "ksd-back-1" ;
    return "ksd-back-2" ;
  }
  getColor(sPickupOn: string): string
  {
    var inputDate = new Date(sPickupOn);
    var todaysDate = new Date();

    var bToday = (inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0));

    if ( bToday )
      return "#E4FCF7" ;
    return "#FFE5E5" ;
  }
  onSearchInput() {
    this.bSearching = true;
    this.oItems = this.filterItems(this.sText);
    this.oItemGroupedByDate = this.groupByDate();
    this.bSearching = false;
  }
  filterItems(sText: string) {
    if (sText.length == 0)
      return this.oAllItems;
    return this.oAllItems.filter((item) => {
      if ( item.CUSTOMER_NAME.toLowerCase().indexOf(sText.toLowerCase()) > -1 )
        return true ;
      if ( item.BOOKINGREF.indexOf(sText) > -1 )
        return true ;
      return false ;
    });
  }
}

//import { NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { LoginService } from '../../providers/login-service';
//import { sIMAGE_URL } from '../../app/properties';
import { getStartTime } from '../../app/properties';
import { lookupTime } from '../../app/properties';
import { lookupStatus } from '../../app/properties';
import { Global_Variables } from '../../app/properties';
import { Calendar } from '@ionic-native/calendar';
import { Diagnostic } from '@ionic-native/diagnostic';
//import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  public oItems: any[] = [];
  private bLoaded = false;
  private bShowUpcoming = true;
  private loading: Loading;
  sErrorText: string = 'NO RESULT' ;
  private options: any = {
    firstReminderMinutes: 5
  };
  constructor(
    //public zone: NgZone, 
    public navCtrl: NavController, public oAPIService: APIService, public readonly loadingCtrl: LoadingController,
    private oCalendar: Calendar,
    private oDiagnostic: Diagnostic,
    public oLoginService: LoginService) {
    // oCalendar.listCalendars().then((data) => {
    //   console.log("OLD List: " + JSON.stringify(data));
    // });
    // oCalendar.createCalendar('HIE-Calendar').then((d) => {
    //   oCalendar.listCalendars().then((data) => {
    //     console.log("NEW List: " + JSON.stringify(data));
    //   });
    // });
    Global_Variables.sCurrentPage = 'My transaction';
  }
  ionViewDidLoad() {
    this.loadUpcoming(true);
  }
  getColor(oItem: any) {
    if (oItem.STATUS == 'P')
      return "red";
    if (oItem.STATUS == 'C')
      return "green";
  }
  onRemindMe(oItem: any) {
    this.oDiagnostic.isCalendarAuthorized().then((authorized) => {
      if (authorized)
        this.setReminder(oItem);
    });
  }

  getStartDate(oItem: any): Date {
    var STARTDATE = this.oAPIService.stringToDate(oItem.PICKUPON, "yyyy-mm-dd", "-");
    var STARTTIME = getStartTime(oItem.PICKUPSTART);
    return this.oAPIService.setTime24Hrs(STARTDATE, STARTTIME);
  }
  formulateEventInfo(oItem: any) {
    var oEvent: any = {};
    oEvent.TITLE = 'HIEarly - Collection';
    oEvent.NOTES = oItem.NAME + ' ' + oItem.BOOKINGREF;
    oEvent.STARTDATE = this.getStartDate(oItem);
    oEvent.ENDDATE = oEvent.STARTDATE;
    return oEvent;
  }
  setReminder(oItem: any) {
    var e = this.formulateEventInfo(oItem);
    this.oCalendar.createEventWithOptions(e.TITLE, null, e.NOTES, e.STARTDATE, e.ENDDATE, this.options).then((data) => {
      oItem.REMIND = 'N';
    }).catch((err) => {
      oItem.REMIND = 'Y';
    });
  }

  checkCalendar(oItems: any): any {
    return oItems.reduce((oPromise, oItem) => {
      return oPromise.then((data) => {
        return this.checkReminderSet(oItem).then((data) => {
          if (data.length == 0)
            oItem.REMIND = 'Y';
          else
            oItem.REMIND = 'N';
          // console.error("Lookup of Event: " + JSON.stringify(data) + " => " + JSON.stringify(data));
        }).catch((err) => {
          console.error(JSON.stringify(err))
        });
      });
    }, Promise.resolve());
  }
  //  @synchronize()
  checkReminderSet(oItem: any): any {
    var e = this.formulateEventInfo(oItem);
//    console.log("Checking: " + JSON.stringify(e));
    return this.oCalendar.findEvent(e.TITLE, null, e.NOTES, e.STARTDATE, e.ENDDATE);
  }

  showUpcoming() {
    this.oAPIService.send2ServerP("customer/orders").then((data: any) => {
      this.oItems = data.result;
      this.updateStatusMessage(true);
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
      this.bLoaded = true;
      this.loading.dismissAll() ;
    });
  }
  oCheckReminders = [];
  updateStatusMessage(b: boolean) {
    if (this.oItems.length == 0) {
      this.bShowUpcoming = b;
      this.bLoaded = true;
      this.loading.dismissAll() ;
      return;
    }
    this.oCheckReminders = [];
    this.oAPIService.sort(this.oItems, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
    this.oItems.forEach((obj, idx) => {
      if (obj.STATUS == 'C') {
        obj.REMIND = 'Y';
        //         if (this.oAPIService.isFuture(this.getStartDate(obj))) {
        this.oCheckReminders.push(obj);
        //        }
      }
      obj.PICKUPTIME = lookupTime(obj.PICKUPSTART);
      obj.STATUS_MESSAGE = lookupStatus(obj.STATUS);
      if (idx == this.oItems.length - 1) {
        this.bShowUpcoming = b;
        if (this.oCheckReminders.length > 0) {
          this.checkCalendar(this.oCheckReminders).then((d) => {
            this.loading.dismissAll() ;
            this.bLoaded = true;
          }).catch((err) => {
            this.loading.dismissAll() ;
            this.bLoaded = true;
            console.log("ERROR: " + JSON.stringify(err));
          });
        }
        else {
          this.loading.dismissAll() ;
          this.bLoaded = true;
        }
      }
    });
  }

  showHistory() {
    this.oAPIService.send2ServerP("customer/orderhistory").then((data: any) => {
      console.log(JSON.stringify(data));
      this.oItems = data.result;
      this.updateStatusMessage(false);
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
      this.loading.dismissAll() ;
    });
  }
  loadUpcoming(b: boolean) {
    this.bLoaded = false;
    this.oItems = [];
    this.loading = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.loading.present();
    if (b)
      this.showUpcoming();
    else
      this.showHistory();
  }
  getMenuClass(b: boolean) {
    if (b == this.bShowUpcoming)
      return "ksd-menu-options-selected";
    return "ksd-menu-options";
  }

  // getImageURL(oItem: any, o: any) {
  //   let img = oItem.IMAGE_URL;
  //   if (img == null)
  //     return '';
  //   if (img.startsWith('http://') ||
  //     img.startsWith('https://'))
  //     return img;
  //   return sIMAGE_URL + o.MUSERS_ID + "/" + img;
  // }

}

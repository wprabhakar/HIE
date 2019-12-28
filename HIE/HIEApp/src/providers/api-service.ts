import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { sURL } from '../app/properties';
import { sIMAGE_URL } from '../app/properties';
import { Global_Variables } from '../app/properties';
import { LoginService } from '../providers/login-service';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

@Injectable()
export class APIService {
  constructor(public http: Http, private alertCtrl: AlertController,
    private readonly oLoginService: LoginService) {
  }

  getHeaders(): any {
    //console.log ( "getHeaders Token: " + Global_Variables.token ) ;
    var oHeaders = new Headers({
      'Content-Type': 'application/json',
      'ks-x-authorization': 'Bearer: ' + Global_Variables.token
    });
    //    console.log ( JSON.stringify ( oHeaders )) ;
    return { headers: oHeaders };
  }

  showNetworkError() {
    let alert = this.alertCtrl.create({
      title: 'No Network',
      subTitle: 'Pls check internet connection',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  send2Server(sURL: string, bPost: boolean = false, oItem: any = null): any {
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject("No Network");
    }
    if (bPost) {
      return this.http.post(sURL, oItem, this.getHeaders())
        .map(res => res.json()).toPromise();
    }
    return this.http.get(sURL, this.getHeaders())
      .map(res => res.json()).toPromise();
  }

  getURL() {
    return sURL + this.oLoginService.getUserID() + "/";
  }

  send2ServerC(sPartialURL: string, bPost: boolean = false, oItem: any = null): any {
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject("No Network");
    }
    if (bPost) {
      return this.http.post(sURL + sPartialURL, oItem, this.getHeaders())
        .map(res => res.json()).toPromise();
    }
    return this.http.get(sURL + sPartialURL, this.getHeaders())
      .map(res => res.json()).toPromise();
  }

  send2ServerP(sPartialURL: string, bPost: boolean = false, oItem: any = null): any {
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject("No Network");
    }
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders())
        .map(res => res.json()).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL, this.getHeaders())
      .map(res => res.json()).toPromise();
  }

  send2ServerPlainText(sPartialURL: string, bPost: boolean = false, oItem: any = null): any {
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject("No Network");
    }
    if (bPost) {
      return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders()).toPromise();
    }
    return this.http.get(this.getURL() + sPartialURL, this.getHeaders()).toPromise();
  }

  fileUpload(sUrl: string, formData: any): any {
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject("No Network");
    }
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(formData);
    //    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      // for(var i = 0; i < files.length; i++) {
      //     formData.append("uploads[]", files[i], files[i].name);
      // }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            //            console.log(xhr.response);
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      //path = 'upload/' ;
      xhr.open("POST", sUrl, true);
      xhr.send(formData);
    });
  }
  /*
  getImageThumbURL(oItemC: any) {
    if (oItemC === undefined) return '';
    var oItem: any = oItemC;
    if (oItemC.oProduct)
      oItem = oItemC.oProduct;
    let img = oItem.IMAGEURL;
    if (img.startsWith('http://') ||
      img.startsWith('https://'))
      return img;
    return sIMAGE_URL + oItem.RESTAURANT_ID + "/" + "thumb_" + img;
  }
  
  getImageURL(oItemC: any) {
    if (oItemC === undefined) return '';
    var oItem: any = oItemC;
    if (oItemC.oProduct)
      oItem = oItemC.oProduct;
    let img = oItem.IMAGEURL;
    if (img.startsWith('http://') ||
      img.startsWith('https://'))
      return img;
    return sIMAGE_URL + oItem.RESTAURANT_ID + "/" + img;
  }
  */
  buildImageURL(oItem: any, i: number = -1, sPrefix = '70h70w_', bRefresh = false ) {
    let img = oItem.IMAGE_URL;
    if (img === undefined || img === null)
      return '';
    if (img.startsWith('http://') ||
      img.startsWith('https://'))
    {
      if (bRefresh)
        return img + "?" + new Date().getMilliseconds();
      return img ;
    }
    if (i != -1)
      return sIMAGE_URL + i + "/" + sPrefix + img;
    return sIMAGE_URL + oItem.ID + "/" + sPrefix + img;
  }
  sort(oData: any, oFields: any) {
    // this.oAPIService.sort ( this.oItems, [{field: 'PICKUPON', direction: 'desc' }, {field: 'PICKUPSTART', direction: 'desc' }, {field: 'BOOKINGREF', direction: 'desc'}]) ;
    oData.sort(function (a, b) {
      for (var i = 0; i < oFields.length; i++) {
        var retval = a[oFields[i].field] < b[oFields[i].field] ? -1 : a[oFields[i].field] > b[oFields[i].field] ? 1 : 0;
        if (oFields[i].direction == "desc") {
          retval = retval * -1;
        }
        if (retval !== 0) {
          return retval;
        }
      }
    });
  }
  sortByDate(oItems: any, oDTField: string, sDir = 'asc') {
    oItems.sort(function (a, b) {
      // if date format is 'DD/MM/YYYY' ;
      // var aa = a.split('/').reverse().join(),
      //     bb = b.split('/').reverse().join();
      //Ascending
      //return a.PICKUPON < b.PICKUPON ? -1 : (a.PICKUPON > b.PICKUPON ? 1 : 0); 
      //Desc
      var retVal = a[oDTField] > b[oDTField] ? -1 : (a[oDTField] < b[oDTField] ? 1 : 0);
      if (sDir !== 'asc')
        return -retVal;
      return retVal;
    });
  }
  stringToDate(_date: string, _format: string, _delimiter: string) {
    // stringToDate("17/9/2014","dd/MM/yyyy","/");
    // stringToDate("9/17/2014","mm/dd/yyyy","/")

    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
    return formatedDate;
  }
  setTime(oDate: Date, sTime: string) {
    //       tests = ['01.25 PM', '01:25pm', '1:25 PM', '11.35 PM', '12.45 PM', '01.25 AM', '11.35 AM', '12.45 AM'],
    var timeReg = /(\d+)[\.|:](\d+)\s?(\w+)/;
    var parts = sTime.match(timeReg);
    var hours = /am/i.test(parts[3]) ?
      function (am) { return am < 12 ? am : 0 }(parseInt(parts[1], 10)) :
      function (pm) { return pm < 12 ? pm + 12 : 12 }(parseInt(parts[1], 10));
    var minutes = parseInt(parts[2], 10);
    oDate.setHours(hours);
    oDate.setMinutes(minutes);
    oDate.setSeconds(0);
    return oDate;
  }
  setTime24Hrs(oDate: Date, sTime: string): Date {
    var s = sTime.split(':');
    var hours = parseInt(s[0]);
    var minutes = parseInt(s[1]);
    oDate.setHours(hours);
    oDate.setMinutes(minutes);
    return oDate;
  }

  isFuture(date):boolean {
    return date.diff(moment.now()) > 0;
  }
  isTodayOrFuture(date) {
    date = this.stripTime(date);
    return date.diff(this.stripTime(moment.now())) >= 0;
  }

  stripTime(date) {
    date = moment(date);
    date.hours(0);
    date.minutes(0);
    date.seconds(0);
    date.milliseconds(0);
    return date;
  }
}

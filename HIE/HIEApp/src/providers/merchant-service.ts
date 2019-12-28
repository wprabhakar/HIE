import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { CartService } from './cart-service';
import { LoginService } from './login-service';
import { APIService } from './api-service';
import { Global_Variables } from '../app/properties' ;
import { sURL } from '../app/properties' ;

@Injectable()
export class MerchantService {

//  public oItems: any[] = [];
  constructor(public http: Http, public oCartService: CartService, public oLoginService: LoginService, public oAPIService: APIService) {
  }
/*
  loadItemsNOTUsed(sID) {
    this.oItems.length = 0;
    var oHeaders = new Headers({
      'Content-Type': 'application/json',
      'KS-X-Authorization': 'Bearer: ' + sID
    });
    return new Promise((resolve, reject) => {
      var s = sURL + "merchants";
      this.http.post(s,
        {
          NAME: Global_Variables.searchMerchant,
          REGION: Global_Variables.searchRegion
        },
        { headers: oHeaders })
        .map(res => res.json())
        .subscribe(data => {
          console.log("Data: " + JSON.stringify(data));
          //To check if err and then reject
          if (data['result'] === 'undefined') {
            reject(data);
            return;
          }
          for (let o of data['result']) {
            this.oItems.push(o);
          }
          resolve(this.oItems);
        });
    });
  }
*/
  loadProducts(oItem: any): any {
    var s = sURL + "products/" + oItem.ID;
    return this.http.get(s)
      .map(res => res.json()).toPromise();
  }

  loadDiscounts(): any {
    var s = sURL + "discounts";
    return this.http.post(s,
      {
        NAME: Global_Variables.searchCuisine,
        REGION: Global_Variables.searchRegion
      })
      .map(res => res.json()).toPromise();
  }

  deleteDiscount(oItem: any): any {
    var s = sURL + "discounts/" + oItem.ID + "/delete";
    return this.http.post(s,
      {
        ID: oItem.ID
      })
      .map(res => res.json()).toPromise();
  }

  isMerchant() { //TODO get the CustomerID from the Token
    return this.oLoginService.getUserType() === 'M';
  }
  isCustomer() { //TODO get the CustomerID from the Token
    return this.oLoginService.getUserType() === 'C';
  }
  getOrders() {
    var s = sURL;
    if (this.isMerchant())
      s += "merchant/" + this.oLoginService.getUserID() + "/orders";
    else
      if (this.isCustomer())
        s += "customer/" + this.oLoginService.getUserID() + "/orders";
      else {
        console.log("TODO: Not Merchant & Not Customer " + this.oLoginService.getUserType());
        return;
      }
    return this.http.get(s)
      .map(res => res.json()).toPromise();
  }
  getOrderDetails(tid: number) {
    var s = sURL;
    // if (this.isMerchant())
    //   s += "merchant/" + this.getUserID() + "/orders";
    // else
    s += "customer/" + tid + "/orderdetails";
    return this.http.get(s)
      .map(res => res.json()).toPromise();
  }
  profile(data: any) {
    //console.log ( "About 2 POST " + JSON.stringify(data)) ;
    let s = sURL + "profile";
    return this.http.post(s, data)
      .map(res => res.json()).toPromise();
  }
  getProfile() {
    let s = sURL + "profile/" + this.oLoginService.getUserID();
    return this.http.get(s)
      .map(res => res.json()).toPromise();
  }
  updateProfile(data: any) {
    let s = sURL + "update/profile/" + this.oLoginService.getUserID();
    return this.http.post(s, data)
      .map(res => res.json()).toPromise();
  }
}



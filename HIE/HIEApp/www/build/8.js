webpackJsonp([8],{

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IncomingOrderPageModule", function() { return IncomingOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__incoming_order__ = __webpack_require__(940);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IncomingOrderPageModule = /** @class */ (function () {
    function IncomingOrderPageModule() {
    }
    IncomingOrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__incoming_order__["a" /* IncomingOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__incoming_order__["a" /* IncomingOrderPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__incoming_order__["a" /* IncomingOrderPage */]
            ]
        })
    ], IncomingOrderPageModule);
    return IncomingOrderPageModule;
}());

//# sourceMappingURL=incoming-order.module.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderDetailsPage = /** @class */ (function () {
    function OrderDetailsPage(navCtrl, navParams, oAPIService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oAPIService = oAPIService;
        this.oTID = '';
        this.o = {};
        this.bLoaded = false;
        this.oTID = navParams.get("TID");
        this.o = navParams.get("Transaction");
        this.o.COMMENT = 'Test Comment';
        this.bLoaded = true;
        console.log(JSON.stringify(this.o));
    }
    OrderDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    OrderDetailsPage.prototype.ionViewDidLoad = function () {
        //    this.getDetails() ;
    };
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
    OrderDetailsPage.prototype.changeOrderStatus = function () {
        var _this = this;
        this.oAPIService.send2ServerP("merchant/confirm/" + this.o.ID, true, { 'COMMENT': this.o.COMMENT }).then(function (data) {
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        }).then(function () {
            _this.navCtrl.pop();
        });
    };
    OrderDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-details',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-details/order-details.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="back"></ion-icon>\n    </button>\n    <ion-title>Order detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div *ngIf="bLoaded">\n    <div class="ksd-spacer-36">\n    </div>\n    <ion-item no-lines no-padding>\n      <ion-row>\n        <ion-col no-padding col-5>\n          <div class="ksd-name">{{o.CUSTOMER_NAME}}</div>\n        </ion-col>\n        <ion-col no-padding col-7>\n          <div class="ksd-order-number">Order No. {{o.BOOKINGREF}}</div>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col no-padding col-5>\n          <div class="ksd-date">{{o.PICKUPON | date: \'dd MMM yyyy\'}}</div>\n        </ion-col>\n        <ion-col no-padding col-7>\n          <div class="ksd-time">{{o.PICKUPTIME}}\n            <!--{{o.PICKUPSTART}} - {{o.PICKUPEND}}-->\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n    <ion-item-divider no-padding></ion-item-divider>\n    <div class="ksd-spacer-26">\n    </div>\n    <ion-row no-padding *ngFor="let oD of o._D;">\n      <ion-col col-8 no-padding>\n        <div class="ksd-details">\n          {{oD.QUANTITY}} x {{oD.TITLE}}</div>\n      </ion-col>\n      <ion-col col-4 text-right no-padding>\n        <div class="ksd-details">\n          $ {{oD.DISCOUNTEDPRICE}}</div>\n      </ion-col>\n    </ion-row>\n    <div class="ksd-spacer-26"></div>\n    <ion-item-divider no-padding></ion-item-divider>\n    <ion-row class="ksd-total">\n      <ion-col col-8 no-padding>\n        <div class="ksd-details">Total:</div>\n      </ion-col>\n      <ion-col col-4 text-right no-padding>\n        <div class="ksd-details">${{o.AMOUNTPAID}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-item-divider no-padding></ion-item-divider>\n    <div class="ksd-spacer-65">\n    </div>\n    <ion-label class="ksd-comment">COMMENT</ion-label>\n    <textarea no-padding class="ksd-comment-text" [(ngModel)]="o.COMMENT" name="comment"></textarea>\n  </div>\n</ion-content>\n<ion-footer>\n  <button primary ion-button full (click)="changeOrderStatus()"><p class="ksd-anchor-button">Confirm order</p></button>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-details/order-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */]])
    ], OrderDetailsPage);
    return OrderDetailsPage;
}());

//# sourceMappingURL=order-details.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IncomingOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_details_order_details__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { lookupStatus } from '../../app/properties';
var IncomingOrderPage = /** @class */ (function () {
    function IncomingOrderPage(navCtrl, viewCtrl, oAPIService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.oAPIService = oAPIService;
        this.oItems = [];
        this.bLoaded = false;
        this.sErrorText = 'No Pending Order';
    }
    IncomingOrderPage.prototype.ionViewDidEnter = function () {
        this.fetchItems();
    };
    IncomingOrderPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
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
    IncomingOrderPage.prototype.fetchItems = function () {
        var _this = this;
        this.bLoaded = false;
        this.oItems = [];
        // this.iProcessed = 0;
        // this.iTotalEntries = 0;
        this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'P' }).then(function (data) {
            //      this.iTotalEntries = data.result.length;
            if (data.result.length == 0) {
                _this.oItemGroupedByDate = [];
                _this.bLoaded = true;
                return;
            }
            console.log(JSON.stringify(data.result));
            _this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
            _this.oItems = data.result;
            _this.oItems.forEach(function (obj, idx) {
                obj.PICKUPTIME = Object(__WEBPACK_IMPORTED_MODULE_4__app_properties__["e" /* lookupTime */])(obj.PICKUPSTART);
                if (idx == _this.oItems.length - 1) {
                    _this.oItemGroupedByDate = _this.groupByDate();
                    _this.bLoaded = true;
                }
            });
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        });
    };
    IncomingOrderPage.prototype.nextPage = function () {
        var _this = this;
        this.navCtrl.push('ConfirmedOrderPage')
            .then(function () {
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    IncomingOrderPage.prototype.getStyle = function (sPickupOn) {
        return "ksd-back-1";
    };
    IncomingOrderPage.prototype.groupByDate = function () {
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
    };
    IncomingOrderPage.prototype.changeOrderStatus = function (oItem) {
        var _this = this;
        this.oAPIService.send2ServerP("merchant/confirm/" + oItem.TRANSACTION_ID, true).then(function (data) {
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        }).then(function () {
            _this.fetchItems();
        });
    };
    IncomingOrderPage.prototype.showOrderDetails = function (oItem) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_details_order_details__["a" /* OrderDetailsPage */], { 'TID': oItem.ID, 'Transaction': oItem });
    };
    IncomingOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-incoming-order',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/incoming-order/incoming-order.html"*/'<ion-header align-title="center">\n\n  <ion-navbar>\n    <ion-title>Incoming Order</ion-title>\n    <button ion-button menuToggle (click)="goBack()">\n      <ion-icon name="back"></ion-icon>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div *ngIf="bLoaded">\n    <div *ngIf="oItemGroupedByDate.length == 0">\n      <p class="ksd-no-result">{{sErrorText}}</p>\n    </div>\n    <div no-padding *ngFor="let g of oItemGroupedByDate">\n      <div class="ksd-date">{{g.PICKUPON | date: \'dd MMM yyyy\'}}</div>\n      <ion-card padding [class]="getStyle(g.PICKUPON)" *ngFor="let o of g.data;" ion-item>\n        <ion-row class="ksd-padding">\n          <ion-col col-3>\n            <div class="ksd-time">{{o.PICKUPTIME}}</div>\n          </ion-col>\n          <ion-col col-3>\n            <div class="ksd-name">{{o.CUSTOMER_NAME}}</div>\n          </ion-col>\n          <ion-col col-6 item-right>\n            <div class="ksd-order-number">Order No. {{o.BOOKINGREF}}</div>\n          </ion-col>\n        </ion-row>\n        <ion-item no-padding ion-item [class]="getStyle(g.PICKUPON)" *ngFor="let oD of o._D; let i = index;">\n          <ion-item no-padding item-left [class]="getStyle(g.PICKUPON)">\n            <div class="ksd-details" (click)="showOrderDetails(o)">{{oD.QUANTITY}} x {{oD.TITLE}}</div>\n            <button align-right ion-button round *ngIf="i == o._D.length - 1" class="ksd-round-button" item-right (click)="changeOrderStatus(oD)">Confirm</button>\n          </ion-item>\n        </ion-item>\n        <ion-item no-lines *ngIf="i == o._D.length - 1" [class]="getStyle(g.PICKUPON)">\n          <div style="padding-bottom: 20px"></div>\n        </ion-item>\n        <!--<ion-item no-lines class="ksd-spacer ksd-card">\n        </ion-item>-->\n      </ion-card>\n      <div style="padding-bottom: 20px;" [class]="getStyle(g.PICKUPON)"></div>\n    </div>\n  </div>\n\n\n  <!--<div *ngIf="bLoaded">\n    <ion-list>\n      <ion-item  *ngFor="let o of oItems; let i = index">\n        <div>{{o.PICKUPON}}</div>\n        <div>\n      </ion-item>\n    </ion-list>\n    <ion-list>\n      <ion-item *ngFor="let o of oItems; let i = index">\n        <p>{{o.PICKUPON}}<br>\n          <p>\n            <p>{{o.PICKUPSTART}} - {{o.PICKUPEND}} {{o.CUSTOMER_NAME}} {{o.BOOKINGREF}}</p>\n            <ion-item>\n              <ion-row *ngFor="let oD of o.DETAILS; let i = index;">\n                <ion-col no-padding>\n                  <ion-row>\n                    <ion-col>\n                      <span text-left class="ksd-merchant">{{oD.QUANTITY}} x {{oD.TITLE}}</span>\n                      <span text-right *ngIf="i == o.DETAILS.length - 1">\n                        <ion-badge item-right (click)="changeOrderStatus(oD)">Confirm</ion-badge>\n                      </span>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-item>\n      </ion-item>\n    </ion-list>\n  </div>-->\n</ion-content>\n<ion-footer>\n  <button primary ion-button full (click)="nextPage()">\n    <p class="ksd-anchor-button"> View confirmed order</p>\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/incoming-order/incoming-order.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */]])
    ], IncomingOrderPage);
    return IncomingOrderPage;
}());

//# sourceMappingURL=incoming-order.js.map

/***/ })

});
//# sourceMappingURL=8.js.map
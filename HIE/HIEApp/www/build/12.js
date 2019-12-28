webpackJsonp([12],{

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersPageModule", function() { return OrdersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orders__ = __webpack_require__(949);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrdersPageModule = /** @class */ (function () {
    function OrdersPageModule() {
    }
    OrdersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__orders__["a" /* OrdersPage */]
            ]
        })
    ], OrdersPageModule);
    return OrdersPageModule;
}());

//# sourceMappingURL=orders.module.js.map

/***/ }),

/***/ 949:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_calendar__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { NgZone } from '@angular/core';




//import { sIMAGE_URL } from '../../app/properties';






//import * as moment from 'moment';
var OrdersPage = /** @class */ (function () {
    function OrdersPage(
    //public zone: NgZone, 
    navCtrl, oAPIService, loadingCtrl, oCalendar, oDiagnostic, oLoginService) {
        this.navCtrl = navCtrl;
        this.oAPIService = oAPIService;
        this.loadingCtrl = loadingCtrl;
        this.oCalendar = oCalendar;
        this.oDiagnostic = oDiagnostic;
        this.oLoginService = oLoginService;
        this.oItems = [];
        this.bLoaded = false;
        this.bShowUpcoming = true;
        this.sErrorText = 'NO RESULT';
        this.options = {
            firstReminderMinutes: 5
        };
        this.oCheckReminders = [];
        // oCalendar.listCalendars().then((data) => {
        //   console.log("OLD List: " + JSON.stringify(data));
        // });
        // oCalendar.createCalendar('HIE-Calendar').then((d) => {
        //   oCalendar.listCalendars().then((data) => {
        //     console.log("NEW List: " + JSON.stringify(data));
        //   });
        // });
        __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].sCurrentPage = 'My transaction';
    }
    OrdersPage.prototype.ionViewDidLoad = function () {
        this.loadUpcoming(true);
    };
    OrdersPage.prototype.getColor = function (oItem) {
        if (oItem.STATUS == 'P')
            return "red";
        if (oItem.STATUS == 'C')
            return "green";
    };
    OrdersPage.prototype.onRemindMe = function (oItem) {
        var _this = this;
        this.oDiagnostic.isCalendarAuthorized().then(function (authorized) {
            if (authorized)
                _this.setReminder(oItem);
        });
    };
    OrdersPage.prototype.getStartDate = function (oItem) {
        var STARTDATE = this.oAPIService.stringToDate(oItem.PICKUPON, "yyyy-mm-dd", "-");
        var STARTTIME = Object(__WEBPACK_IMPORTED_MODULE_4__app_properties__["c" /* getStartTime */])(oItem.PICKUPSTART);
        return this.oAPIService.setTime24Hrs(STARTDATE, STARTTIME);
    };
    OrdersPage.prototype.formulateEventInfo = function (oItem) {
        var oEvent = {};
        oEvent.TITLE = 'HIEarly - Collection';
        oEvent.NOTES = oItem.NAME + ' ' + oItem.BOOKINGREF;
        oEvent.STARTDATE = this.getStartDate(oItem);
        oEvent.ENDDATE = oEvent.STARTDATE;
        return oEvent;
    };
    OrdersPage.prototype.setReminder = function (oItem) {
        var e = this.formulateEventInfo(oItem);
        this.oCalendar.createEventWithOptions(e.TITLE, null, e.NOTES, e.STARTDATE, e.ENDDATE, this.options).then(function (data) {
            oItem.REMIND = 'N';
        }).catch(function (err) {
            oItem.REMIND = 'Y';
        });
    };
    OrdersPage.prototype.checkCalendar = function (oItems) {
        var _this = this;
        return oItems.reduce(function (oPromise, oItem) {
            return oPromise.then(function (data) {
                return _this.checkReminderSet(oItem).then(function (data) {
                    if (data.length == 0)
                        oItem.REMIND = 'Y';
                    else
                        oItem.REMIND = 'N';
                    // console.error("Lookup of Event: " + JSON.stringify(data) + " => " + JSON.stringify(data));
                }).catch(function (err) {
                    console.error(JSON.stringify(err));
                });
            });
        }, Promise.resolve());
    };
    //  @synchronize()
    OrdersPage.prototype.checkReminderSet = function (oItem) {
        var e = this.formulateEventInfo(oItem);
        //    console.log("Checking: " + JSON.stringify(e));
        return this.oCalendar.findEvent(e.TITLE, null, e.NOTES, e.STARTDATE, e.ENDDATE);
    };
    OrdersPage.prototype.showUpcoming = function () {
        var _this = this;
        this.oAPIService.send2ServerP("customer/orders").then(function (data) {
            _this.oItems = data.result;
            _this.updateStatusMessage(true);
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
            _this.bLoaded = true;
            _this.loading.dismissAll();
        });
    };
    OrdersPage.prototype.updateStatusMessage = function (b) {
        var _this = this;
        if (this.oItems.length == 0) {
            this.bShowUpcoming = b;
            this.bLoaded = true;
            this.loading.dismissAll();
            return;
        }
        this.oCheckReminders = [];
        this.oAPIService.sort(this.oItems, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
        this.oItems.forEach(function (obj, idx) {
            if (obj.STATUS == 'C') {
                obj.REMIND = 'Y';
                //         if (this.oAPIService.isFuture(this.getStartDate(obj))) {
                _this.oCheckReminders.push(obj);
                //        }
            }
            obj.PICKUPTIME = Object(__WEBPACK_IMPORTED_MODULE_4__app_properties__["e" /* lookupTime */])(obj.PICKUPSTART);
            obj.STATUS_MESSAGE = Object(__WEBPACK_IMPORTED_MODULE_4__app_properties__["d" /* lookupStatus */])(obj.STATUS);
            if (idx == _this.oItems.length - 1) {
                _this.bShowUpcoming = b;
                if (_this.oCheckReminders.length > 0) {
                    _this.checkCalendar(_this.oCheckReminders).then(function (d) {
                        _this.loading.dismissAll();
                        _this.bLoaded = true;
                    }).catch(function (err) {
                        _this.loading.dismissAll();
                        _this.bLoaded = true;
                        console.log("ERROR: " + JSON.stringify(err));
                    });
                }
                else {
                    _this.loading.dismissAll();
                    _this.bLoaded = true;
                }
            }
        });
    };
    OrdersPage.prototype.showHistory = function () {
        var _this = this;
        this.oAPIService.send2ServerP("customer/orderhistory").then(function (data) {
            console.log(JSON.stringify(data));
            _this.oItems = data.result;
            _this.updateStatusMessage(false);
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
            _this.loading.dismissAll();
        });
    };
    OrdersPage.prototype.loadUpcoming = function (b) {
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
    };
    OrdersPage.prototype.getMenuClass = function (b) {
        if (b == this.bShowUpcoming)
            return "ksd-menu-options-selected";
        return "ksd-menu-options";
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-orders',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/orders/orders.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="hie-menu"></ion-icon>\n    </button>\n    <ion-title>My transaction</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content overflow-scroll="false">\n  <!--   <ion-searchbar [(ngModel)]="sText" (ionInput)="onSearchInput()" [formControl]="searchControl"></ion-searchbar>\n  <div *ngIf="bSearching" class="spinner-container">\n    <ion-spinner></ion-spinner>\n  </div>\n -->\n  <div class="ksd-spacer"></div>\n  <!-- <ion-item> -->\n  <!--<ion-segment-button value="Upcoming" (click)="loadUpcoming(false)">\n        </ion-segment-button>\n        <ion-segment-button value="History" (click)="loadUpcoming(false)">\n        </ion-segment-button>-->\n  <ion-item no-padding>\n    <ion-row no-padding class="ksd-options">\n      <ion-col no-padding width-50 text-center align-center>\n        <button ion-button outline clear full (click)="loadUpcoming(true)" [class]="getMenuClass(true)">Upcoming</button>\n      </ion-col>\n      <ion-col no-padding width-50 text-center align-center>\n        <button ion-button outline clear full (click)="loadUpcoming(false)" class="ksd-menu-options" [class]="getMenuClass(false)">History</button>\n      </ion-col>\n    </ion-row>\n    <!-- <ion-item-divider no-padding></ion-item-divider> -->\n  </ion-item>\n  <div *ngIf="bLoaded">\n    <div *ngIf="oItems.length == 0">\n      <p class="ksd-no-result">{{sErrorText}}</p>\n    </div>\n    <!-- <div no-padding *ngIf="oCheckReminders.length == 0"> -->\n    <div no-padding *ngFor="let o of oItems; let i = index">\n      <ion-row no-padding class="ksd-options ksd-bottom-space">\n        <ion-col no-padding col-3>\n          <div class="ksd-date">{{o.PICKUPON | date: \'dd MMM yyyy\'}}</div>\n        </ion-col>\n        <ion-col no-padding col-1>\n          <div no-padding class="ksd-date">|</div>\n        </ion-col>\n        <ion-col no-padding col-7 text-left>\n          <div class="ksd-time">{{o.PICKUPTIME}}</div>\n        </ion-col>\n        <ion-col width-80></ion-col>\n      </ion-row>\n      <!--<ion-item-divider no-padding></ion-item-divider>-->\n      <ion-item no-padding>\n        <ion-row no-padding class="ksd-card">\n          <ion-col width-90 col-4 class="ksd-order">Order Number : {{o.BOOKINGREF}}\n            <ion-row no-padding>\n              <ion-col no-padding col-8 class="ksd-outlet">{{o.NAME}}\n                <span class="ksd-order-status">|{{o.STATUS_MESSAGE}}</span>\n              </ion-col>\n              <!-- <ion-col no-padding col-3 text-right align-right class="ksd-order-status">| {{o.STATUS_MESSAGE}}</ion-col> -->\n              <!-- <ion-col no-padding col-3 text-left align-left class="ksd-order-status">| {{o.STATUS_MESSAGE}}</ion-col> -->\n            </ion-row>\n            <!--<div class="ksd-outlet">{{o.NAME}} |\n              <span class="ksd-order-status">  {{o.STATUS_MESSAGE}}</span>\n            </div>-->\n          </ion-col>\n          <ion-col width-10></ion-col>\n          <ion-col width-10 *ngIf="bShowUpcoming">\n            <button align-right ion-button round (click)="onRemindMe(o)" class="ksd-round-button" item-right *ngIf="o.REMIND == \'Y\'">Remind me</button>\n            <button align-right ion-button round class="ksd-round-button" item-right *ngIf="o.REMIND == \'C\'">Checking...</button>\n          </ion-col>\n        </ion-row>\n        <ion-row no-padding class="ksd-options" no-padding *ngFor="let oD of o._D">\n          <ion-col class="ksd-image-width">\n            <img class="ksd-image" [src]="oAPIService.buildImageURL(oD,o.MUSERS_ID)" /> </ion-col>\n          <ion-col width-80>\n            <ion-row>\n              <ion-col class="ksd-details">\n                {{oD.QUANTITY}} x {{oD.TITLE}}\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col class="ksd-price">\n                ${{oD.DISCOUNTEDPRICE |number:\'1.2\'}}\n              </ion-col>\n            </ion-row>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </div>\n    <!-- </div> -->\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/orders/orders.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_3__providers_login_service__["a" /* LoginService */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ })

});
//# sourceMappingURL=12.js.map
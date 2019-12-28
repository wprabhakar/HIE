webpackJsonp([14],{

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderHistoryPageModule", function() { return OrderHistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_history__ = __webpack_require__(947);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrderHistoryPageModule = /** @class */ (function () {
    function OrderHistoryPageModule() {
    }
    OrderHistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order_history__["a" /* OrderHistoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__order_history__["a" /* OrderHistoryPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__order_history__["a" /* OrderHistoryPage */]
            ]
        })
    ], OrderHistoryPageModule);
    return OrderHistoryPageModule;
}());

//# sourceMappingURL=order-history.module.js.map

/***/ }),

/***/ 947:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_properties__ = __webpack_require__(24);
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
var OrderHistoryPage = /** @class */ (function () {
    function OrderHistoryPage(navCtrl, oAPIService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.oAPIService = oAPIService;
        this.loadingCtrl = loadingCtrl;
        this.oItems = [];
        this.bLoaded = false;
        this.bSearching = false;
        this.sText = '';
        this.oAllItems = [];
        this.sErrorText = 'NO RESULT';
    }
    OrderHistoryPage.prototype.ionViewDidLoad = function () {
        this.fetchItems();
    };
    OrderHistoryPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    OrderHistoryPage.prototype.fetchItems = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'loading...',
        });
        this.loading.present();
        this.oItems = [];
        this.oAllItems = [];
        this.bLoaded = false;
        this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'D' }).then(function (data) {
            if (data.result.length == 0) {
                _this.oItemGroupedByDate = [];
                _this.loading.dismissAll();
                _this.bLoaded = true;
                return;
            }
            _this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
            _this.oItems = data.result;
            _this.oAllItems = data.result;
            _this.oItems.forEach(function (obj, idx) {
                obj.PICKUPTIME = Object(__WEBPACK_IMPORTED_MODULE_3__app_properties__["e" /* lookupTime */])(obj.PICKUPSTART);
                if (idx == _this.oItems.length - 1) {
                    _this.oItemGroupedByDate = _this.groupByDate();
                    _this.loading.dismissAll();
                    _this.bLoaded = true;
                }
            });
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
            _this.loading.dismissAll();
        });
    };
    OrderHistoryPage.prototype.groupByDate = function () {
        var groups = this.oItems.reduce(function (o, a) {
            var m = a.PICKUPON;
            (o[m]) ? o[m].data.push(a) : o[m] = { PICKUPON: m, data: [a] };
            return o;
        }, {});
        var result = Object.keys(groups).map(function (k) {
            return groups[k];
        });
        return result;
    };
    OrderHistoryPage.prototype.getStyle = function (sPickupOn) {
        //  console.log ( sPickupOn ) ;
        var inputDate = new Date(sPickupOn);
        var todaysDate = new Date();
        var bToday = (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
        if (bToday)
            return "ksd-back-1";
        return "ksd-back-2";
    };
    OrderHistoryPage.prototype.getColor = function (sPickupOn) {
        var inputDate = new Date(sPickupOn);
        var todaysDate = new Date();
        var bToday = (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
        if (bToday)
            return "#E4FCF7";
        return "#FFE5E5";
    };
    OrderHistoryPage.prototype.onSearchInput = function () {
        this.bSearching = true;
        this.oItems = this.filterItems(this.sText);
        this.oItemGroupedByDate = this.groupByDate();
        this.bSearching = false;
    };
    OrderHistoryPage.prototype.filterItems = function (sText) {
        if (sText.length == 0)
            return this.oAllItems;
        return this.oAllItems.filter(function (item) {
            if (item.CUSTOMER_NAME.toLowerCase().indexOf(sText.toLowerCase()) > -1)
                return true;
            if (item.BOOKINGREF.indexOf(sText) > -1)
                return true;
            return false;
        });
    };
    OrderHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-history',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-history/order-history.html"*/'<ion-header>\n\n  <ion-navbar>\n    <!--<button ion-button menuToggle>\n      <ion-icon name="hie-back"></ion-icon>\n    </button>-->\n    <ion-title>Order history</ion-title>\n    <button ion-button menuToggle (click)="goBack()">\n      <ion-icon name="back"></ion-icon>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div *ngIf="bLoaded">\n    <ion-item class="ksd-search-padding">\n      <div no-padding>\n        <ion-searchbar clear placeholder="Search" [(ngModel)]="sText" (ionInput)="onSearchInput()"></ion-searchbar>\n      </div>\n    </ion-item>\n\n    <div *ngIf="oItemGroupedByDate.length == 0">\n      <p class="ksd-no-result">{{sErrorText}}</p>\n    </div>\n    <!--<ion-list>-->\n    <div no-padding *ngFor="let g of oItemGroupedByDate">\n      <div class="ksd-date">{{g.PICKUPON | date: \'dd MMM yyyy\'}}</div>\n      <ion-card padding [class]="getStyle(g.PICKUPON)" *ngFor="let o of g.data;" ion-item>\n        <ion-row class="ksd-padding">\n          <ion-col col-3>\n            <div class="ksd-time">{{o.PICKUPTIME}}\n            </div>\n          </ion-col>\n          <ion-col col-3>\n            <div class="ksd-name">{{o.CUSTOMER_NAME}}</div>\n          </ion-col>\n          <ion-col col-6 item-right>\n            <div class="ksd-order-number">Order No. {{o.BOOKINGREF}}</div>\n          </ion-col>\n        </ion-row>\n        <ion-item no-padding [class]="getStyle(g.PICKUPON)" ion-item *ngFor="let oD of o._D;">\n          <ion-item no-padding [class]="getStyle(g.PICKUPON)">\n            <div class="ksd-details">{{oD.QUANTITY}} x {{oD.TITLE}}</div>\n          </ion-item>\n        </ion-item>\n        <ion-item no-lines [class]="getStyle(g.PICKUPON)">\n        </ion-item>\n      </ion-card>\n      <div style="padding-bottom: 20px;" [class]="getStyle(g.PICKUPON)"></div>\n    </div>\n    <!--</ion-list>-->\n  </div>\n  <!--<div *ngIf="bLoaded">\n    <ion-list>\n      <ion-item *ngFor="let o of oItems; let i = index">\n        <p>{{o.PICKUPON}}<br>\n          <p>\n            <p>{{o.PICKUPSTART}} - {{o.PICKUPEND}} {{o.CUSTOMER_NAME}} {{o.BOOKINGREF}}</p>\n            <ion-item>\n              <ion-row *ngFor="let oD of o.DETAILS; let i = index;">\n                <ion-col style="padding: 0px;">\n                  <ion-row>\n                    <ion-col>\n                      <span text-left class="ksd-merchant">{{oD.QUANTITY}} x {{oD.TITLE}}\n                      </span>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </ion-item>\n      </ion-item>\n    </ion-list>\n  </div>-->\n</ion-content>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-history/order-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], OrderHistoryPage);
    return OrderHistoryPage;
}());

//# sourceMappingURL=order-history.js.map

/***/ })

});
//# sourceMappingURL=14.js.map
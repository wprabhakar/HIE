webpackJsonp([13],{

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryPageModule", function() { return OrderSummaryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_summary__ = __webpack_require__(948);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrderSummaryPageModule = /** @class */ (function () {
    function OrderSummaryPageModule() {
    }
    OrderSummaryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order_summary__["a" /* OrderSummaryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__order_summary__["a" /* OrderSummaryPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__order_summary__["a" /* OrderSummaryPage */]
            ]
        })
    ], OrderSummaryPageModule);
    return OrderSummaryPageModule;
}());

//# sourceMappingURL=order-summary.module.js.map

/***/ }),

/***/ 948:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderSummaryPage; });
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


//import { IncomingOrderPage } from '../incoming-order/incoming-order';
//import { OrderHistoryPage } from '../order-history/order-history';


var OrderSummaryPage = /** @class */ (function () {
    function OrderSummaryPage(navCtrl, navParams, oAPIService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oAPIService = oAPIService;
        //  oItems: any[] = [];
        this.bLoaded = false;
        this.oItem = {
            INCOMING_ORDER: 0,
            CONFIRMED_ORDER: 0,
            HISTORY_ORDER: 0
        };
        __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].sCurrentPage = 'Orders';
    }
    OrderSummaryPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.fetchItems();
    };
    OrderSummaryPage.prototype.fetchItems = function () {
        var _this = this;
        //    this.oItems = [];
        this.bLoaded = false;
        this.oItem.INCOMING_ORDER = 0;
        this.oItem.CONFIRMED_ORDER = 0;
        this.oItem.HISTORY_ORDER = 0;
        this.oAPIService.send2ServerP("ordersummary").then(function (data) {
            var n = data.result.length - 1;
            data.result.forEach(function (obj, i) {
                if (obj.STATUS == 'P')
                    _this.oItem.INCOMING_ORDER = obj.TC;
                else if (obj.STATUS == 'C')
                    _this.oItem.CONFIRMED_ORDER = obj.TC;
                else if (obj.STATUS == 'D')
                    _this.oItem.HISTORY_ORDER = obj.TC;
                if (i >= n) {
                    //          this.oItems = data.result;
                    _this.bLoaded = true;
                }
            });
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        });
    };
    OrderSummaryPage.prototype.onIncomingOrder = function () {
        this.navCtrl.push('IncomingOrderPage');
    };
    OrderSummaryPage.prototype.onConfirmedOrder = function () {
        this.navCtrl.push('ConfirmedOrderPage');
    };
    OrderSummaryPage.prototype.onHistoryOrder = function () {
        this.navCtrl.push('OrderHistoryPage');
    };
    OrderSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-summary',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-summary/order-summary.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="hie-menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Order</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content text-center padding>\n  <div no-padding *ngIf="bLoaded">\n    <div class="ksd-spacer"></div>\n    <ion-card class="incoming-order" (click)="onIncomingOrder()" padding style="padding-bottom: 0px">\n      <div style="vertical-align: center">\n        <div class="ksd-number">{{oItem.INCOMING_ORDER}}</div>\n        <div class="ksd-text">Incoming order</div>\n      </div>\n    </ion-card>\n    <div class="ksd-spacer-1"></div>\n\n    <ion-card class="confirmed-order" (click)="onConfirmedOrder()" padding style="padding-bottom: 0px">\n      <div style="vertical-align: center">\n        <div class="ksd-number-black">{{oItem.CONFIRMED_ORDER}}</div>\n        <div class="ksd-text-black">Confirmed order<br></div>\n      </div>\n    </ion-card>\n    <div class="ksd-spacer-1"></div>\n    <ion-card class="history-order" (click)="onHistoryOrder()" padding style="padding-bottom: 0px">\n      <div style="vertical-align: center">\n        <div class="ksd-number">{{oItem.HISTORY_ORDER}}</div>\n        <div class="ksd-text">History order<br></div>\n      </div>\n    </ion-card>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/order-summary/order-summary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */]])
    ], OrderSummaryPage);
    return OrderSummaryPage;
}());

//# sourceMappingURL=order-summary.js.map

/***/ })

});
//# sourceMappingURL=13.js.map
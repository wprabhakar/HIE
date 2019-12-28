webpackJsonp([15],{

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailsPageModule", function() { return OrderDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_details__ = __webpack_require__(883);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrderDetailsPageModule = /** @class */ (function () {
    function OrderDetailsPageModule() {
    }
    OrderDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order_details__["a" /* OrderDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__order_details__["a" /* OrderDetailsPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__order_details__["a" /* OrderDetailsPage */]
            ]
        })
    ], OrderDetailsPageModule);
    return OrderDetailsPageModule;
}());

//# sourceMappingURL=order-details.module.js.map

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

/***/ })

});
//# sourceMappingURL=15.js.map
webpackJsonp([18],{

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountDetailsPageModule", function() { return DiscountDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discount_details__ = __webpack_require__(937);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DiscountDetailsPageModule = /** @class */ (function () {
    function DiscountDetailsPageModule() {
    }
    DiscountDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__discount_details__["a" /* DiscountDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__discount_details__["a" /* DiscountDetailsPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__discount_details__["a" /* DiscountDetailsPage */]
            ]
        })
    ], DiscountDetailsPageModule);
    return DiscountDetailsPageModule;
}());

//# sourceMappingURL=discount-details.module.js.map

/***/ }),

/***/ 937:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscountDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_service__ = __webpack_require__(47);
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

//import { EventEmitter } from '@angular/core';

//import {  Modal,  ViewController, ModalController } from 'ionic-angular';


//import { sIMAGE_URL } from '../../app/properties';

var DiscountDetailsPage = /** @class */ (function () {
    //  o: any = {} ;
    function DiscountDetailsPage(navCtrl, oAPIService, navParams, oCartService) {
        this.navCtrl = navCtrl;
        this.oAPIService = oAPIService;
        this.navParams = navParams;
        this.oCartService = oCartService;
        this.oMerchant = {};
        this.collectionDate = '';
        this.collectionTime = '';
        this.oItem = {};
        this.collectionDate = __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].collectionDate;
        this.collectionTime = __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].collectionTime;
        this.oMerchant = navParams.get("oMerchant");
        this.oItem = navParams.get("oItem");
        this.oItem.qty = 1;
        this.oItem.USUAL_PRICE = this.oItem.USUAL_PRICE;
        this.oItem.DISCOUNT = Math.round(this.oItem.RATE) / 100;
        this.oItem.DAYS = this.oItem.ADVANCE_DAYS;
        /*
            this.oMerchant.IMAGEURL = 'http://lorempixel.com/200/300';
            this.oMerchant.NAME = 'Pastamania - Centuary Hall';
            this.oMerchant.ADDRESS_1 = '4 Tampines Central S, 04-21/22';
            this.oMerchant.ADDRESS_2 = 'Tampines Mall, Singapore 529510';
            let me = this;
            this.oItem = {
              IMAGE_URL: 'http://lorempixel.com/200/300', NAME: 'Garlick Butter Prawns',
              DESCRIPTION: 'Prawn, chilli, garlic and diced tomatoes tossed in olive oil with spicy sauce',
              USUAL_PRICE: '25.00',
              DISCOUNT: '0.50',
              DAYS: '5',
              qty: 1
            };
            this.o = this.oItem ;
        */
    }
    DiscountDetailsPage.prototype.getUnitPrice = function () {
        return Math.round(+this.oItem.USUAL_PRICE * (1 - +this.oItem.DISCOUNT) * 100) / 100;
    };
    DiscountDetailsPage.prototype.getAmount = function () {
        return +this.oItem.qty * this.getUnitPrice();
    };
    DiscountDetailsPage.prototype.adjustItemQty = function (oItem, qty) {
        oItem.qty += qty;
    };
    DiscountDetailsPage.prototype.add2Cart = function (oItem) {
        this.oCartService.addItem(oItem);
        this.navCtrl.pop();
    };
    DiscountDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DiscountDetailsPage.prototype.getImageURL = function (oItem) {
        return this.oAPIService.buildImageURL(oItem, this.oMerchant.ID, '156h_');
        // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
        //   oItem.IMAGE_URL = this.oMerchant.IMAGE_URL;
        // let img = oItem.IMAGE_URL;
        // if (img.startsWith('http://') ||
        //   img.startsWith('https://'))
        //   return img;
        // return sIMAGE_URL + this.oMerchant.ID + "/" + img;
    };
    DiscountDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-discount-details',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/discount-details/discount-details.html"*/'<!--<ion-header>\n  <ion-navbar style="padding:0px">\n    <ion-title style="padding:0px">\n      <lazy-image class="expanded-image" src="{{getImageURL(oMerchant)}}"> </lazy-image>\n      <span>{{oMerchant.NAME}}</span></ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n<ion-content no-header>\n  <!--<div class="ksd-spacer"></div>-->\n  <div class="background-image" [style.backgroundImage]="\'url(\' + getImageURL(oItem) + \')\'">\n      <!-- class="top-button"  -->\n    <button ion-button icon-only clear  class="top-left-button-2" (click)="goBack()">\n        <ion-icon name="close"></ion-icon>\n    </button>\n  </div>\n  <!--<div class="ksd-image">\n    <img src="{{getImageURL(oItem)}}" width="100%" height="30%">\n    <button ion-button class="top-button" (click)="goBack()">\n        <ion-icon name="close"></ion-icon>\n    </button>\n  </div>-->\n  <ion-item>\n    <ion-row class="no-padding">\n      <ion-col>\n        <div class="ksd-name">{{oItem.TITLE}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-row class="no-padding">\n      <ion-col text-wrap>\n        <div text-wrap class="ksd-description">{{oItem.DESCRIPTION}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item>\n    <ion-row no-padding>\n      <ion-col>\n        <div class="ksd-discount">{{(+oItem.DISCOUNT * 100)}}% OFF</div>\n        <div class="ksd-days">Order {{oItem.DAYS}} days early</div>\n      </ion-col>\n      <ion-col>\n        <div text-right class="ksd-usual-price">${{oItem.USUAL_PRICE | number:\'1.2\' }} </div>\n        <div text-right class="ksd-price">${{getUnitPrice() |number:\'1.2\' }}</div>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <div class="ion-segment">\n    <ion-row>\n      <ion-col no-padding col-4>\n        <div class="ksd-minus" *ngIf="oItem.qty > 1" (click)="adjustItemQty(oItem,-1)">-</div>\n      </ion-col>\n      <ion-col col-4>\n        <div class="ksd-qty">{{oItem.qty}}</div>\n      </ion-col>\n      <ion-col no-padding col-4>\n        <div class="ksd-plus-minus" (click)="adjustItemQty(oItem,1)">+</div>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n<ion-footer>\n  <ion-row class="footer-row" ion-button (click)="add2Cart(oItem)">\n    <ion-col class="footer-col-left">\n      {{oItem.qty}}\n    </ion-col>\n    <ion-col class="footer-col-center">\n      Add {{oItem.qty}} to Cart\n    </ion-col>\n    <ion-col class="footer-col-right ksd-right-padding">\n      <div>${{getAmount()|number:\'1.2\'}}</div>\n    </ion-col>\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/discount-details/discount-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_cart_service__["a" /* CartService */]])
    ], DiscountDetailsPage);
    return DiscountDetailsPage;
}());

//# sourceMappingURL=discount-details.js.map

/***/ })

});
//# sourceMappingURL=18.js.map
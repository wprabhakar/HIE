webpackJsonp([16],{

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantHomePageModule", function() { return MerchantHomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__merchant_home__ = __webpack_require__(942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MerchantHomePageModule = /** @class */ (function () {
    function MerchantHomePageModule() {
    }
    MerchantHomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_home__["a" /* MerchantHomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__merchant_home__["a" /* MerchantHomePage */]),
                __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__["MultiPickerModule"] //Import MultiPickerModule
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_home__["a" /* MerchantHomePage */]
            ]
        })
    ], MerchantHomePageModule);
    return MerchantHomePageModule;
}());

//# sourceMappingURL=merchant-home.module.js.map

/***/ }),

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login_service__ = __webpack_require__(41);
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




//import { sIMAGE_URL } from '../../app/properties';

//import { ElementRef, Renderer } from '@angular/core';
var MerchantHomePage = /** @class */ (function () {
    function MerchantHomePage(navCtrl, navParams, oAPIService, oLoginService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oAPIService = oAPIService;
        this.oLoginService = oLoginService;
        //  @ViewChild(Content) content: Content;
        this.start = 0;
        this.threshold = 100;
        this.slideHeaderPrevious = 0;
        this.bSearching = false;
        this.sText = '';
        this.oMerchant = {};
        this.bLoaded = false;
        this.oItems = [];
        this.oAllItems = [];
        __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].sCurrentPage = 'Home';
        this.oAPIService.send2ServerP("merchant").then(function (data) {
            _this.oMerchant = data.result[0];
        });
    }
    MerchantHomePage.prototype.loadProducts = function () {
        var _this = this;
        this.oAPIService.send2ServerP("products", false).then(function (data) {
            _this.oItems = data.result;
            _this.oAllItems = data.result;
            _this.bLoaded = true;
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        });
    };
    MerchantHomePage.prototype.ionViewDidLoad = function () {
        //    this.bLoaded = false;
    };
    MerchantHomePage.prototype.ionViewWillEnter = function () {
        this.bLoaded = false;
        this.oItems = [];
        this.oAllItems = [];
        this.loadProducts();
    };
    // getImageURL(oItem: any) {
    //   return this.oAPIService.buildImageURL(oItem,this.oLoginService.getUserID()) ;    
    //   // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
    //   //   oItem.IMAGE_URL = this.oMerchant.IMAGE_URL;
    //   // if (oItem.IMAGE_URL == null)
    //   //   return '';
    //   // let img = oItem.IMAGE_URL;
    //   // if (img.startsWith('http://') ||
    //   //   img.startsWith('https://'))
    //   //   return img;
    //   // return sIMAGE_URL + this.oLoginService.getUserID() + "/" + img;
    // }
    MerchantHomePage.prototype.onItemClick = function (o) {
        this.navCtrl.push('ViewMenuPage', { PRODUCT_ID: o.ID });
    };
    MerchantHomePage.prototype.addMenu = function () {
        this.navCtrl.push('AddMenuPage');
    };
    MerchantHomePage.prototype.onSearchInput = function () {
        this.bSearching = true;
        //    console.log ( "Searching: " + this.sText) ;
        //    this.filterItems(this.sText) ;
        this.oItems = this.filterItems(this.sText);
        //    console.log ( JSON.stringify ( this.oItems ) ) ;
        this.bSearching = false;
    };
    MerchantHomePage.prototype.filterItems = function (sText) {
        if (sText.length == 0)
            return this.oAllItems;
        return this.oAllItems.filter(function (item) {
            return item.TITLE.toLowerCase().indexOf(sText.toLowerCase()) > -1;
        });
    };
    MerchantHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-merchant-home',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-home/merchant-home.html"*/'<ion-header>\n  <!--ngClass="{\'hide-header\': bShowHeader, \'show-header\': bHideHeader}">-->\n\n  <!--For Full Screen<ion-navbar  *navbar>-->\n  <ion-navbar>\n\n    <ion-buttons left>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="hie-menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div *ngIf="bLoaded">\n    <ion-item no-padding>\n      <ion-row>\n        <ion-col no-padding class="ksd-col-head">\n          <img width="100" height="100" [src]="oAPIService.buildImageURL(oMerchant,oLoginService.getUserID())" />\n        </ion-col>\n        <ion-col no-padding>\n          <ion-row>\n            <ion-col no-padding class="ksd-merchant-name">\n              {{oMerchant.NAME}}\n            </ion-col>\n          </ion-row>\n          <ion-row no-padding>\n            <ion-col no-padding>\n              <section class="container">\n                <div class="one ksd-merchant-info-label">Location : </div>\n                <div class="two ksd-merchant-info">{{oMerchant.REGION}}</div>\n              </section>\n              <!--<div>Location:<div class="ksd-merchant-info">{{oMerchant.REGION}}</div></div>-->\n            </ion-col>\n          </ion-row>\n          <ion-row no-padding>\n            <ion-col no-padding>\n              <section class="container">\n                <div class="one ksd-merchant-info-label">Food type : </div>\n                <div class="two ksd-merchant-info">{{oMerchant.CUISINES}}</div>\n              </section>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n    <ion-item no-padding class="ksd-search-padding">\n      <!-- <div no-padding> -->\n        <ion-searchbar class="ksd-searchbar" clear placeholder="Search" [(ngModel)]="sText" (ionInput)="onSearchInput()"></ion-searchbar>\n      <!-- </div> -->\n    </ion-item>\n    <ion-item no-lines>\n      <div></div>\n    </ion-item>\n    <ion-item no-lines text-wrap *ngFor="let o of oItems">\n      <ion-row (click)="onItemClick(o)">\n          <ion-col class="ksd-image-width" no-padding>\n            <img class="ksd-image" [src]="oAPIService.buildImageURL(o,oLoginService.getUserID(),\'70h70w_\', true)" />\n          </ion-col>\n          <ion-col width-80>\n            <p class="ksd-title">{{o.TITLE}}</p>\n            <p class="ksd-description">{{o.DESCRIPTION}}</p>\n          </ion-col>\n      </ion-row>\n      <!--<ion-item-divider></ion-item-divider>-->\n    </ion-item>\n  </div>\n</ion-content>\n<ion-footer>\n  <button primary ion-button full (click)="addMenu()"><p class="ksd-anchor-button">Add menu</p></button>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-home/merchant-home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_login_service__["a" /* LoginService */]])
    ], MerchantHomePage);
    return MerchantHomePage;
}());

//# sourceMappingURL=merchant-home.js.map

/***/ })

});
//# sourceMappingURL=16.js.map
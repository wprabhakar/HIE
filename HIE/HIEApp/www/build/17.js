webpackJsonp([17],{

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantDiscountPageModule", function() { return MerchantDiscountPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__merchant_discount__ = __webpack_require__(941);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MerchantDiscountPageModule = /** @class */ (function () {
    function MerchantDiscountPageModule() {
    }
    MerchantDiscountPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_discount__["a" /* MerchantDiscountPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__merchant_discount__["a" /* MerchantDiscountPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ion_multi_picker__["MultiPickerModule"] //Import MultiPickerModule
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_discount__["a" /* MerchantDiscountPage */]
            ]
        })
    ], MerchantDiscountPageModule);
    return MerchantDiscountPageModule;
}());

//# sourceMappingURL=merchant-discount.module.js.map

/***/ }),

/***/ 941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantDiscountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_result_search_result__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { MultiPickerModule } from 'ion-multi-picker';



//import { LoginService } from '../../providers/login-service';
//import { sIMAGE_URL } from '../../app/properties';


var MerchantDiscountPage = /** @class */ (function () {
    function MerchantDiscountPage(navCtrl, navParams, oAPIService, 
    //    private readonly oLoginService: LoginService,
    oService, loadingCtrl, modalCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oAPIService = oAPIService;
        this.oService = oService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.oMerchant = {};
        this.collectionDate = '';
        this.collectionTime = '';
        this.oItems = [];
        this.bDisabled = true;
        this.oMinDate = new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000)).toISOString();
        this.oMaxDate = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString();
        this.bLoaded = false;
        this.oMID = 0;
        this.simpleColumns = [];
        if (__WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionDate == '') {
            __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionDate =
                __WEBPACK_IMPORTED_MODULE_6_moment__(this.oMinDate).format("YYYY-MM-DD");
        }
        this.collectionDate = __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionDate;
        this.collectionTime = __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionTime;
        this.simpleColumns = __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionTimes;
        this.oMID = __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].oMID; //Global_VnavParams.get("MerchantID");
    }
    ;
    ;
    MerchantDiscountPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //    this.loading.present();
        this.oAPIService.send2ServerP("merchant/" + this.oMID).then(function (data) {
            _this.oMerchant = data.result[0];
        });
        this.oAPIService.send2ServerP("products/" + this.oMID).then(function (data) {
            _this.oItems = data.result;
            _this.bLoaded = true;
            //      this.loading.dismissAll()
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
            //      this.loading.dismissAll()
        });
    };
    MerchantDiscountPage.prototype.dateChanged = function () {
        var _this = this;
        this.bLoaded = false;
        this.oItems = [];
        this.loading = this.loadingCtrl.create({
            content: 'loading...',
        });
        this.bDisabled = false;
        this.loading.present();
        __WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionDate = this.collectionDate;
        this.oAPIService.send2ServerP("products/" + this.oMID + "/" + this.collectionDate).then(function (data) {
            _this.oItems = data.result;
            _this.bLoaded = true;
            _this.loading.dismissAll();
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
            _this.loading.dismissAll();
        });
    };
    MerchantDiscountPage.prototype.onItemClick = function (o) {
        if (__WEBPACK_IMPORTED_MODULE_5__app_properties__["a" /* Global_Variables */].collectionDate == '') {
            console.log("Collection Date NOT Set");
            return;
        }
        //    this.oService.setID ( this.oMerchant.ID ) ;
        this.navCtrl.push('DiscountDetailsPage', { oMerchant: this.oMerchant, oItem: o });
    };
    MerchantDiscountPage.prototype.getImageURL = function (oItem) {
        return this.oAPIService.buildImageURL(oItem, this.oMerchant.ID);
        // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
        //   oItem.IMAGE_URL = this.oMerchant.IMAGE_URL;
        // let img = oItem.IMAGE_URL;
        // if (img.startsWith('http://') ||
        //   img.startsWith('https://'))
        //   return img;
        // return sIMAGE_URL + this.oMerchant.ID + "/" + img;
    };
    MerchantDiscountPage.prototype.openCart = function () {
        if (this.oService.calcTotalQty() == 0)
            return;
        this.navCtrl.push('ShoppingCartPage');
    };
    MerchantDiscountPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__search_result_search_result__["a" /* SearchResultPage */]);
    };
    MerchantDiscountPage.prototype.onReview = function () {
        this.navCtrl.setRoot('ReviewPage', { oMerchant: this.oMerchant });
    };
    MerchantDiscountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-merchant-discount',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-discount/merchant-discount.html"*/'<ion-content ksd-header *ngIf="bLoaded">\n  <div class="background-image" [style.backgroundImage]="\'url(\' + getImageURL(oMerchant) + \')\'">\n    <button ion-button icon-only (click)="goBack()" class="top-left-button-2">\n        <ion-icon name="close"></ion-icon>\n        <!-- <ion-icon name="hie-close-cross-black-circle"></ion-icon> -->\n      </button>\n  </div>\n  <div class="main-content" *ngIf="bLoaded">\n    <!--<div class="background-image" [style.backgroundImage]="\'url(\' + getImageURL(oMerchant) + \')\'">\n      <button ion-button icon-only class="top-button" (click)="goBack()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </div>-->\n    <!-- <ion-item no-lines></ion-item> -->\n    <div no-padding class="ksd-name-review">\n      <ion-row style="padding-top:7px">\n        <ion-col col-2>\n          <!-- <ion-icon align-center name="close"></ion-icon> -->\n        </ion-col>\n        <ion-col col-8>\n          {{oMerchant.NAME}}<br>{{oMerchant.ADDRESS}}\n        </ion-col>\n        <ion-col col-2>\n          <button ion-button outline clear full (click)="onReview()" class="ksd-review">REVIEWS</button>\n        </ion-col>\n      </ion-row>\n    </div>\n    <div style="padding:20px; padding-top:0px">\n      <!-- <ion-item-divider></ion-item-divider> -->\n      <div>\n        <button ion-button clear class="ksd-collection">\n          <ion-icon name="hie-calendar"></ion-icon>\n          <ion-datetime no-padding pull-left placeholder=\'Collection date\' displayFormat="DD-MMM-YYYY" min="{{oMinDate}}" max="{{oMaxDate}}" pickerFormat="DD MMM YYYY" [(ngModel)]="collectionDate" (ionChange)="dateChanged()"></ion-datetime>&nbsp;&nbsp;<span class="required"></span>\n        </button>\n        <ion-item-divider></ion-item-divider>\n        <!--</div>\n      <div class="no-padding">-->\n        <button ion-button clear class="ksd-collection">\n        <ion-icon name="hie-time"></ion-icon>\n        <ion-multi-picker text-left class="ksd-timepicker" item-content [multiPickerColumns]="simpleColumns" [(ngModel)]="collectionTime"></ion-multi-picker><span class="required"></span>\n      </button>\n      </div>\n      <ion-item-divider></ion-item-divider>\n      <div class="ksd-info" no-padding>\n        Get higher discount rates by setting your collection date far\n      </div>\n      <ion-item-divider></ion-item-divider>\n      <!--<ion-item-divider></ion-item-divider>-->\n      <div no-padding *ngFor="let o of oItems">\n        <!--<ion-item no-padding> -->\n        <ion-row no-padding (click)="onItemClick(o)">\n          <ion-col no-padding col-3>\n            <img class="ksd-image" [src]="getImageURL(o)" />\n          </ion-col>\n          <ion-col col-6>\n            <p class="ksd-title">{{o.TITLE}}</p>\n          </ion-col>\n          <ion-col no-padding col-3>\n            <p class="ksd-discount" no-padding>{{o.RATE}}% OFF</p>\n            <p class="ksd-days" text-wrap no-padding>ORDER {{o.ADVANCE_DAYS}} DAYS EARLY</p>\n          </ion-col>\n        </ion-row>\n        <ion-item-divider></ion-item-divider>\n        <!--<ion-row class="no-padding">\n          <ion-col class="no-padding">\n            <hr class="no-padding">\n          </ion-col>\n        </ion-row>-->\n        <!--</ion-item>-->\n      </div>\n      <ion-item no-lines></ion-item>\n      <ion-item no-lines></ion-item>\n    </div>\n  </div>\n</ion-content>\n<ion-footer>\n  <ion-row class="footer-row" ion-button (click)="openCart()">\n    <ion-col class="footer-col-left">\n      {{oService.calcTotalQty()}}\n    </ion-col>\n    <ion-col class="footer-col-center">\n      View cart\n    </ion-col>\n    <ion-col class="footer-col-right"> {{oService.calcTotalSum() |number:\'1.2\'}}</ion-col>\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-discount/merchant-discount.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_cart_service__["a" /* CartService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], MerchantDiscountPage);
    return MerchantDiscountPage;
}());

//# sourceMappingURL=merchant-discount.js.map

/***/ })

});
//# sourceMappingURL=17.js.map
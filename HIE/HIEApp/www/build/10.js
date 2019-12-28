webpackJsonp([10],{

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewMenuPageModule", function() { return ViewMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_menu__ = __webpack_require__(953);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ViewMenuPageModule = /** @class */ (function () {
    function ViewMenuPageModule() {
    }
    ViewMenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__view_menu__["a" /* ViewMenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__view_menu__["a" /* ViewMenuPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__view_menu__["a" /* ViewMenuPage */]
            ]
        })
    ], ViewMenuPageModule);
    return ViewMenuPageModule;
}());

//# sourceMappingURL=view-menu.module.js.map

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_login_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import "rxjs/add/operator/map";
// import "rxjs/add/operator/catch";
// import 'rxjs/add/observable/throw';
//import { AddMenuPage } from '../add-menu/add-menu';
//import { sIMAGE_URL } from '../../app/properties';

var ViewMenuPage = /** @class */ (function () {
    function ViewMenuPage(navCtrl, navParams, //private readonly loadingCtrl: LoadingController,
    oLoginService, oAPIService
    //  ,private readonly toastCtrl: ToastController
    ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oLoginService = oLoginService;
        this.oAPIService = oAPIService;
        this.PRODUCT_ID = 0;
        this.oItem = {};
        this.bLoaded = false;
        this.oDiscounts = [];
        this.PRODUCT_ID = navParams.get('PRODUCT_ID');
        if (this.PRODUCT_ID === undefined)
            return;
        console.log(this.PRODUCT_ID);
        oAPIService.send2ServerP("product/" + this.PRODUCT_ID).then(function (data) {
            _this.oItem = data.result[0];
            console.log(JSON.stringify(_this.oItem));
            oAPIService.send2ServerP("product/" + _this.PRODUCT_ID + "/discounts").then(function (d) {
                _this.oDiscounts = d.result;
                _this.bLoaded = true;
            });
        });
    }
    ViewMenuPage.prototype.onEdit = function () {
        this.navCtrl.push('AddMenuPage', { PRODUCT_ID: this.oItem.ID });
    };
    ViewMenuPage.prototype.getImageURL = function (oItem) {
        return this.oAPIService.buildImageURL(oItem, this.oLoginService.getUserID(), '156h_');
        // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
        //   return "" ;
        // let img = oItem.IMAGE_URL;
        // if (img.startsWith('http://') ||
        //   img.startsWith('https://'))
        //   return img;
        // return sIMAGE_URL + this.oLoginService.getUserID() + "/" + img;
    };
    ViewMenuPage.prototype.goBack = function () {
        this.navCtrl.pop();
        //    this.navCtrl.setRoot('MerchantHomePage');
    };
    ViewMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-view-menu',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/view-menu/view-menu.html"*/'<!--<ion-header>\n\n <ion-navbar *navbar>\n    <ion-buttons left (click)="onCloseClick()">\n      <button ion-button icon-only>\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <lazy-image class="expanded-64-image" src="{{getImageURL(oItem)}}"> </lazy-image>\n    </ion-title>\n  </ion-navbar>\n</ion-header>-->\n<ion-content ksd-header *ngIf="bLoaded">\n  <div class="background-image" [style.backgroundImage]="\'url(\' + getImageURL(oItem) + \')\'">\n    <button ion-button icon-only class="top-left-button-2" (click)="goBack()">\n      <ion-icon name="close"></ion-icon>\n      <!-- <ion-icon name="hie-close-cross-black-circle"></ion-icon> -->\n      </button>\n  </div>\n  <div class="main-content">\n    <!--<ion-grid *ngIf="bLoaded">\n      <ion-row>\n        <ion-col>\n          <lazy-image class="expanded-64-image" src="{{getImageURL(oItem)}}"> </lazy-image>\n        </ion-col>\n      </ion-row>\n    </ion-grid>-->\n    <div class="ksd-spacer-top"></div>\n    <ion-row>\n      <ion-col col-8 class="ksd-border">\n        {{oItem.TITLE}}\n      </ion-col>\n      <ion-col col-4>\n        <div class="ksd-price"> Original price</div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-8 class="ksd-border">\n        <div class="ksd-food-type"> todo show food type</div>\n      </ion-col>\n      <ion-col col-3 class="ksd-price-value">{{oItem.USUAL_PRICE}}\n      </ion-col>\n    </ion-row>\n    <div class="ksd-spacer-top"></div>\n    <ion-row no-padding>\n      <ion-col no-padding text-wrap col-12 class="ksd-description">\n        {{oItem.DESCRIPTION}}\n      </ion-col>\n    </ion-row>\n    <div class="ksd-spacer-1"></div>\n    <!--</div>\n  <div>-->\n    <ion-item no-padding>\n    </ion-item>\n    <div *ngFor="let oD of oDiscounts; let i = index">\n      <ion-row no-padding>\n        <ion-col col-6 class="ksd-right-border">\n          <div no-padding class="ksd-discount-rate">\n            Discount rate\n          </div>\n          <div class="ksd-select ksd-bold">{{oD.RATE}}%\n          </div>\n        </ion-col>\n        <ion-col col-6 style="padding-left:10px">\n          <div no-padding class="ksd-discount-rate">\n            Days\n          </div>\n          <div class="ksd-select ksd-bold">{{oD.ADVANCEDAYS}}\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-item no-padding>\n      </ion-item>\n    </div>\n    <div class="ksd-spacer-2"></div>\n    <ion-item no-padding>\n    </ion-item>\n    <ion-row>\n      <ion-col col-9>\n        <ion-label class="ksd-active-label"> Active</ion-label>\n      </ion-col>\n      <ion-col col-3 align-right>\n        <!--http://plnkr.co/edit/AFgp5TsBq7rOH0cM6y4t?p=preview-->\n        <!-- <div class="ksd-toggle-background">\n          <ion-toggle item-right disabled [checked]="oItem.ISACTIVE == \'Y\'"></ion-toggle>\n        </div> -->\n        <ion-label *ngIf="oItem.ISACTIVE == \'Y\'" class="ksd-active-label"> Yes</ion-label>\n        <ion-label *ngIf="oItem.ISACTIVE == \'N\'" class="ksd-active-label"> No</ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-item no-padding>\n    </ion-item>\n    <div class="ksd-spacer-3"></div>\n  </div>\n</ion-content>\n<ion-footer>\n  <button primary ion-button full (click)="onEdit()"><p class="ksd-anchor-button">Edit menu</p></button>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/view-menu/view-menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_3__providers_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */]
            //  ,private readonly toastCtrl: ToastController
        ])
    ], ViewMenuPage);
    return ViewMenuPage;
}());

//# sourceMappingURL=view-menu.js.map

/***/ })

});
//# sourceMappingURL=10.js.map
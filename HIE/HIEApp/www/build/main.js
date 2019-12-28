webpackJsonp([22],{

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sEndPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sAdyenClientKey; });
var sEndPoint = "http://103.25.203.73:4200/";
//export const sEndPoint = "http://haveitearly.com:4200/" ;
var sAdyenClientKey = '10001|ABC705664E65E4BC2D563D347C056BA06542F1290025A1F0B4FF3A0D5FFA946F12DAAE7AD8BDF6A93D82839D3108BF5A350882BA9A72021D06E809E29F358A80CB07BA859270F16DD068AE7047661F588E163B2C8AAC2074815766BACE074FAD4E6771E78EDEFBFBB6E53591BC99BC5AB5EB4A763F8F56CFA0C0E0F9569C748E89FEFC51ED1FF3EA2D9B708B18159556EDD71AA4C22ECEEB5340B82ED7305CEF0EFF9EB06A909612A33EFDF4E1A5F05B5CAB6A0A6D18F5BD58D551D6456DBA00B517F242E870D6123D2507B7BAF46277884814384C91868EB36599E623BE9B2E044ECCBC272E3335A1CB10D39684DF66BDEF4BF7851FAD027E95C69826F723F3';
//# sourceMappingURL=env.properties.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_options_search_options__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { MerchantService } from '../../providers/merchant-service';





//import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
//import { sIMAGE_URL } from '../../app/properties';
var SearchResultPage = /** @class */ (function () {
    function SearchResultPage(navCtrl, oService, loadingCtrl, modalCtrl, alertCtrl, oAPIService) {
        this.navCtrl = navCtrl;
        this.oService = oService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.oAPIService = oAPIService;
        this.sText = '';
        this.oItems = [];
        this.bLoaded = false;
        this.sNoResults = 'NO RESULT';
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
    }
    SearchResultPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'loading...',
        });
        this.loading.present();
        var r = '%';
        var c = [];
        if (__WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchRegion != 'Any')
            r = __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchRegion;
        if (__WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchCuisine.length == 0) {
            c.push('%');
            this.oAPIService.send2ServerP("merchantsallcuisine", true, { REGION: r, CUISINE: c }).then(function (data) {
                _this.oItems = data.result;
                _this.loading.dismiss();
                _this.bLoaded = true;
            });
        }
        else {
            c = __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchCuisine;
            this.oAPIService.send2ServerP("merchants", true, { REGION: r, CUISINE: c }).then(function (data) {
                _this.oItems = data.result;
                _this.loading.dismiss();
                _this.bLoaded = true;
            });
        }
    };
    /*
      ionViewDidLoad ( )
      {
        this.setFilteredItems ( ) ;
        this.searchControl.valueChanges.debounceTime ( 700 ).subscribe ( (search) => {
          this.setFilteredItems ( ) ;
        });
      }
    
      onSearchInput ( )
      {
        this.bSearching = true ;
      }
      
      setFilteredItems ( ) {
        this.oItems = this.oService.filterItems ( this.sText ) ;
        this.bSearching = false ;
      }
    */
    SearchResultPage.prototype.showConfirmAlert = function (oItem) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '<div></div>',
            // class="warning center-image"></div>',
            message: '' +
                '<p class="ksd-text">Changing Merchant will remove existing items in cart.  Do you want to proceed?</p>' +
                '',
            cssClass: 'ksd-confirm-change',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'No keep existing',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes, proceed',
                    handler: function () {
                        _this.oService.removeAllItems();
                        __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].oMID = oItem.ID;
                        _this.oService.setID(oItem.ID);
                        _this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: oItem, MerchantID: oItem.ID });
                    }
                }
            ]
        }).present();
    };
    SearchResultPage.prototype.onMerchantClick = function (oItem) {
        if (__WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].oMID != 0 &&
            __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].oMID != oItem.ID
            && this.oService.calcTotalQty() != 0) {
            this.showConfirmAlert(oItem);
            // let oModal = this.modalCtrl.create(MerchantChangePage, { oNewMerchant: oItem.ID });
            // oModal.onDidDismiss((data: any) => {
            //   // Not sure why this is not working...
            //   console.log("Will Dismiss: User Selection: " + JSON.stringify(data));
            //   // if (data && data.response === 'OK') {
            //   // here is the workaround
            //   console.log("Can Switch: " + Global_Variables.canSwith2Merchant);
            //   if (Global_Variables.canSwith2Merchant == 1) {
            //     this.oService.removeAllItems();
            //     Global_Variables.oMID = oItem.ID;
            //     this.oService.setID(oItem.ID);
            //     this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: oItem, MerchantID: oItem.ID });
            //   }
            //   //      }
            //   //        return true;
            // });
            // oModal.present();
        }
        else {
            __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].oMID = oItem.ID;
            this.oService.setID(oItem.ID);
            this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: oItem, MerchantID: oItem.ID });
        }
    };
    SearchResultPage.prototype.go2Search = function () {
        //    this.oCartService.removeAllItems ( ) ;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__search_options_search_options__["a" /* SearchOptionsPage */]);
    };
    SearchResultPage.prototype.goBack = function () {
        this.go2Search();
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search-result',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/search-result/search-result.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="hie-menu" (click)="go2Search()"></ion-icon>\n    </button>\n    <!--<button ion-button menuToggle>\n      <ion-icon name="hie-back-arrow-black" (click)="go2Search()"></ion-icon>\n    </button>-->\n    <ion-title text-center>Search result</ion-title>\n    <!--<ion-buttons end>\n      <cart-indicator (wasClicked)="openCart()"></cart-indicator>\n      <button (click)="go2Search()">S</button>\n    </ion-buttons>-->\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="bLoaded">\n    <!--<div>\n     <p  class="ksd-header">118 results!<br>Western cuisine to Tampines location</p>\n    <hr/>\n  </div>-->\n    <ion-item no-padding no-lines>\n    <div class="ksd-spacer"></div>\n    </ion-item>\n    <div *ngIf="oItems.length == 0">\n      <p class="ksd-no-result">{{sNoResults}}</p>\n    </div>\n    <ion-grid *ngFor="let o of oItems">\n      <ion-row item-content no-padding (click)="onMerchantClick(o)">\n        <ion-col col-3 class="ksd-image-width" no-padding>\n          <img [src]="oAPIService.buildImageURL(o,-1)" class="ksd-image">\n        </ion-col>\n        <ion-col col-6 class="ksd-padding">\n          <ion-row  no-padding>\n            <ion-col no-padding class="ksd-merchant">{{o.NAME}}\n            </ion-col>\n          </ion-row>\n          <ion-row class="ksd-align-bottom" no-padding>\n            <ion-col no-padding>\n              <p class="ksd-cuisine" no-padding>{{o.CUISINES}}</p>\n            </ion-col>\n          </ion-row>\n        </ion-col>\n        <ion-col col-3>\n          <p class="ksd-discount" no-padding>{{o.RATE}}% OFF</p>\n          <p class="ksd-days" no-padding>ORDER {{o.ADVANCE_DAYS}} DAYS EARLY</p>\n        </ion-col>\n      </ion-row>\n      <ion-row no-padding>\n        <ion-col no-padding>\n          <hr>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/search-result/search-result.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_cart_service__["a" /* CartService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_6__providers_api_service__["a" /* APIService */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 185;

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about-us/about-us.module": [
		836,
		21
	],
	"../pages/add-menu/add-menu.module": [
		857,
		9
	],
	"../pages/added-info/added-info.module": [
		837,
		20
	],
	"../pages/change-password/change-password.module": [
		838,
		7
	],
	"../pages/confirmed-order/confirmed-order.module": [
		839,
		19
	],
	"../pages/discount-details/discount-details.module": [
		840,
		18
	],
	"../pages/feedback/feedback.module": [
		841,
		6
	],
	"../pages/forgot-password/forgot-password.module": [
		842,
		5
	],
	"../pages/incoming-order/incoming-order.module": [
		843,
		8
	],
	"../pages/merchant-discount/merchant-discount.module": [
		844,
		17
	],
	"../pages/merchant-home/merchant-home.module": [
		845,
		16
	],
	"../pages/merchant-profile/merchant-profile.module": [
		846,
		1
	],
	"../pages/my-profile/my-profile.module": [
		847,
		4
	],
	"../pages/order-details/order-details.module": [
		848,
		15
	],
	"../pages/order-history/order-history.module": [
		849,
		14
	],
	"../pages/order-summary/order-summary.module": [
		850,
		13
	],
	"../pages/orders/orders.module": [
		851,
		12
	],
	"../pages/register/register.module": [
		852,
		3
	],
	"../pages/review/review.module": [
		853,
		2
	],
	"../pages/shopping-cart/shopping-cart.module": [
		856,
		0
	],
	"../pages/thank-you/thank-you.module": [
		854,
		11
	],
	"../pages/view-menu/view-menu.module": [
		855,
		10
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 230;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return sURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return sIMAGE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global_Variables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getStartTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return lookupTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return lookupStatus; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env_properties__ = __webpack_require__(163);
//export const sEndPoint = "http://192.168.0.120:4200/";
//export const sEndPoint = "http://127.0.0.1:4200/" ;

var sURL = __WEBPACK_IMPORTED_MODULE_0__env_properties__["b" /* sEndPoint */] + "api/";
var sIMAGE_URL = __WEBPACK_IMPORTED_MODULE_0__env_properties__["b" /* sEndPoint */] + "image/";
var V = {
    //  Name: "/^[a-zA-Z0-9]*$/", 
    Name: "/^[a-zA-Z]*$/",
    Name_Min: 1,
    Name_Max: 25,
    // Email = "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}";
    //  Email: "[A-Za-z0-9]+@[A-Za-z0-9]+\.+[A-Za-z]{2}",
    Email: "[A-Za-z0-9]+@[A-Za-z0-9]+\.+[A-Za-z0-9]{2}",
    Email_Min: 1,
    Email_Max: 50,
    Password: "[A-Za-z0-9]+",
    Password_Min: 3,
    Password_Max: 25,
    Phone_Min: 8,
    Phone_Max: 8,
    Address: "[A-Za-z0-9#-.& ]",
    Address_Max: 100,
    CardNumber: "[0-9]",
    CardNumber_Min: 16,
    CardNumber_Max: 16,
    CardExpiry: "[0-9]",
    MenuTitle_Min: 1,
    MenuTitle_Max: 25,
    MenuDescription_Min: 1,
    MenuDescription_Max: 50,
    Review_Min: 10,
    Review_Max: 100,
    Price_Min: 1,
    Price_Max: 6
};
var Global_Variables = {
    sUserEmail: '',
    canSwith2Merchant: -1,
    isConnected: true,
    token: null,
    DeviceID: "None",
    oMID: -1,
    oRItem: null,
    oMenuItems: [],
    sCurrentPage: 'Home',
    searchRegion: 'Any',
    selectedRegion: '',
    searchCuisine: ['Others', 'Indian'],
    selectedCuisines: "'Others', 'Indian'",
    collectionDate: '',
    collectionTime: '2',
    collectionTimes: [
        {
            name: 'col1',
            options: [
                { text: '5:30 - 6:30', value: '1' },
                { text: '6:30 - 7:30', value: '2' },
                { text: '7:30 - 8:30', value: '3' },
                { text: '8:30 - 9:30', value: '4' },
                { text: '9:30 - 9:30', value: '5' },
                { text: '10:30 - 9:30', value: '6' },
                { text: '11:30 - 9:30', value: '7' },
                { text: '12:30 - 9:30', value: '8' },
                { text: '13:30 - 9:30', value: '9' },
                { text: '14:30 - 9:30', value: '10' },
            ],
        }
    ]
};
var getStartTime = function (val) {
    var source = Global_Variables.collectionTimes[0].options;
    for (var i = 0; i < source.length; i++)
        if (source[i].value === val) {
            return source[i].text.split(" ")[0];
        }
    return 'NotFound';
};
var lookupTime = function (val) {
    var source = Global_Variables.collectionTimes[0].options;
    for (var i = 0; i < source.length; i++)
        if (source[i].value === val) {
            return source[i].text;
        }
    return 'NotFound';
};
var lookupStatus = function (val) {
    if (val == 'C')
        return 'Confirmed';
    if (val == 'P')
        return 'Pending';
    if (val == 'D')
        return 'Fullfilled';
    return val;
};
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginErrorPage = /** @class */ (function () {
    function LoginErrorPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.text = "";
        this.text = "Please enter correct Email/Password";
    }
    LoginErrorPage.prototype.ok = function () {
        this.navCtrl.pop();
    };
    LoginErrorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login-error',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/login-error/login-error.html"*/'<ion-content padding class="ksd-modal-page">\n      <div class="ksd-spacer"></div>\n      <ion-grid class="dialog-position">\n            <div class="ksd-spacer-0"></div>\n            <div class="warning center-image"></div>\n            <div text-center>\n                  <p class="ksd-text" [innerHtml]="text"></p>\n            </div>\n            <div class="ksd-spacer-1"></div>\n            <button ion-button full (click)="ok()" class="ksd-error">Ok</button>\n      </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/login-error/login-error.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], LoginErrorPage);
    return LoginErrorPage;
}());

//# sourceMappingURL=login-error.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaceBook; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Page } from 'ionic/ionic';


//import { Http } from '@angular/http';

//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702614956729294" --variable APP_NAME="HaveItEarly"
//https://ionicframework.com/docs/native/facebook/
//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="146887799193080" --variable APP_NAME="HaveItEarly"
//npm install --save @ionic-native/facebook
//Other References
//https://stackoverflow.com/questions/43549143/native-facebook-login-in-ionic-2
var FaceBook = /** @class */ (function () {
    function FaceBook(oPlatform) {
        this.oPlatform = oPlatform;
    }
    FaceBook.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.oPlatform.is('cordova')) {
                facebookConnectPlugin.login(['email'], function (success) {
                    console.log(JSON.stringify(success));
                    resolve(success);
                }, function (err) {
                    console.log(JSON.stringify(err));
                    reject(err);
                });
            }
            else {
                console.log("Please run me on a device");
                reject('Please run me on a device');
            }
        });
    };
    FaceBook.prototype.getCurrentUserProfile = function () {
        return new Promise(function (resolve, reject) {
            facebookConnectPlugin.api('me?fields=email,name', null, function (profileData) {
                console.log(JSON.stringify(profileData));
                resolve(profileData);
            }, function (err) {
                console.log(JSON.stringify(err));
                reject(err);
            });
        });
    };
    FaceBook = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["Platform"]])
    ], FaceBook);
    return FaceBook;
}());

//# sourceMappingURL=face-book.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MerchantService = /** @class */ (function () {
    //  public oItems: any[] = [];
    function MerchantService(http, oCartService, oLoginService, oAPIService) {
        this.http = http;
        this.oCartService = oCartService;
        this.oLoginService = oLoginService;
        this.oAPIService = oAPIService;
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
    MerchantService.prototype.loadProducts = function (oItem) {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "products/" + oItem.ID;
        return this.http.get(s)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.loadDiscounts = function () {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "discounts";
        return this.http.post(s, {
            NAME: __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchCuisine,
            REGION: __WEBPACK_IMPORTED_MODULE_7__app_properties__["a" /* Global_Variables */].searchRegion
        })
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.deleteDiscount = function (oItem) {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "discounts/" + oItem.ID + "/delete";
        return this.http.post(s, {
            ID: oItem.ID
        })
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.isMerchant = function () {
        return this.oLoginService.getUserType() === 'M';
    };
    MerchantService.prototype.isCustomer = function () {
        return this.oLoginService.getUserType() === 'C';
    };
    MerchantService.prototype.getOrders = function () {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */];
        if (this.isMerchant())
            s += "merchant/" + this.oLoginService.getUserID() + "/orders";
        else if (this.isCustomer())
            s += "customer/" + this.oLoginService.getUserID() + "/orders";
        else {
            console.log("TODO: Not Merchant & Not Customer " + this.oLoginService.getUserType());
            return;
        }
        return this.http.get(s)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.getOrderDetails = function (tid) {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */];
        // if (this.isMerchant())
        //   s += "merchant/" + this.getUserID() + "/orders";
        // else
        s += "customer/" + tid + "/orderdetails";
        return this.http.get(s)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.profile = function (data) {
        //console.log ( "About 2 POST " + JSON.stringify(data)) ;
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "profile";
        return this.http.post(s, data)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.getProfile = function () {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "profile/" + this.oLoginService.getUserID();
        return this.http.get(s)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService.prototype.updateProfile = function (data) {
        var s = __WEBPACK_IMPORTED_MODULE_7__app_properties__["g" /* sURL */] + "update/profile/" + this.oLoginService.getUserID();
        return this.http.post(s, data)
            .map(function (res) { return res.json(); }).toPromise();
    };
    MerchantService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_4__cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_5__login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_6__api_service__["a" /* APIService */]])
    ], MerchantService);
    return MerchantService;
}());

//# sourceMappingURL=merchant-service.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_env_properties__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Platform, Nav } from 'ionic-angular';




//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
//import { Device } from 'ionic-native';
//import { Push } from 'ionic-native';

//import { sURL } from '../app/properties';

//import { APIService } from './api-service';
var LoginService = /** @class */ (function () {
    function LoginService(http, alertCtrl, oStorage
    //, private oPlatform: Platform 
    //, private oAPIService: APIService
    ) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.oStorage = oStorage;
        this.LID = 0;
        this.LType = "N";
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__["JwtHelper"]();
        /*
        oPlatform.ready().then(() => {
          //      this.device_id = Device.device.uuid;
          var push = Push.init({
            android: {
              senderID: "XXXXXXXXX"
            },
            ios: {
              alert: "true",
              badge: true,
              sound: 'false'
            },
            windows: {}
          });
          push.on('registration', (data) => {
            console.log(data.registrationId);
            alert(data.registrationId.toString());
          });
          push.on('notification', (data) => {
            console.log(data);
            alert("Hi, Am a push notification");
          });
          push.on('error', (e) => {
            console.log(e.message);
          });
        });*/
    }
    /*
    http://nishanthkabra.com/ionic2push.html
    cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXXXX"
    Update the app's package.json with following code
    "cordovaPlugins": [
        {
          "variables": {
            "SENDER_ID": "XXXXXXXXXX"
          },
          "locator": "phonegap-plugin-push"
        }
      ]
    */
    LoginService.prototype.getUserID = function () { return this.LID; };
    LoginService.prototype.getUserType = function () { return this.LType; };
    LoginService.prototype.getEmail = function () { return this.EMAIL; };
    LoginService.prototype.getLoginType = function () { return this.LoginType; };
    LoginService.prototype.showNetworkError = function () {
        var alert = this.alertCtrl.create({
            title: 'No Network',
            subTitle: 'Pls check internet connection',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    LoginService.prototype.performLogin = function (data) {
        //    return this.oAPIService.send2Server(sEndPoint + "auth", true, data);       
        if (__WEBPACK_IMPORTED_MODULE_6__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        return this.http.post(__WEBPACK_IMPORTED_MODULE_7__app_env_properties__["b" /* sEndPoint */] + "auth", data)
            .map(function (res) { return res.json(); }).toPromise();
        // let s = sURL + "auth";
        // return this.http.post(s, data)
        //   .map(res => res.json()).toPromise();
    };
    LoginService.prototype.performFBLogin = function (data) {
        //    return this.oAPIService.send2Server(sEndPoint + "auth", true, data);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_7__app_env_properties__["b" /* sEndPoint */] + "fbauth", data)
            .map(function (res) { return res.json(); }).toPromise();
        // let s = sURL + "auth";
        // return this.http.post(s, data)
        //   .map(res => res.json()).toPromise();
    };
    LoginService.prototype.getToken = function () {
        return __WEBPACK_IMPORTED_MODULE_6__app_properties__["a" /* Global_Variables */].token;
        //  this.oStorage.get('token');
    };
    LoginService.prototype.saveToken = function (id) {
        __WEBPACK_IMPORTED_MODULE_6__app_properties__["a" /* Global_Variables */].token = id;
        //    console.log("save Token: " + Global_Variables.token);
        //    this.oStorage.set('token', id);
        if (id) {
            var o = this.jwtHelper.decodeToken(id).data;
            console.log(o);
            this.LID = +o.UID;
            this.LType = o.TYPE;
            this.EMAIL = o.EMAIL;
            this.LoginType = o.LOGINTYPE;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Nav"])
    ], LoginService.prototype, "nav", void 0);
    LoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]
            //, private oPlatform: Platform 
            //, private oAPIService: APIService
        ])
    ], LoginService);
    return LoginService;
}());

//# sourceMappingURL=login-service.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { Observable } from 'rxjs/Rx';





var APIService = /** @class */ (function () {
    function APIService(http, alertCtrl, oLoginService) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.oLoginService = oLoginService;
    }
    APIService.prototype.getHeaders = function () {
        //console.log ( "getHeaders Token: " + Global_Variables.token ) ;
        var oHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
            'Content-Type': 'application/json',
            'ks-x-authorization': 'Bearer: ' + __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].token
        });
        //    console.log ( JSON.stringify ( oHeaders )) ;
        return { headers: oHeaders };
    };
    APIService.prototype.showNetworkError = function () {
        var alert = this.alertCtrl.create({
            title: 'No Network',
            subTitle: 'Pls check internet connection',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    APIService.prototype.send2Server = function (sURL, bPost, oItem) {
        if (bPost === void 0) { bPost = false; }
        if (oItem === void 0) { oItem = null; }
        if (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        if (bPost) {
            return this.http.post(sURL, oItem, this.getHeaders())
                .map(function (res) { return res.json(); }).toPromise();
        }
        return this.http.get(sURL, this.getHeaders())
            .map(function (res) { return res.json(); }).toPromise();
    };
    APIService.prototype.getURL = function () {
        return __WEBPACK_IMPORTED_MODULE_3__app_properties__["g" /* sURL */] + this.oLoginService.getUserID() + "/";
    };
    APIService.prototype.send2ServerC = function (sPartialURL, bPost, oItem) {
        if (bPost === void 0) { bPost = false; }
        if (oItem === void 0) { oItem = null; }
        if (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        if (bPost) {
            return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_properties__["g" /* sURL */] + sPartialURL, oItem, this.getHeaders())
                .map(function (res) { return res.json(); }).toPromise();
        }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__app_properties__["g" /* sURL */] + sPartialURL, this.getHeaders())
            .map(function (res) { return res.json(); }).toPromise();
    };
    APIService.prototype.send2ServerP = function (sPartialURL, bPost, oItem) {
        if (bPost === void 0) { bPost = false; }
        if (oItem === void 0) { oItem = null; }
        if (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        if (bPost) {
            return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders())
                .map(function (res) { return res.json(); }).toPromise();
        }
        return this.http.get(this.getURL() + sPartialURL, this.getHeaders())
            .map(function (res) { return res.json(); }).toPromise();
    };
    APIService.prototype.send2ServerPlainText = function (sPartialURL, bPost, oItem) {
        if (bPost === void 0) { bPost = false; }
        if (oItem === void 0) { oItem = null; }
        if (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        if (bPost) {
            return this.http.post(this.getURL() + sPartialURL, oItem, this.getHeaders()).toPromise();
        }
        return this.http.get(this.getURL() + sPartialURL, this.getHeaders()).toPromise();
    };
    APIService.prototype.fileUpload = function (sUrl, formData) {
        if (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].isConnected == false) {
            this.showNetworkError();
            return Promise.reject("No Network");
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        console.log(formData);
        //    let options = new RequestOptions({ headers: headers });
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            // for(var i = 0; i < files.length; i++) {
            //     formData.append("uploads[]", files[i], files[i].name);
            // }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //            console.log(xhr.response);
                        resolve(xhr.response);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            //path = 'upload/' ;
            xhr.open("POST", sUrl, true);
            xhr.send(formData);
        });
    };
    /*
    getImageThumbURL(oItemC: any) {
      if (oItemC === undefined) return '';
      var oItem: any = oItemC;
      if (oItemC.oProduct)
        oItem = oItemC.oProduct;
      let img = oItem.IMAGEURL;
      if (img.startsWith('http://') ||
        img.startsWith('https://'))
        return img;
      return sIMAGE_URL + oItem.RESTAURANT_ID + "/" + "thumb_" + img;
    }
    
    getImageURL(oItemC: any) {
      if (oItemC === undefined) return '';
      var oItem: any = oItemC;
      if (oItemC.oProduct)
        oItem = oItemC.oProduct;
      let img = oItem.IMAGEURL;
      if (img.startsWith('http://') ||
        img.startsWith('https://'))
        return img;
      return sIMAGE_URL + oItem.RESTAURANT_ID + "/" + img;
    }
    */
    APIService.prototype.buildImageURL = function (oItem, i, sPrefix, bRefresh) {
        if (i === void 0) { i = -1; }
        if (sPrefix === void 0) { sPrefix = '70h70w_'; }
        if (bRefresh === void 0) { bRefresh = false; }
        var img = oItem.IMAGE_URL;
        if (img === undefined || img === null)
            return '';
        if (img.startsWith('http://') ||
            img.startsWith('https://')) {
            if (bRefresh)
                return img + "?" + new Date().getMilliseconds();
            return img;
        }
        if (i != -1)
            return __WEBPACK_IMPORTED_MODULE_3__app_properties__["f" /* sIMAGE_URL */] + i + "/" + sPrefix + img;
        return __WEBPACK_IMPORTED_MODULE_3__app_properties__["f" /* sIMAGE_URL */] + oItem.ID + "/" + sPrefix + img;
    };
    APIService.prototype.sort = function (oData, oFields) {
        // this.oAPIService.sort ( this.oItems, [{field: 'PICKUPON', direction: 'desc' }, {field: 'PICKUPSTART', direction: 'desc' }, {field: 'BOOKINGREF', direction: 'desc'}]) ;
        oData.sort(function (a, b) {
            for (var i = 0; i < oFields.length; i++) {
                var retval = a[oFields[i].field] < b[oFields[i].field] ? -1 : a[oFields[i].field] > b[oFields[i].field] ? 1 : 0;
                if (oFields[i].direction == "desc") {
                    retval = retval * -1;
                }
                if (retval !== 0) {
                    return retval;
                }
            }
        });
    };
    APIService.prototype.sortByDate = function (oItems, oDTField, sDir) {
        if (sDir === void 0) { sDir = 'asc'; }
        oItems.sort(function (a, b) {
            // if date format is 'DD/MM/YYYY' ;
            // var aa = a.split('/').reverse().join(),
            //     bb = b.split('/').reverse().join();
            //Ascending
            //return a.PICKUPON < b.PICKUPON ? -1 : (a.PICKUPON > b.PICKUPON ? 1 : 0); 
            //Desc
            var retVal = a[oDTField] > b[oDTField] ? -1 : (a[oDTField] < b[oDTField] ? 1 : 0);
            if (sDir !== 'asc')
                return -retVal;
            return retVal;
        });
    };
    APIService.prototype.stringToDate = function (_date, _format, _delimiter) {
        // stringToDate("17/9/2014","dd/MM/yyyy","/");
        // stringToDate("9/17/2014","mm/dd/yyyy","/")
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
        return formatedDate;
    };
    APIService.prototype.setTime = function (oDate, sTime) {
        //       tests = ['01.25 PM', '01:25pm', '1:25 PM', '11.35 PM', '12.45 PM', '01.25 AM', '11.35 AM', '12.45 AM'],
        var timeReg = /(\d+)[\.|:](\d+)\s?(\w+)/;
        var parts = sTime.match(timeReg);
        var hours = /am/i.test(parts[3]) ?
            function (am) { return am < 12 ? am : 0; }(parseInt(parts[1], 10)) :
            function (pm) { return pm < 12 ? pm + 12 : 12; }(parseInt(parts[1], 10));
        var minutes = parseInt(parts[2], 10);
        oDate.setHours(hours);
        oDate.setMinutes(minutes);
        oDate.setSeconds(0);
        return oDate;
    };
    APIService.prototype.setTime24Hrs = function (oDate, sTime) {
        var s = sTime.split(':');
        var hours = parseInt(s[0]);
        var minutes = parseInt(s[1]);
        oDate.setHours(hours);
        oDate.setMinutes(minutes);
        return oDate;
    };
    APIService.prototype.isFuture = function (date) {
        return date.diff(__WEBPACK_IMPORTED_MODULE_9_moment__["now"]()) > 0;
    };
    APIService.prototype.isTodayOrFuture = function (date) {
        date = this.stripTime(date);
        return date.diff(this.stripTime(__WEBPACK_IMPORTED_MODULE_9_moment__["now"]())) >= 0;
    };
    APIService.prototype.stripTime = function (date) {
        date = __WEBPACK_IMPORTED_MODULE_9_moment__(date);
        date.hours(0);
        date.minutes(0);
        date.seconds(0);
        date.milliseconds(0);
        return date;
    };
    APIService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_4__providers_login_service__["a" /* LoginService */]])
    ], APIService);
    return APIService;
}());

//# sourceMappingURL=api-service.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordResetMessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PasswordResetMessagePage = /** @class */ (function () {
    function PasswordResetMessagePage(navCtrl, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.EMAIL = "eainthu.naing@gmail.com";
        this.text = "Email to reset your password have <br>been sent to<br> <b>" + this.EMAIL + "</b>";
        this.text += "<br><br><br>Please check your email.<br><br>";
    }
    PasswordResetMessagePage.prototype.ok = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    PasswordResetMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-password-reset-message',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/password-reset-message/password-reset-message.html"*/'<ion-content padding class="ksd-modal-page">\n  <div class="ksd-spacer"></div>\n  <ion-grid class="dialog-position">\n    <div class="ksd-spacer-0"></div>\n    <!--<div class="warning center-image"></div>-->\n    <div text-center>\n      <p class="ksd-text" [innerHtml]="text"></p>\n    </div>\n    <div class="ksd-spacer-1"></div>\n    <button ion-button full (click)="ok()" class="ksd-warning">Ok</button>\n  </ion-grid>\n  <!--<ion-grid class="no-padding dialog-position">\n    <ion-item no-lines>\n      <img src="../assets/img/ico_warning_yellow.svg" height="48" widgh="48"/>\n    </ion-item>\n    <ion-item no-lines>\n      <div text-center>\n        <p class="ksd-text" [innerHtml]="text"></p>\n      </div>\n    </ion-item>\n    <ion-item no-lines class="no-padding">\n      <div class="no-padding">\n        <button ion-button full (click)="ok()" class="ksd-warning">Ok</button>\n      </div>\n    </ion-item>\n  </ion-grid>-->\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/password-reset-message/password-reset-message.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PasswordResetMessagePage);
    return PasswordResetMessagePage;
}());

//# sourceMappingURL=password-reset-message.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(504);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export appProviderLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_select_region_select_region__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_select_cuisine_select_cuisine__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_pre_login_pre_login__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_password_reset_message_password_reset_message__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_error_login_error__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_db_login_db_login__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_search_result_search_result__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_search_options_search_options__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_app_providers__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_lazy_image_lazy_image__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__directives_ksd_header_ksd_header__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_file__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_transfer__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_file_path__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_face_book__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_merchant_service__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_image_picker__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_diagnostic__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_facebook__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_background_mode__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_network__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_calendar__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_alert_dialog_alert_dialog__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_screen_orientation__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_merchant_change_merchant_change__ = __webpack_require__(835);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// import { NO_ERRORS_SCHEMA } from '@angular/core';







//import { CartIndicatorComponent } from '../components/cart-indicator/cart-indicator';









//import { MyUtilsPage } from '../pages/my-utils/my-utils';




//import { TextMaskModule } from 'angular2-text-mask';







//import { RestaurantService } from '../providers/restaurant-service';








//import { DatePickerComponent } from '../components/date-picker/date-picker';

//import { CardModule } from 'ngx-card/ngx-card';
//import { CreditCardComponent } from '../components/credit-card/credit-card';
//import { AutoJumpDirective } from '../directives/auto-jump/auto-jump';

//import { MerchantProfilePage } from '../pages/merchant-profile/merchant-profile' ;

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                //    CartIndicatorComponent,
                __WEBPACK_IMPORTED_MODULE_18__components_lazy_image_lazy_image__["a" /* LazyImageComponent */],
                __WEBPACK_IMPORTED_MODULE_10__pages_pre_login_pre_login__["a" /* PreLoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_error_login_error__["a" /* LoginErrorPage */],
                __WEBPACK_IMPORTED_MODULE_8__components_select_region_select_region__["a" /* SelectRegionComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_select_cuisine_select_cuisine__["a" /* SelectCuisineComponent */],
                //   MerchantProfilePage,
                __WEBPACK_IMPORTED_MODULE_11__pages_password_reset_message_password_reset_message__["a" /* PasswordResetMessagePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_db_login_db_login__["a" /* DBLoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_search_options_search_options__["a" /* SearchOptionsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_merchant_change_merchant_change__["a" /* MerchantChangePage */],
                //   MyUtilsPage,
                __WEBPACK_IMPORTED_MODULE_20__directives_ksd_header_ksd_header__["a" /* KsdHeaderDirective */],
                __WEBPACK_IMPORTED_MODULE_36__components_alert_dialog_alert_dialog__["a" /* AlertDialogComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], { mode: 'md' }, {
                    links: [
                        { loadChildren: '../pages/about-us/about-us.module#AboutUsPageModule', name: 'AboutUsPage', segment: 'about-us', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/added-info/added-info.module#AddedInfoPageModule', name: 'AddedInfoPage', segment: 'added-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/confirmed-order/confirmed-order.module#ConfirmedOrderPageModule', name: 'ConfirmedOrderPage', segment: 'confirmed-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/discount-details/discount-details.module#DiscountDetailsPageModule', name: 'DiscountDetailsPage', segment: 'discount-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/incoming-order/incoming-order.module#IncomingOrderPageModule', name: 'IncomingOrderPage', segment: 'incoming-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/merchant-discount/merchant-discount.module#MerchantDiscountPageModule', name: 'MerchantDiscountPage', segment: 'merchant-discount', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/merchant-home/merchant-home.module#MerchantHomePageModule', name: 'MerchantHomePage', segment: 'merchant-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/merchant-profile/merchant-profile.module#MerchantProfilePageModule', name: 'MerchantProfilePage', segment: 'merchant-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-profile/my-profile.module#MyProfilePageModule', name: 'MyProfilePage', segment: 'my-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-details/order-details.module#OrderDetailsPageModule', name: 'OrderDetailsPage', segment: 'order-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-history/order-history.module#OrderHistoryPageModule', name: 'OrderHistoryPage', segment: 'order-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-summary/order-summary.module#OrderSummaryPageModule', name: 'OrderSummaryPage', segment: 'order-summary', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/thank-you/thank-you.module#ThankYouPageModule', name: 'ThankYouPage', segment: 'thank-you', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-menu/view-menu.module#ViewMenuPageModule', name: 'ViewMenuPage', segment: 'view-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule', name: 'ShoppingCartPage', segment: 'shopping-cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-menu/add-menu.module#AddMenuPageModule', name: 'AddMenuPage', segment: 'add-menu', priority: 'low', defaultHistory: [] }
                    ]
                }),
                //    IonicModule.forRoot(MyApp),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__["MultiPickerModule"] //Import MultiPickerModule
                //       SelectRegionComponent,
                //   SelectCuisineComponent
                // , TextMaskModule
                //   ,CardModule
                //,DatePickerComponent
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                //    CartIndicatorComponent,
                //    SelectRegionComponent,
                //    SelectCuisineComponent,
                __WEBPACK_IMPORTED_MODULE_10__pages_pre_login_pre_login__["a" /* PreLoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_error_login_error__["a" /* LoginErrorPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_password_reset_message_password_reset_message__["a" /* PasswordResetMessagePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_db_login_db_login__["a" /* DBLoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_search_options_search_options__["a" /* SearchOptionsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_merchant_change_merchant_change__["a" /* MerchantChangePage */]
                //   MerchantProfilePage,
                //    MyUtilsPage,
            ],
            // providers: [
            //   StatusBar,
            //   SplashScreen,
            //   {provide: ErrorHandler, useClass: IonicErrorHandler}
            // ]
            //  providers: AppProviders.getProviders()
            providers: [
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_28__providers_merchant_service__["a" /* MerchantService */], __WEBPACK_IMPORTED_MODULE_29__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_27__providers_face_book__["a" /* FaceBook */], __WEBPACK_IMPORTED_MODULE_26__providers_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_25__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_30__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_21__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_22__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_23__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_31__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_32__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_33__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_34__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_35__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_screen_orientation__["a" /* ScreenOrientation */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_2__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());

function appProviderLoader() { return new __WEBPACK_IMPORTED_MODULE_17__providers_app_providers__["a" /* AppProviders */]().getProviders(); }
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 238,
	"./af.js": 238,
	"./ar": 239,
	"./ar-dz": 240,
	"./ar-dz.js": 240,
	"./ar-kw": 241,
	"./ar-kw.js": 241,
	"./ar-ly": 242,
	"./ar-ly.js": 242,
	"./ar-ma": 243,
	"./ar-ma.js": 243,
	"./ar-sa": 244,
	"./ar-sa.js": 244,
	"./ar-tn": 245,
	"./ar-tn.js": 245,
	"./ar.js": 239,
	"./az": 246,
	"./az.js": 246,
	"./be": 247,
	"./be.js": 247,
	"./bg": 248,
	"./bg.js": 248,
	"./bm": 249,
	"./bm.js": 249,
	"./bn": 250,
	"./bn.js": 250,
	"./bo": 251,
	"./bo.js": 251,
	"./br": 252,
	"./br.js": 252,
	"./bs": 253,
	"./bs.js": 253,
	"./ca": 254,
	"./ca.js": 254,
	"./cs": 255,
	"./cs.js": 255,
	"./cv": 256,
	"./cv.js": 256,
	"./cy": 257,
	"./cy.js": 257,
	"./da": 258,
	"./da.js": 258,
	"./de": 259,
	"./de-at": 260,
	"./de-at.js": 260,
	"./de-ch": 261,
	"./de-ch.js": 261,
	"./de.js": 259,
	"./dv": 262,
	"./dv.js": 262,
	"./el": 263,
	"./el.js": 263,
	"./en-au": 264,
	"./en-au.js": 264,
	"./en-ca": 265,
	"./en-ca.js": 265,
	"./en-gb": 266,
	"./en-gb.js": 266,
	"./en-ie": 267,
	"./en-ie.js": 267,
	"./en-nz": 268,
	"./en-nz.js": 268,
	"./eo": 269,
	"./eo.js": 269,
	"./es": 270,
	"./es-do": 271,
	"./es-do.js": 271,
	"./es-us": 272,
	"./es-us.js": 272,
	"./es.js": 270,
	"./et": 273,
	"./et.js": 273,
	"./eu": 274,
	"./eu.js": 274,
	"./fa": 275,
	"./fa.js": 275,
	"./fi": 276,
	"./fi.js": 276,
	"./fo": 277,
	"./fo.js": 277,
	"./fr": 278,
	"./fr-ca": 279,
	"./fr-ca.js": 279,
	"./fr-ch": 280,
	"./fr-ch.js": 280,
	"./fr.js": 278,
	"./fy": 281,
	"./fy.js": 281,
	"./gd": 282,
	"./gd.js": 282,
	"./gl": 283,
	"./gl.js": 283,
	"./gom-latn": 284,
	"./gom-latn.js": 284,
	"./gu": 285,
	"./gu.js": 285,
	"./he": 286,
	"./he.js": 286,
	"./hi": 287,
	"./hi.js": 287,
	"./hr": 288,
	"./hr.js": 288,
	"./hu": 289,
	"./hu.js": 289,
	"./hy-am": 290,
	"./hy-am.js": 290,
	"./id": 291,
	"./id.js": 291,
	"./is": 292,
	"./is.js": 292,
	"./it": 293,
	"./it.js": 293,
	"./ja": 294,
	"./ja.js": 294,
	"./jv": 295,
	"./jv.js": 295,
	"./ka": 296,
	"./ka.js": 296,
	"./kk": 297,
	"./kk.js": 297,
	"./km": 298,
	"./km.js": 298,
	"./kn": 299,
	"./kn.js": 299,
	"./ko": 300,
	"./ko.js": 300,
	"./ky": 301,
	"./ky.js": 301,
	"./lb": 302,
	"./lb.js": 302,
	"./lo": 303,
	"./lo.js": 303,
	"./lt": 304,
	"./lt.js": 304,
	"./lv": 305,
	"./lv.js": 305,
	"./me": 306,
	"./me.js": 306,
	"./mi": 307,
	"./mi.js": 307,
	"./mk": 308,
	"./mk.js": 308,
	"./ml": 309,
	"./ml.js": 309,
	"./mr": 310,
	"./mr.js": 310,
	"./ms": 311,
	"./ms-my": 312,
	"./ms-my.js": 312,
	"./ms.js": 311,
	"./mt": 313,
	"./mt.js": 313,
	"./my": 314,
	"./my.js": 314,
	"./nb": 315,
	"./nb.js": 315,
	"./ne": 316,
	"./ne.js": 316,
	"./nl": 317,
	"./nl-be": 318,
	"./nl-be.js": 318,
	"./nl.js": 317,
	"./nn": 319,
	"./nn.js": 319,
	"./pa-in": 320,
	"./pa-in.js": 320,
	"./pl": 321,
	"./pl.js": 321,
	"./pt": 322,
	"./pt-br": 323,
	"./pt-br.js": 323,
	"./pt.js": 322,
	"./ro": 324,
	"./ro.js": 324,
	"./ru": 325,
	"./ru.js": 325,
	"./sd": 326,
	"./sd.js": 326,
	"./se": 327,
	"./se.js": 327,
	"./si": 328,
	"./si.js": 328,
	"./sk": 329,
	"./sk.js": 329,
	"./sl": 330,
	"./sl.js": 330,
	"./sq": 331,
	"./sq.js": 331,
	"./sr": 332,
	"./sr-cyrl": 333,
	"./sr-cyrl.js": 333,
	"./sr.js": 332,
	"./ss": 334,
	"./ss.js": 334,
	"./sv": 335,
	"./sv.js": 335,
	"./sw": 336,
	"./sw.js": 336,
	"./ta": 337,
	"./ta.js": 337,
	"./te": 338,
	"./te.js": 338,
	"./tet": 339,
	"./tet.js": 339,
	"./th": 340,
	"./th.js": 340,
	"./tl-ph": 341,
	"./tl-ph.js": 341,
	"./tlh": 342,
	"./tlh.js": 342,
	"./tr": 343,
	"./tr.js": 343,
	"./tzl": 344,
	"./tzl.js": 344,
	"./tzm": 345,
	"./tzm-latn": 346,
	"./tzm-latn.js": 346,
	"./tzm.js": 345,
	"./uk": 347,
	"./uk.js": 347,
	"./ur": 348,
	"./ur.js": 348,
	"./uz": 349,
	"./uz-latn": 350,
	"./uz-latn.js": 350,
	"./uz.js": 349,
	"./vi": 351,
	"./vi.js": 351,
	"./x-pseudo": 352,
	"./x-pseudo.js": 352,
	"./yo": 353,
	"./yo.js": 353,
	"./zh-cn": 354,
	"./zh-cn.js": 354,
	"./zh-hk": 355,
	"./zh-hk.js": 355,
	"./zh-tw": 356,
	"./zh-tw.js": 356
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 533;

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_search_options_search_options__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { MyUtilsPage } from '../pages/my-utils/my-utils' ;
//import { PreLoginPage } from '../pages/pre-login/pre-login';



//import ImgCache from 'imgcache.js';

//import {ScreenOrientation} from "@ionic-native/screen-orientation";
//import { AndroidPermissions } from '@ionic-native/android-permissions';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, backgroundMode
    // ,androidPermissions:AndroidPermissions
    //, private oSO:ScreenOrientation
    , alert, network, oLoginService) {
        var _this = this;
        this.platform = platform;
        this.backgroundMode = backgroundMode;
        this.alert = alert;
        this.network = network;
        this.oLoginService = oLoginService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            // androidPermissions.requestPermissions(
            //   [
            //     androidPermissions.PERMISSION.CAMERA, 
            //     androidPermissions.PERMISSION.CALL_PHONE, 
            //     androidPermissions.PERMISSION.GET_ACCOUNTS, 
            //     androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
            //     androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            //   ]
            // );
            //      platform.isPlatformMatch('')
            //      this.oSO.lock(this.oSO.ORIENTATIONS.PORTRAIT);
            // activated debug mode
            //      ImgCache.options.debug = true;
            // page is set until img cache has started
            // ImgCache.init(() => { //this.nav.setRoot(TabsPage); 
            // },
            //   () => { console.error('ImgCache init: error! Check the log for errors'); });
            // prevents the app from being paused while in background.
            _this.backgroundMode.enable();
            _this.disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                console.log('network was disconnected :-(');
                __WEBPACK_IMPORTED_MODULE_9__app_properties__["a" /* Global_Variables */].isConnected = false;
            });
            _this.connectSubscription = _this.network.onConnect().subscribe(function () {
                //        console.log('network connected!');
                // We just got a connection but we need to wait briefly
                // before we determine the connection type. Might need to wait.
                // prior to doing any api requests as well.
                setTimeout(function () {
                    console.log("Network Connected.");
                    __WEBPACK_IMPORTED_MODULE_9__app_properties__["a" /* Global_Variables */].isConnected = true;
                    // if (this.network.type === 'wifi') {
                    //   console.log('we got a wifi connection, woohoo!');
                    // }
                }, 1000);
            });
        });
        // used for an example of ngFor and navigation
        this.customerPages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_search_options_search_options__["a" /* SearchOptionsPage */], space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'My transaction', component: 'OrdersPage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'Profile', component: 'MyProfilePage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'About us', component: 'AboutUsPage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'Feedback', component: 'FeedbackPage', space: 'ksd-small-space', style: 'ksd-padding', padtop: 'N' }
        ];
        // used for an example of ngFor and navigation
        this.merchantPages = [
            { title: 'Home', component: 'MerchantHomePage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'Orders', component: 'OrderSummaryPage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'Profile', component: 'MerchantProfilePage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'About us', component: 'AboutUsPage', space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
            { title: 'Feedback', component: 'FeedbackPage', space: 'ksd-small-space', style: 'ksd-padding', padtop: 'N' }
        ];
    }
    MyApp.prototype.ionViewWillUnload = function () {
        this.disconnectSubscription.unsubscribe();
        this.connectSubscription.unsubscribe();
    };
    MyApp.prototype.getBgColor = function (title) {
        if (title === __WEBPACK_IMPORTED_MODULE_9__app_properties__["a" /* Global_Variables */].sCurrentPage)
            return 'ksd-title-selected';
        return 'ksd-title';
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.onClose = function () {
        this.nav.setRoot('MerchantHomePage');
    };
    MyApp.prototype.setupMinimizedNotification = function () {
        document.addEventListener("pause", function () {
            console.log('paused');
        }, false);
    };
    MyApp.prototype.setupResumeNotification = function () {
        document.addEventListener("resume", function () {
            console.log('resume');
        }, false);
    };
    MyApp.prototype.onExitApp = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'Confirm',
            message: 'Do you want to exit?',
            cssClass: 'alert-css',
            buttons: [{
                    cssClass: 'alert-button-css',
                    text: "Yes",
                    handler: function () {
                        _this.backgroundMode.disable();
                        _this.platform.exitApp();
                    }
                }, {
                    text: "No",
                    role: 'cancel'
                }]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-app-component',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-navbar>\n      <ion-buttons left>\n        <button ion-button icon-only menuToggle>\n        <ion-icon name="close"></ion-icon>\n      </button>\n      </ion-buttons>\n      <ion-title text-center>My account</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content no-padding>\n    <div no-padding *ngIf="this.oLoginService.getUserType() == \'C\'">\n      <ion-list no-padding>\n        <div no-padding *ngFor="let p of customerPages" (click)="openPage(p)">\n          <ion-item no-lines no-padding item item-icon-right menuClose (click)="openPage(p)">\n            <ion-row *ngIf="p.padtop === \'Y\'">\n              <ion-col class="ksd-big-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row *ngIf="p.padtop === \'N\'">\n              <ion-col class="ksd-small-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row no-padding>\n              <ion-col no-padding col-11 class="ksd-padding">\n                <!--<div [class]="p.style">-->\n                <div [class]="getBgColor(p.title)">\n                  {{p.title}}\n                </div>\n              </ion-col>\n              <ion-col no-padding col-1 class="ksd-right-arrow">\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-item>\n        </div>\n        <div>\n          <ion-item no-lines no-padding item item-icon-right>\n            <ion-row>\n              <ion-col class="ksd-big-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row no-padding>\n              <ion-col no-padding col-11 class="ksd-padding">\n                <!--<div [class]="p.style">-->\n                <div [class]="getBgColor(p?.title)" (click)="onExitApp()">\n                  Logout\n                </div>\n              </ion-col>\n              <ion-col no-padding col-1 class="ksd-right-arrow">\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n    <div *ngIf="this.oLoginService.getUserType() == \'M\'">\n      <ion-list>\n        <div *ngFor="let p of merchantPages">\n          <ion-item no-lines no-padding item item-icon-right menuClose (click)="openPage(p)">\n            <ion-row *ngIf="p.padtop === \'Y\'">\n              <ion-col class="ksd-big-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row *ngIf="p.padtop === \'N\'">\n              <ion-col class="ksd-small-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col width-90 class="ksd-padding">\n                <div [class]="getBgColor(p.title)">\n                  {{p.title}}\n                </div>\n              </ion-col>\n              <ion-col width-10 class="ksd-right-arrow">\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-item>\n        </div>\n        <div>\n          <ion-item no-lines no-padding item item-icon-right menuClose>\n            <ion-row>\n              <ion-col class="ksd-big-spacer">\n              </ion-col>\n            </ion-row>\n            <ion-row no-padding>\n              <ion-col no-padding col-11 class="ksd-padding">\n                <!--<div [class]="p.style">-->\n                <div [class]="getBgColor(p?.title)" (click)="onExitApp()">\n                  Logout\n                </div>\n              </ion-col>\n              <ion-col no-padding col-1 class="ksd-right-arrow">\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n\n    <div class="ksd-user-info">Logged as {{this.oLoginService.getEmail()}}\n    </div>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */]
            // ,androidPermissions:AndroidPermissions
            //, private oSO:ScreenOrientation
            ,
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_7__providers_login_service__["a" /* LoginService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectRegionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SelectRegionComponent = /** @class */ (function () {
    function SelectRegionComponent(oEvents) {
        this.oEvents = oEvents;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oItems = [{ Name: 'Any' },
            { Name: 'North' },
            { Name: 'South' },
            { Name: 'West' },
            { Name: 'East' },
            { Name: 'Central' }
        ];
    }
    // onSelected ( e: any )
    // {
    //   console.log ( "SELECTED: " + JSON.stringify ( e )) ;
    //   this.oEvents.publish ( "Region", e ) ;
    // }
    SelectRegionComponent.prototype.onSelected = function (o) {
        var s = o; //Global_Variables.searchRegion.trim() ;
        if (s == 'Any')
            s = '%';
        __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].selectedRegion = s;
        this.oEvents.publish("Region", s);
    };
    SelectRegionComponent.prototype.ngOnInit = function () {
        var s = __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].searchRegion;
        if (__WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].searchRegion === '%')
            s = 'Any';
        this.oItems.forEach(function (item) {
            if (s === item.Name) {
                item['checked'] = true;
                __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].selectedRegion = s;
                if (s == 'Any')
                    __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].selectedRegion = '%';
            }
            else
                item['checked'] = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectRegionComponent.prototype, "select", void 0);
    SelectRegionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-region',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/select-region/select-region.html"*/'<ion-row>\n  <ion-col>\n    <ion-item>\n      <ion-label color="#ffffff" floating>Location</ion-label>\n\n      <!--<ion-select (ionChange)="select.emit($event)">-->\n      <ion-select (ionChange)="onSelected($event)">\n        <ion-option *ngFor="let o of oItems" selected="{{o.checked}}">{{o.Name}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-col>\n</ion-row>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/select-region/select-region.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
    ], SelectRegionComponent);
    return SelectRegionComponent;
}());

//# sourceMappingURL=select-region.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectCuisineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//https://stackoverflow.com/questions/45500899/create-custom-dialog-box-in-ionic-2
var SelectCuisineComponent = /** @class */ (function () {
    function SelectCuisineComponent(oEvents) {
        this.oEvents = oEvents;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oItems = [{ Name: 'Others' },
            { Name: 'Japanese' },
            { Name: 'Chinese' },
            { Name: 'Indian' },
            { Name: 'Thai' },
            { Name: 'Western' }
        ];
    }
    SelectCuisineComponent.prototype.onSelected = function (o) {
        var s = "";
        o.forEach(function (item, index) {
            if (index > 0)
                s += ",";
            s += "'" + item.trim() + "'";
        });
        //    console.log(s);
        if (this.current === null)
            __WEBPACK_IMPORTED_MODULE_1__app_properties__["a" /* Global_Variables */].selectedCuisines = s;
        else
            this.current = s;
        this.oEvents.publish("Cuisines", s);
    };
    SelectCuisineComponent.prototype.ngOnInit = function () {
        var v = __WEBPACK_IMPORTED_MODULE_1__app_properties__["a" /* Global_Variables */].selectedCuisines;
        if (this.current !== null) {
            v = this.current;
        }
        console.log(v);
        this.oItems.forEach(function (item) {
            if (v.indexOf(item.Name) > -1)
                item['checked'] = true;
            else
                item['checked'] = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectCuisineComponent.prototype, "select", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SelectCuisineComponent.prototype, "current", void 0);
    SelectCuisineComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-cuisine',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/select-cuisine/select-cuisine.html"*/'<ion-row>\n  <ion-col>\n    <!--<ion-row syte="padding:0px">\n      <ion-col syte="padding:0px">\n        <ion-label>Cuisine</ion-label>\n      </ion-col>\n    </ion-row>-->\n    <ion-item>\n      <ion-label color="#ffffff" floating>Cuisines</ion-label>\n      <ion-select (ionChange)="onSelected($event)" multiple>\n        <ion-option *ngFor="let o of oItems" selected="{{o.checked}}">{{o.Name}}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-col>\n</ion-row>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/select-cuisine/select-cuisine.html"*/,
            styles: [".button-inner {\n    color: red ;\n  }"]
            //  styleUrls: ['select-cuisine.scss']
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"]])
    ], SelectCuisineComponent);
    return SelectCuisineComponent;
}());

//# sourceMappingURL=select-cuisine.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreLoginPage = /** @class */ (function () {
    function PreLoginPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PreLoginPage.prototype.onRegister = function () {
        this.navCtrl.push('RegisterPage');
    };
    PreLoginPage.prototype.onLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    PreLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pre-login',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/pre-login/pre-login.html"*/'<ion-header>\n  <!--<ion-navbar>\n    <div class="logo">\n      <img src="assets/img/logo.jpg" width="100px" />\n    </div>\n  </ion-navbar>-->\n</ion-header>\n<ion-content no-padding>\n  <div style="width:100%" class="HIERegYellow">\n    <div>\n      <h1 text-left class="HIELight">Have it early</h1>\n      <hr class="HIEhr">\n      <h3 text-left class="HIEReg">Get The Same For Less</h3>\n    </div>\n    <div style="margin:16px">\n    <button style="text-align:center" class="HIEButton" ion-button ion-only full (click)="onLogin()">Login</button>\n    </div>\n    <p style="color:yellow;" (click)="onRegister()">Register</p>\n  </div>\n  <!--<ion-grid style="position: absolute; bottom: 20px;">\n    <ion-row>\n      <ion-col width-10></ion-col>\n      <ion-col>\n        <button ion-button ion-only full (click)="onLogin()">Login</button>\n      </ion-col>\n      <ion-col width-10></ion-col>\n    </ion-row>\n  </ion-grid>-->\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/pre-login/pre-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], PreLoginPage);
    return PreLoginPage;
}());

//# sourceMappingURL=pre-login.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_service__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DBLoginPage = /** @class */ (function () {
    function DBLoginPage(//private navCtrl: NavController, 
    viewCtrl, oLoginService) {
        this.viewCtrl = viewCtrl;
        this.oLoginService = oLoginService;
        this.data = { email: "", password: "" };
    }
    DBLoginPage.prototype.login = function () {
        var _this = this;
        this.oLoginService.performLogin(this.data)
            .then(function (data) {
            console.log("Logged In " + JSON.stringify(data));
            _this.viewCtrl.dismiss();
        })
            .catch(function (err) {
            console.log("Login Failed");
            console.log(err);
        });
    };
    DBLoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DBLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-db-login',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/db-login/db-login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Close</button>\n    </ion-buttons>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label fixed>Username</ion-label>\n    <ion-input type="text" [(ngModel)]="data.email" name="Email"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed>Password</ion-label>\n    <ion-input type="password" [(ngModel)]="data.password" name="Password"></ion-input>\n  </ion-item>\n\n\n  <button ion-button color="primary" full (click)="login()">Loign</button>\n\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/db-login/db-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__providers_login_service__["a" /* LoginService */]])
    ], DBLoginPage);
    return DBLoginPage;
}());

//# sourceMappingURL=db-login.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProviders; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_face_book__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_merchant_service__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_cart_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_diagnostic__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_calendar__ = __webpack_require__(167);





//import { FileTransfer } from '@ionic-native/file-transfer';





//import { RestaurantService } from '../providers/restaurant-service';








//https://www.joshmorony.com/automating-mocks-in-ionic-native-3-x/
var CameraMock = /** @class */ (function () {
    function CameraMock() {
    }
    CameraMock.prototype.getPicture = function (options) {
        return new Promise(function (resolve, reject) {
            resolve("data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
        });
    };
    return CameraMock;
}());
var AppProviders = /** @class */ (function () {
    function AppProviders() {
    }
    AppProviders.prototype.getProviders = function () {
        var providers;
        /*
           return {
              provide: Camera, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
              providers = [
                Camera,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                MerchantService, CartService, FaceBook, LoginService, APIService, RestaurantService
              ];
              return providers ;
                } else {
         providers = [
                { provide: Camera, useClass: CameraMock },
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                MerchantService, CartService, FaceBook, LoginService, APIService, RestaurantService
              ];
                        return providers ;
                }
              }, deps: [Platform]
            };
          }
        
          private static deviceRunningCordova(platform: Platform): boolean {
        //if(window.hasOwnProperty('cordova'))
            return platform.is('cordova');
          }
        */
        if (document.URL.includes('https://') || document.URL.includes('http://')) {
            // Use browser providers
            providers = [
                { provide: __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], useClass: CameraMock },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_10__providers_merchant_service__["a" /* MerchantService */], __WEBPACK_IMPORTED_MODULE_11__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_9__providers_face_book__["a" /* FaceBook */], __WEBPACK_IMPORTED_MODULE_8__providers_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_7__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
                //FileTransfer, 
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_calendar__["a" /* Calendar */]
            ];
        }
        else {
            // Use device providers
            providers = [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_10__providers_merchant_service__["a" /* MerchantService */], __WEBPACK_IMPORTED_MODULE_11__providers_cart_service__["a" /* CartService */], __WEBPACK_IMPORTED_MODULE_9__providers_face_book__["a" /* FaceBook */], __WEBPACK_IMPORTED_MODULE_8__providers_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_7__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
                //FileTransfer,  
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_calendar__["a" /* Calendar */]
            ];
        }
        return providers;
    };
    return AppProviders;
}());

//# sourceMappingURL=app-providers.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import { Http } from '@angular/http';

//import { sIMAGE_URL } from '../app/properties';
var CartService = /** @class */ (function () {
    function CartService() {
        this.cart = [];
        this.statusChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CartService.prototype.setID = function (oID) {
        this.id = oID;
    };
    CartService.prototype.getID = function () { return this.id; };
    CartService.prototype.getCart = function () {
        return this.cart;
    };
    ;
    CartService.prototype.addItem = function (oItem) {
        console.log(JSON.stringify(oItem));
        var n = this.cart.length;
        for (var i = 0; i < n; i++) {
            if (this.cart[i].oProduct.ID == oItem.ID) {
                this.cart[i].qty += oItem.qty;
                return true;
            }
            //      return false ;
        }
        oItem.PRICE = Math.round((+oItem.USUAL_PRICE) * (1 - (+oItem.DISCOUNT)) * 100) / 100;
        var q = oItem.qty;
        if (!q)
            q = 1;
        this.cart.push({
            oProduct: oItem,
            qty: q,
            bShowDelete: true
        });
        oItem._qty = (oItem.qty ? oItem.qty : 1);
        this.statusChanged.emit({
            oProduct: oItem,
            type: 'add',
            totalCount: this.cart.length
        });
    };
    ;
    CartService.prototype.removeItem = function (oItem) {
        var me = this;
        this.cart.forEach(function (o, i) {
            if (o.oProduct.ID == oItem.ID) {
                //        o.qty = 0 ;
                me.removeCartItem(i);
                return;
            }
        });
    };
    CartService.prototype.updateSelectedItem = function (oItems) {
        oItems.forEach(function (oItem) {
            oItem.wasSelected = false;
            oItem._qty = "";
        });
        this.cart.forEach(function (oCItem, i) {
            oItems.forEach(function (oItem) {
                if (oCItem.oProduct.ID == oItem.ID) {
                    oItem.wasSelected = true;
                    oItem._qty = oCItem.qty;
                }
            });
        });
    };
    CartService.prototype.removeAllItems = function () {
        this.cart.length = 0;
    };
    CartService.prototype.removeFromCart = function (oCItem) {
        this.removeItem(oCItem.oProduct);
    };
    CartService.prototype.removeCartItem = function (index) {
        var oCItem = this.cart[index];
        this.cart.splice(index, 1);
        this.statusChanged.emit({
            oProduct: oCItem.oProduct,
            type: 'remove',
            totalCount: this.cart && this.cart.length ? this.cart.length : 0,
        });
    };
    ;
    CartService.prototype.adjustQty = function (idx, qty) {
        var oCItem;
        oCItem = this.cart[idx];
        oCItem.qty += qty;
        if (oCItem.qty == 0) {
            this.removeFromCart(idx);
            return;
        }
        else
            oCItem.Product._qty = oCItem.qty;
        if (oCItem.Product.qty == 1)
            oCItem.Product.bShowDelete = true;
        else
            oCItem.Product.bShowDelete = false;
    };
    //From Restaurant Menu Page
    CartService.prototype.adjustQty4Item = function (oItem, qty) {
        var me = this;
        this.cart.forEach(function (oCItem, i) {
            if (oCItem.oProduct.ID == oItem.ID) {
                oCItem.qty += qty;
                if (oCItem.qty == 0) {
                    oItem._qty = "";
                    oItem.wasSelected = false;
                    me.removeFromCart(oCItem);
                    return;
                }
                else
                    oItem._qty = oCItem.qty;
                if (oCItem.qty == 1)
                    oCItem.bShowDelete = true;
                else
                    oCItem.bShowDelete = false;
                //        console.log("bShowDelete: " + o.bShowDelete);
                return;
            }
        });
    };
    //From Shopping Cart
    CartService.prototype.adjustItemQty = function (oCItem, qty) {
        var me = this;
        this.cart.forEach(function (o, i) {
            if (o.oProduct.ID == oCItem.oProduct.ID) {
                o.qty += qty;
                if (o.qty == 0) {
                    oCItem.oProduct._qty = "";
                    oCItem.oProduct.wasSelected = false;
                    me.removeFromCart(oCItem);
                    return;
                }
                else
                    oCItem.oProduct._qty = o.qty;
                if (o.qty == 1)
                    o.bShowDelete = true;
                else
                    o.bShowDelete = false;
                return;
            }
        });
    };
    CartService.prototype.getPrice = function (oItem) {
        return (+oItem.PRICE) * (+oItem._qty);
    };
    CartService.prototype.getTotalSaved = function () {
        var s = 0;
        if (!this.cart || !this.cart.length) {
            return s;
        }
        for (var i = 0; i < this.cart.length; i = i + 1) {
            s = s + (+this.cart[i].oProduct.USUAL_PRICE - (+this.cart[i].oProduct.PRICE)) * (+this.cart[i].qty);
        }
        return Math.round(s * 100) / 100;
    };
    CartService.prototype.calcTotalQty = function () {
        var q = 0;
        if (!this.cart || !this.cart.length) {
            return q;
        }
        for (var i = 0; i < this.cart.length; i = i + 1) {
            q = q + (+this.cart[i].qty);
        }
        return q;
    };
    CartService.prototype.calcTotalSum = function () {
        var sum = 0;
        if (!this.cart || !this.cart.length) {
            return sum;
        }
        for (var i = 0; i < this.cart.length; i = i + 1) {
            sum = sum + (+this.cart[i].oProduct.PRICE) * (+this.cart[i].qty);
        }
        return Math.round(sum * 100) / 100;
    };
    CartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], CartService);
    return CartService;
}());

//# sourceMappingURL=cart-service.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_error_login_error__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_options_search_options__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ForgotPasswordPage } from '../forgot-password/forgot-password';
//import { DBLoginPage } from '../db-login/db-login';


//import { DatePickerComponent } from '../../components/date-picker/date-picker';
//import { SimpleAlert } from
'../../providers/simple-alert';
//import { PasswordResetMessagePage } from
'../password-reset-message/password-reset-message';


//import { Global_Variables } from '../../app/properties';

//import { TextMaskModule } from 'angular2-text-mask';
// import { CardModule } from 'ngx-card/ngx-card';
// declare var Card:any ;

// Aaa@gmail.com / aaaaaa
// 1 user1@user1.com                ocs18                
// 2 user2@user2.com                fff                  
// 3 Muser1@user1.com               aaa                  
// 4 Muser2@user2.com               fff  
//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702614956729294" --variable APP_NAME="HaveItEarly"
var LoginPage = /** @class */ (function () {
    //  data: any = { email: "wpg@37.com", password: "aaaaaa" };
    function LoginPage(navCtrl, oBuilder
    //, private oPlatform: Platform
    , modalCtrl
    //, private viewCtrl: ViewController
    , oStorage, loadingCtrl, oFB, oAPIService, oLoginService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.oBuilder = oBuilder;
        this.modalCtrl = modalCtrl;
        this.oStorage = oStorage;
        this.loadingCtrl = loadingCtrl;
        this.oFB = oFB;
        this.oAPIService = oAPIService;
        this.oLoginService = oLoginService;
        this.alertCtrl = alertCtrl;
        this.testSlides = [];
        // public cardMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.data = { email: "Muser1@user1.com", password: "aaa" };
        this.bDebug = false;
        //    this.getCCForm ( ) ;
        this.oInputForm = this.oBuilder.group({
            email: [this.data.email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(__WEBPACK_IMPORTED_MODULE_8__app_properties__["b" /* V */].Email_Max), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(__WEBPACK_IMPORTED_MODULE_8__app_properties__["b" /* V */].Email_Min), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            password: [this.data.password, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(__WEBPACK_IMPORTED_MODULE_8__app_properties__["b" /* V */].Password_Max), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(__WEBPACK_IMPORTED_MODULE_8__app_properties__["b" /* V */].Password_Min), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(__WEBPACK_IMPORTED_MODULE_8__app_properties__["b" /* V */].Password), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])]
            // password: ['', Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])]
        });
        //      Facebook.browserInit(this.FB_APP_ID, "v2.8");
        // this.datePicker.onDateSelected.subscribe(
        //   (date) => {
        //     console.log(date);
        //   });
    }
    // ionViewDidEnter() {
    //   //    this.oInputForm.get("email").
    //   setTimeout(() => {
    //     console.log ( this.items ) ;
    //     var e: ElementRef = this.abc.getElementRef();
    //     var oInput = e ; //e.nativeElement.firstElementChild ;
    //     console.log(oInput); //   querySelector('ion-input'));
    //     var im = new Inputmask({ mask: "9999 9999 9999 9999"});
    //     im.mask(oInput);
    //     console.log(im);
    //   }, 1000);
    // }
    //   ionViewDidLoad() {
    // //    this.oInputForm.get("email").
    //     setTimeout(() => {
    //       var e:ElementRef = this.abc.getElementRef() ;
    //       console.log(e.);
    //       var im = new Inputmask("9999 9999 9999 9999");
    //         im.mask(e.nativeElement);          
    // }, 5000);
    //   }
    LoginPage.prototype.onForgotPassword = function () {
        this.navCtrl.push("ForgotPasswordPage");
    };
    /*
    declinedPermissions: [],
    provider: 'facebook',
    profile:{
    id: '121212121212121212',
    name: 'XYZ',
    email: 'xyz@gmail.com',
    first_name: 'XYZ',
    last_name: 'XYZ',
    age_range: { min: 21 },
    link: 'https://www.facebook.com/app_scoped_user_id/121212121212121212/',
    picture: { data: { is_silhouette: false,url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/12/12.jpg?oh=12&oe=12' } },
    gender: 'male',
    locale: 'en_US',
    timezone: 5.5,
    updated_time: '2017-02-01T08:16:35+0000',verified: true },
    type: 'success',
    credentials: {
    permissions: [ 'public_profile', 'contact_email', 'user_friends', 'email' ],
    tokenExpirationDate: '2017-05-13T14:56:36.690+0530',
    userId: '1212121212121212121',
    token:'ababababababababbababababa' }
    
    */
    LoginPage.prototype.fbLogin = function () {
        //    console.log("In fbLogin");
        //    var me = this;
        // this.oFB.getLoginStatus().then((status) => {
        //   status.log('STATUS');
        //   this.oAPIService.send2ServerP("log", true, status).then((d) => {
        var _this = this;
        //   }) ;
        // });
        var params = new Array();
        this.oFB.api('/me/permissions?method=DELETE', params).then(function (response) {
            //      response.log('DELETE');
            //      this.oAPIService.send2ServerP("log", true, response).then(//(d) => { 
            //     }) ;
        });
        this.oFB.logout().then(function (res) {
            //     res.log('LOGOUT');
            //     this.oAPIService.send2ServerP("log", true, res).then((d) //=> {     
            //     }) ;
        });
        // let params = new Array();
        // var sUserID = res.authResponse.userID;
        // this.oFB.api("/" + sUserID + '/me/permissions?method=DELETE', params).then((response) => {
        //   console.log(response); // true
        // }) ;
        this.oFB.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            //        console.log('Logged into Facebook!', JSON.stringify(res));
            _this.oAPIService.send2ServerP("log", true, res);
            var sUserID = res.authResponse.userID;
            var params = new Array();
            _this.oFB.api('/me?fields=name,email,gender', params).then(function (user) {
                user.picture = "https://graph.facebook.com/" + sUserID + "/picture?type=large";
                //now we have the users info, let's save it in the NativeStorage
                //          this.oAPIService.send2ServerP("log", true, user);
                _this.oLoginService.performFBLogin(user).then(function (data) {
                    //                console.log("Logged In " + JSON.stringify(data));
                    _this.oLoginService.saveToken(data.id_token);
                    if (_this.oLoginService.getUserType() == 'C')
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__search_options_search_options__["a" /* SearchOptionsPage */]);
                    // else
                    //   if (this.oLoginService.getUserType() == 'M')
                    //     this.navCtrl.setRoot(MerchantHomePage);
                    //   else {
                    //     console.log("Login OK: But neither Merchant nor Customer => " + this.oLoginService.getUserType());
                    //   }
                });
                //          alert(JSON.stringify(user));
            }).catch(function (e) {
                _this.oAPIService.send2ServerP("log", true, e);
            });
            /*
                this.oLoginService.performFBLogin(data)
                  .then((data) => {
                    this.bError = false;
                    console.log("Logged In " + JSON.stringify(data));
                    this.oLoginService.saveToken(data.id_token);
                    if (this.oLoginService.getUserType() == 'C')
                      this.navCtrl.setRoot(SearchOptionsPage);
                    // else
                    //   if (this.oLoginService.getUserType() == 'M')
                    //     this.navCtrl.setRoot(MerchantHomePage);
                    //   else {
                    //     console.log("Login OK: But neither Merchant nor Customer => " + this.oLoginService.getUserType());
                    //   }
                  })
                  .catch((err) => {
                    this.bError = true;
                    me.showLoginError();
                    //   let alert = this.alertCtrl.create({
                    //    title: '',
                    //    cssClass: 'alertDanger',
                    //    subTitle: 'Invalid email and password.',
                    //    buttons: ['Ok']
                    //  });
                    //       alert.present();
    
                    //          console.log("Login Failed");
                    console.log(err);
                  })
              }
              this.navCtrl.pop();
              this.navCtrl.push(LoginPage);
            }
            });
              */
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
        //  }) ;
        // this.oFaceBook.login().then(() => {
        //   this.oFaceBook.getCurrentUserProfile().then(
        //     (profileData) => {
        //       console.log(JSON.stringify(profileData));
        //       // this.email = profileData.email;
        //       // this.name = profileData.name;
        //       // this.id = profileData.id;
        //     }
        //   );
        // });
        // let permissions = new Array<string>();
        // let nav = this.navCtrl;
        // //the permissions your facebook app needs from the user
        // permissions = ["public_profile"];
        // Facebook.login(permissions)
        // .then(function(response){
        //   let userId = response.authResponse.userID;
        //   let params = new Array<string>();
        //   //Getting name and gender properties
        //   Facebook.api("/me?fields=name,gender", params)
        //   .then(function(user) {
        //     user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //     //now we have the users info, let's save it in the NativeStorage
        //     NativeStorage.setItem('user',
        //     {
        //       name: user.name,
        //       gender: user.gender,
        //       picture: user.picture
        //     })
        //     .then(function(){
        //       nav.push(SearchResultPage);
        //     }, function (error) {
        //       console.log(error);
        //     })
        //   })
        // }, function(error){
        //   console.log(error);
        // });
        //this.navCtrl.setRoot(FBLoginPage);
        //    this.navCtrl.setRoot(SearchResultPage);
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (this.oLoginService.getToken() == null) {
            //      console.log("Not Logged In Previously");
            this.oStorage.get('UserEmail').then(function (s) {
                __WEBPACK_IMPORTED_MODULE_8__app_properties__["a" /* Global_Variables */].sUserEmail = s;
                _this.oInputForm.controls['email'].setValue(s);
            });
        }
        else
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__search_options_search_options__["a" /* SearchOptionsPage */]);
    };
    LoginPage.prototype.DBLogin = function (formData) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'authenticating...'
        });
        this.loading.present();
        this.oLoginService.performLogin(formData)
            .then(function (data) {
            __WEBPACK_IMPORTED_MODULE_8__app_properties__["a" /* Global_Variables */].sUserEmail = formData.email;
            _this.oStorage.set('UserEmail', __WEBPACK_IMPORTED_MODULE_8__app_properties__["a" /* Global_Variables */].sUserEmail);
            //        console.log("Logged In " + JSON.stringify(data));
            _this.oLoginService.saveToken(data.id_token);
            _this.loading.dismiss();
            if (_this.oLoginService.getUserType() == 'C')
                //            this.navCtrl.setRoot(TestPage) ;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__search_options_search_options__["a" /* SearchOptionsPage */]);
            else if (_this.oLoginService.getUserType() == 'M')
                _this.navCtrl.setRoot('MerchantHomePage');
            else {
                console.log("Login OK: But neither Merchant nor Customer => " + _this.oLoginService.getUserType());
            }
        })
            .catch(function (err) {
            _this.loading.dismiss();
            //        if (Global_Variables.isConnected)
            if (err !== 'No Network')
                _this.showLoginError();
            //        else
            //          this.oAPIService.showNetworkError();
            //   let alert = this.alertCtrl.create({
            //    title: '',
            //    cssClass: 'alertDanger',
            //    subTitle: 'Invalid email and password.',
            //    buttons: ['Ok']
            //  });
            //       alert.present();
            //          console.log("Login Failed");
            console.log(err);
        });
    };
    // getCCForm() {
    //   this.oCCForm = this.oBuilder.group({
    //     CCA: ['5', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
    //     CCB: ['4', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
    //     CCC: ['3', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
    //     CCD: ['1', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
    //     CCMM: ['05', Validators.compose([Validators.maxLength(2), Validators.minLength(1), Validators.required])],
    //     CCYY: ['17', Validators.compose([Validators.maxLength(2), Validators.minLength(1), Validators.required])],
    //     CCV: ['8', Validators.compose([Validators.maxLength(3), Validators.minLength(3), Validators.required])],
    //     CCN: ['Walter', Validators.compose([Validators.maxLength(25), Validators.minLength(3), Validators.required])]
    //   });
    // }
    LoginPage.prototype.onRegister = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.signUp = function (any) {
        //    this.navCtrl.push(ProfilePage, { signUp: true });
        console.log('sign up');
    };
    // showCalendar() {
    //   this.datePicker.showCalendar();
    // }
    LoginPage.prototype.showLoginError = function () {
        var oModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__login_error_login_error__["a" /* LoginErrorPage */]);
        //, { enableBackdropDismiss: false });
        oModal.onDidDismiss(function (data) {
            console.log(data);
        });
        oModal.present();
        //    oModal.present(oModal);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ccn'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "abc", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('cc'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "items", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mySlider'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "mySlider", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar align-title="center">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!-- http://www.joshmorony.com/create-an-animated-login-screen-in-ionic-2/\n -->\n\n<ion-content>\n  <div class="ksd-spacer"></div>\n  <!--<ion-row>\n    <ion-col>\n      <ion-slides [options]="_options" #mySlider>\n        <ion-slide *ngFor="let testSlide of testSlides">\n          <img src="http://placehold.it/150x150">\n        </ion-slide>\n      </ion-slides>\n      <div class="swiper-pagination"></div>\n    </ion-col>\n  </ion-row>-->\n  <!--<ion-col>\n      <button ion-button block color="fb-color" (click)="fbLogin()">\n        Sign in with Facebook\n      </button>\n    </ion-col>\n    <ion-row>\n        <ion-col>\n      <button ion-button block color="gp-color" (click)="gpLogin()">\n        Sign in with Google Plus\n      </button>\n        </ion-col>\n    </ion-row>\n    <ion-col>-->\n  <!--<div class="spacer"></div>-->\n  <!--<ion-list>-->\n      <!-- <div class="card-js"></div> -->\n  <ion-grid>\n      <!-- CSS is included via this JavaScript file -->\n    <form [formGroup]=\'oInputForm\'>\n      <ion-item>\n        <!-- <ion-icon name="person" item-left></ion-icon>         -->\n        <ion-label for="email" floating>Email</ion-label>\n        <!--<ion-input type="text" [(ngModel)]="data.email" name="username"></ion-input>-->\n        <ion-input id="email" type="email" class="ksd-email" formControlName="email"></ion-input>\n        <!-- [class.invalid]="!oInputForm.controls.email.valid && (oInputForm.controls.email.dirty || submitAttempt)" -->\n\n        <!-- <ion-label>{{oInputForm.controls.email.className}}</ion-label> -->\n        <!-- <ion-item *ngIf="!oInputForm.controls.email.valid  && (oInputForm.controls.email.dirty || submitAttempt)">\n          <p>Please enter a valid email.</p>\n        </ion-item>\n        <p *ngIf="oInputForm.controls.email.$invalid && !oInputForm.controls.email.$pristine" class="help-block">You name is required.</p> -->\n\n      </ion-item>\n      <!-- Working fine -->\n      <!-- <ion-item no-lines *ngIf="oInputForm.controls.email.hasError(\'required\')">\n        <div class="error">required</div>\n      </ion-item>\n      <ion-item no-lines *ngIf="oInputForm.controls.email.hasError(\'minlength\')">\n        <div class="error">Min Length</div>\n      </ion-item>\n      <ion-item no-lines *ngIf="oInputForm.controls.email.hasError(\'email\')">\n        <div class="error">invalid email</div>\n      </ion-item> -->\n      <div class="ksd-field-spacer"></div>\n      <ion-item>\n        <ion-label for="password" floating>Password</ion-label>\n        <ion-input id="password" type="password" formControlName="password"></ion-input>\n      </ion-item>\n      <div class="ksd-field-spacer"></div>\n\n      <ion-row>\n        <ion-col>\n          <button ion-button full (click)="DBLogin(oInputForm.value)" [disabled]="!oInputForm.valid">Login</button>\n        </ion-col>\n      </ion-row>\n      <!-- <ion-item no-lines>\n        <button ion-button block class="ksd-login" (click)="DBLogin(oInputForm.value)" [disabled]="!oInputForm.valid">Login</button>\n      </ion-item> -->\n    </form>\n    <!--<button style="margin-top: 20px" ion-button full (click)="DBLogin()">Login</button>-->\n\n  </ion-grid>\n  <div no-padding text-center class="ksd-forgot-password" (click)="onForgotPassword()">Forgot Password ?\n  </div>\n  <div text-center no-padding class="ksd-or">\n    or\n  </div>\n  <div class="ksd-spacer-1"></div>\n  <ion-row>\n    <ion-col>\n      <button icon-left ion-button clear outline class="ksd-fb-button" full (click)="fbLogin()">\n      <ion-icon class="ksd-icon" name="logo-facebook"><span class="ksd-fb-login-text"> Log in with facebook</span></ion-icon>\n    </button>\n      <!-- <button icon-left ion-button clear outline class="ksd-fb-button" full (click)="fbLogin()">\n      <ion-icon class="ksd-icon" name="logo-facebook"><span class="ksd-fb-login-text"> Log in with facebook</span></ion-icon>\n    </button> -->\n    </ion-col>\n  </ion-row>\n  <div no-padding text-center class="ksd-create-account" (click)="onRegister()">Need an account?</div>\n  <!--</form>-->\n</ion-content>\n<!-- <script>\n    var card = new Card({\n      // a selector or DOM element for the form where users will\n      // be entering their information\n      form: \'form\', // *required*\n      // a selector or DOM element for the container\n      // where you want the card to appear\n      container: \'.card-container\', // *required*\n\n      formSelectors: {\n        numberInput: \'input#number\', // optional — default input[name="number"]\n        expiryInput: \'input#expiry\', // optional — default input[name="expiry"]\n        cvcInput: \'input#cvc\', // optional — default input[name="cvc"]\n        nameInput: \'input#name\' // optional - defaults input[name="name"]\n      },\n\n      width: 200, // optional — default 350px\n      formatting: true, // optional - default true\n\n      // Strings for translation - optional\n      messages: {\n        validDate: \'valid\ndate\', // optional - default \'valid\nthru\'\n        monthYear: \'mm/yyyy\', // optional - default \'month/year\'\n      },\n\n      // Default placeholders for rendered fields - optional\n      placeholders: {\n        number: \'•••• •••• •••• ••••\',\n        name: \'Full Name\',\n        expiry: \'••/••\',\n        cvc: \'•••\'\n      },\n\n      masks: {\n        cardNumber: \'•\' // optional - mask card number\n      },\n\n      // if true, will log helpful messages for setting up Card\n      debug: false // optional - default false\n    });\n  </script> -->\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]
            //, private oPlatform: Platform
            ,
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]
            //, private viewCtrl: ViewController
            ,
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_7__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchOptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_result_search_result__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_service__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component, NgZone, ViewChild , ɵEMPTY_ARRAY} from '@angular/core';





//declare var Card: any;
var SearchOptionsPage = /** @class */ (function () {
    function SearchOptionsPage(zone, navCtrl, oEvents, oAPIService) {
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.oEvents = oEvents;
        this.oAPIService = oAPIService;
        this.oCuisine = 'Any';
        this.oSlides = [];
        this.bLoaded = false;
        this.bIsFormValid = true;
    }
    SearchOptionsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.oEvents.subscribe("Region", function (data) {
            _this.isFormValid();
            _this.zone.run(function () {
                __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].searchRegion = data;
                _this.isFormValid();
            });
        });
        this.oEvents.subscribe("Cuisines", function (data) {
            _this.zone.run(function () {
                __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].searchCuisine = data;
                _this.isFormValid();
            });
        });
        __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].sCurrentPage = 'Home';
        this.bLoaded = false;
        this.oSlides = [];
        this.oAPIService.send2ServerP("slides/").then(function (data) {
            _this.oSlides = data.result;
            _this.bLoaded = true;
        });
    };
    SearchOptionsPage.prototype.ionViewWillLeave = function () {
        this.oEvents.unsubscribe("Region");
        this.oEvents.unsubscribe("Cuisines");
        this.bLoaded = false;
        this.oSlides = [];
    };
    SearchOptionsPage.prototype.getCuisines = function () {
        return __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].searchCuisine;
    };
    SearchOptionsPage.prototype.isFormValid = function () {
        this.bIsFormValid = !("" == __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].selectedCuisines &&
            (__WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].searchRegion == '%' || __WEBPACK_IMPORTED_MODULE_3__app_properties__["a" /* Global_Variables */].searchRegion == 'Any'));
    };
    SearchOptionsPage.prototype.onSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__search_result_search_result__["a" /* SearchResultPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mySlider'),
        __metadata("design:type", Object)
    ], SearchOptionsPage.prototype, "mySlider", void 0);
    SearchOptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search-options',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/search-options/search-options.html"*/'<ion-header align-title="center">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="hie-menu"></ion-icon>\n    </button>\n    <ion-title text-center>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <div no-padding *ngIf="bLoaded">\n    <div no-padding class="ksd-slides" *ngIf="oSlides?.length > 0">\n      <ion-slides pager loop autoplay="4000" class="ksd-slides" #mySlider>\n        <ion-slide *ngFor="let o of oSlides">\n          <img [src]="oAPIService.buildImageURL(o,0,\'\')" style="width: 100%">\n        </ion-slide>\n      </ion-slides>\n    </div>\n  </div>\n  <div class="ksd-spacer"></div>\n  <ion-grid no-padding>\n    <ion-item no-lines no-padding>\n      <select-region></select-region>\n    </ion-item>\n    <div class="ksd-field-spacer"></div>\n    <ion-item class="ksd-select" no-lines no-padding>\n      <select-cuisine [current]="getCuisines()"      ></select-cuisine>\n      <!-- <select-cuisine (select)="onCuisineChange($event)"></select-cuisine> -->\n    </ion-item>\n    <ion-item no-lines *ngIf="!bIsFormValid">\n      <div class="alert alert-danger">\n        Please select Location and/or Food Type\n      </div>\n    </ion-item>\n    <div class="ksd-spacer-1"></div>\n    <ion-row>\n      <ion-col>\n        <button ion-button full [disabled]="!bIsFormValid" (click)="onSearch()">Search</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/search-options/search-options.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_4__providers_api_service__["a" /* APIService */]])
    ], SearchOptionsPage);
    return SearchOptionsPage;
}());

//# sourceMappingURL=search-options.js.map

/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_imgcache_js__ = __webpack_require__(831);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_imgcache_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_imgcache_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LazyImageComponent = /** @class */ (function () {
    function LazyImageComponent(el) {
        this.el = el;
        this.hidden = true;
    }
    ;
    LazyImageComponent.prototype.ngOnInit = function () {
        var me = this;
        this.img = this.el.nativeElement.querySelector('img');
        // this.img.crossOrigin = 'Anonymous';
        // check if the images are already cached
        __WEBPACK_IMPORTED_MODULE_1_imgcache_js___default.a.isCached(me.src, function (path, success) {
            // if not, it will be cached
            if (success) {
                __WEBPACK_IMPORTED_MODULE_1_imgcache_js___default.a.useCachedFile(me.img, function () { });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_imgcache_js___default.a.cacheFile(me.src, function () { });
            }
        });
    };
    /**
     * This function will show the image when it has loaded
     */
    LazyImageComponent.prototype.load = function () {
        this.hidden = false;
    };
    /**
     * This function will be triggered when http request fails
     */
    LazyImageComponent.prototype.error = function () {
        this.img.remove();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LazyImageComponent.prototype, "src", void 0);
    LazyImageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'lazy-image',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/lazy-image/lazy-image.html"*/'  <div width-50 [ngClass]="{ \'placeholder\': hidden }">\n      <img [ngClass]="{ \'active\': !hidden }" [src]="src" (load)="load()" (error)="error()" width="16" height="16"/>\n  </div>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/lazy-image/lazy-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], LazyImageComponent);
    return LazyImageComponent;
}());

//# sourceMappingURL=lazy-image.js.map

/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KsdHeaderDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KsdHeaderDirective = /** @class */ (function () {
    function KsdHeaderDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    KsdHeaderDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollerHandle = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
        this.header = this.scrollerHandle.firstElementChild;
        this.headerHeight = this.scrollerHandle.clientHeight;
        this.ticking = false;
        this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
        window.addEventListener('resize', function () {
            _this.headerHeight = _this.scrollerHandle.clientHeight;
        }, false);
        this.scrollerHandle.addEventListener('scroll', function () {
            if (!_this.ticking) {
                window.requestAnimationFrame(function () {
                    _this.updateElasticHeader();
                });
            }
            _this.ticking = true;
        });
    };
    KsdHeaderDirective.prototype.updateElasticHeader = function () {
        this.scrollTop = this.scrollerHandle.scrollTop;
        if (this.scrollTop >= 0) {
            this.translateAmt = this.scrollTop / 2;
            this.scaleAmt = 1;
        }
        else {
            this.translateAmt = 0;
            this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
        }
        this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')');
        this.ticking = false;
    };
    KsdHeaderDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[ksd-header]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], KsdHeaderDirective);
    return KsdHeaderDirective;
}());

//# sourceMappingURL=ksd-header.js.map

/***/ }),

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//
// https://alligator.io/ionic/modals/
var AlertDialogComponent = /** @class */ (function () {
    function AlertDialogComponent(modalCtrl, viewCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.onOKPressed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCancelled = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.text = 'Hello World';
        this.text = "Email to reset your password have been sent to<br><p text-center>wpg@37.com</p><br>Please check your email.";
    }
    AlertDialogComponent_1 = AlertDialogComponent;
    AlertDialogComponent.prototype.show = function (message) {
        var _this = this;
        this.text = message;
        this.oModal = this.modalCtrl.create(AlertDialogComponent_1);
        //, {}, { enableBackdropDismiss: false});
        this.oModal.onDidDismiss(function (data) {
            if (data) {
                _this.onOKPressed.emit();
            }
            else {
                _this.onCancelled.emit();
            }
        });
        this.oModal.present();
    };
    AlertDialogComponent.prototype.ok = function () {
        this.oSelection = "OK";
        this.viewCtrl.dismiss(this.oSelection);
    };
    AlertDialogComponent.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AlertDialogComponent.prototype, "onOKPressed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AlertDialogComponent.prototype, "onCancelled", void 0);
    AlertDialogComponent = AlertDialogComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'alert-dialog',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/alert-dialog/alert-dialog.html"*/'<ion-content class="">\n  <div class="modal-popup">\n    <p text-center [innerHtml]="text"></p>\n    <div style="margin: 0px; position: absolute; bottom: 0px; width: 100%;">\n      <button style="margin: 0px" primary ion-button full (click)="ok()">OK</button>\n    </div>\n  </div>\n  <!--<div class="my-popup">\n    {{text}}\n  </div>-->\n  <!--<ion-list>\n    <ion-item>\n        <div>\n          <p>{{text}}</p>\n          <button ion-button style="color:grey" (click)="ok()">Ok</button>\n          <button ion-button style="color:grey" (click)="cancel()">Cancel</button>\n      </div>\n    </ion-item>\n    <ion-item>\n      <div class="layout-row" style="width:100%;justify-content:Flex-end;margin:10px;">\n        <button ion-button clear (click)="ok()">OK</button>\n      </div>\n    </ion-item>\n  </ion-list>-->\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/alert-dialog/alert-dialog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], AlertDialogComponent);
    return AlertDialogComponent;
    var AlertDialogComponent_1;
}());

//# sourceMappingURL=alert-dialog.js.map

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantChangePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_properties__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { CartService } from '../../providers/cart-service';

var MerchantChangePage = /** @class */ (function () {
    function MerchantChangePage(navCtrl, navParams, viewCtrl
    // ,private oService: CartService
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.oItem = navParams.get("oNewMerchant");
        //    this.oItem.Confirmed = 'N' ;
        __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].canSwith2Merchant = 1;
    }
    MerchantChangePage.prototype.onClick = function () {
        alert("Clicked");
    };
    MerchantChangePage.prototype.cancelPressed = function () {
        console.log("cancelPressed");
        __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].canSwith2Merchant = 2;
        this.navCtrl.pop();
        //this.viewCtrl.dismiss();
    };
    MerchantChangePage.prototype.okPressed = function () {
        //    this.oService.removeAllItems();
        // this.oService.removeAllItems() ;
        // Global_Variables.oMID = this.oItem.ID;
        // this.oService.setID(this.oItem.ID);
        // this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: this.oItem, MerchantID: this.oItem.ID });
        console.log("okPressed");
        __WEBPACK_IMPORTED_MODULE_2__app_properties__["a" /* Global_Variables */].canSwith2Merchant = 1;
        this.viewCtrl.dismiss({ response: 'OK' });
        //    this.navCtrl.pop();
    };
    MerchantChangePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-merchant-change',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-change/merchant-change.html"*/'<!-- <ion-content no-padding class="ksd-modal-page"> -->\n<!-- <ion-grid class="no-padding dialog-position left-padding"> -->\n    <div>\n        <ion-row>\n          <ion-item no-lines></ion-item>\n          <ion-item no-lines></ion-item>\n          <ion-item no-lines text-center>\n            <img src="../assets/img/ico_warning_yellow.svg" height="48" widgh="48" />\n          </ion-item>\n          <!--<ion-item no-lines>\n              <div text-center>\n                <p class="ksd-text" [innerHtml]="text"></p>\n              </div>\n            </ion-item>-->\n          <ion-item no-lines></ion-item>\n          <ion-item no-lines>\n            <div text-center>\n              <p class="ksd-text">Changing Merchant will remove</p>\n            </div>\n            <div text-center>\n              <p class="ksd-text">existing items in cart. Do you</p>\n            </div>\n            <div text-center>\n              <p class="ksd-text">want to proceed?</p>\n            </div>\n          </ion-item>\n          <ion-item no-lines></ion-item>\n          <ion-item no-lines></ion-item>\n          <ion-item no-lines></ion-item>\n          <ion-item>\n            <button ion-button (click)="okPressed()" full>No keep existing</button>\n          </ion-item>\n          <ion-item no-lines class="no-padding">\n            <ion-row no-padding>\n              <ion-col no-padding>\n                <button ion-button full (click)="onClick()">No keep existing</button>\n                <button ion-button full (click)="cancelPressed()" class="ksd-warning">No keep existing</button>\n              </ion-col>\n              <ion-col no-padding>\n                <button ion-button full>Yes, proceed</button>\n                <button ion-button full (click)="okPressed()" class="ksd-warning">Yes, proceed</button>\n              </ion-col>\n            </ion-row>\n          </ion-item>\n          <!--<ion-item no-lines no-padding>\n              <ion-row no-padding>\n                <ion-col no-padding>\n                  <div no-padding>\n                    <button ion-button full (click)="cancel()" class="ksd-error">No keep existing</button>\n                  </div>\n                </ion-col>\n                <ion-col no-padding>\n                  <div no-padding>\n                    <button ion-button full (click)="ok()" class="ksd-error">Yes, proceed</button>\n                  </div>\n                </ion-col>\n              </ion-row>\n            </ion-item>-->\n        </ion-row>\n        </div>\n        <!-- </ion-grid> -->\n        <!-- </ion-content> -->\n        <!--\n        <ion-content padding class="ksd-modal-page">\n          <ion-grid class="dialog-position">\n            <ion-item no-lines></ion-item>\n            <ion-item no-lines>\n              <div class="warning center-image"></div>\n            </ion-item>\n            <ion-item no-lines></ion-item>\n            <ion-item no-lines>\n              <div text-center>\n                <p class="ksd-text">Changing Merchant will remove</p>\n              </div>\n              <div text-center>\n                <p class="ksd-text">existing items in cart.  Do you</p>\n              </div>\n              <div text-center>\n                <p class="ksd-text">want to proceed?</p>\n              </div>\n            </ion-item>\n            <ion-item no-lines no-padding>\n              <ion-row no-padding>\n                <ion-col no-padding>\n                  <div no-padding>\n                    <button ion-button full (click)="cancel()" class="ksd-error">No keep existing</button>\n                  </div>\n                </ion-col>\n                <ion-col no-padding>\n                  <div no-padding>\n                    <button ion-button full (click)="ok()" class="ksd-error">Yes, proceed</button>\n                  </div>\n                </ion-col>\n              </ion-row>\n            </ion-item>\n          </ion-grid>\n        </ion-content>-->\n        '/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-change/merchant-change.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]
            // ,private oService: CartService
        ])
    ], MerchantChangePage);
    return MerchantChangePage;
}());

//# sourceMappingURL=merchant-change.js.map

/***/ })

},[499]);
//# sourceMappingURL=main.js.map
webpackJsonp([20],{

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddedInfoPageModule", function() { return AddedInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__added_info__ = __webpack_require__(934);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddedInfoPageModule = /** @class */ (function () {
    function AddedInfoPageModule() {
    }
    AddedInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__added_info__["a" /* AddedInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__added_info__["a" /* AddedInfoPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__added_info__["a" /* AddedInfoPage */]
            ]
        })
    ], AddedInfoPageModule);
    return AddedInfoPageModule;
}());

//# sourceMappingURL=added-info.module.js.map

/***/ }),

/***/ 934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddedInfoPage; });
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


var AddedInfoPage = /** @class */ (function () {
    function AddedInfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.text = "";
        this.text = "Menu saved successfully!";
    }
    AddedInfoPage.prototype.ok = function () {
        this.navCtrl.setRoot('MerchantHomePage');
    };
    AddedInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-added-info',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/added-info/added-info.html"*/'<ion-content no-padding>\n   <!--class="ksd-modal-page">-->\n    <!--<div no-padding class="ksd-spacer"></div>-->\n    <div no-padding class="center-image">\n      <ion-icon name="hie-tick-green"></ion-icon>\n    </div>\n    <div no-padding class="ksd-text" [innerHtml]="text"></div>\n    <div no-padding>\n          <button ion-button full (click)="ok()" >Check menu list</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/added-info/added-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AddedInfoPage);
    return AddedInfoPage;
}());

//# sourceMappingURL=added-info.js.map

/***/ })

});
//# sourceMappingURL=20.js.map
webpackJsonp([19],{

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmedOrderPageModule", function() { return ConfirmedOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirmed_order__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConfirmedOrderPageModule = /** @class */ (function () {
    function ConfirmedOrderPageModule() {
    }
    ConfirmedOrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__confirmed_order__["a" /* ConfirmedOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__confirmed_order__["a" /* ConfirmedOrderPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__confirmed_order__["a" /* ConfirmedOrderPage */]
            ]
        })
    ], ConfirmedOrderPageModule);
    return ConfirmedOrderPageModule;
}());

//# sourceMappingURL=confirmed-order.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmedOrderPage; });
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
var ConfirmedOrderPage = /** @class */ (function () {
    //  private oParent: any ;
    function ConfirmedOrderPage(navCtrl, viewCtrl, oAPIService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.oAPIService = oAPIService;
        this.oItems = [];
        this.bLoaded = false;
        this.sErrorText = 'No Pending Order';
    }
    ConfirmedOrderPage.prototype.ionViewDidEnter = function () {
        this.fetchItems();
    };
    ConfirmedOrderPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ConfirmedOrderPage.prototype.fetchItems = function () {
        var _this = this;
        this.bLoaded = false;
        this.oItems = [];
        this.oAPIService.send2ServerP("merchant/orders", true, { STATUS: 'C' }).then(function (data) {
            if (data.result.length == 0) {
                _this.oItemGroupedByDate = [];
                _this.bLoaded = true;
                return;
            }
            _this.oAPIService.sort(data.result, [{ field: 'PICKUPON', direction: 'desc' }, { field: 'PICKUPSTART', direction: 'desc' }, { field: 'BOOKINGREF', direction: 'desc' }]);
            data.result.forEach(function (obj, idx) {
                obj.PICKUPTIME = Object(__WEBPACK_IMPORTED_MODULE_3__app_properties__["e" /* lookupTime */])(obj.PICKUPSTART);
                _this.oItems.push(obj);
                if (idx == _this.oItems.length - 1) {
                    _this.oItemGroupedByDate = _this.groupByDate();
                    _this.bLoaded = true;
                }
            });
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        });
    };
    ConfirmedOrderPage.prototype.nextPage = function () {
        var _this = this;
        this.navCtrl.push('OrderHistoryPage').then(function () {
            _this.navCtrl.remove(_this.viewCtrl.index);
        });
    };
    ConfirmedOrderPage.prototype.getStyle = function (sPickupOn) {
        return "ksd-back-1";
    };
    ConfirmedOrderPage.prototype.groupByDate = function () {
        var groups = this.oItems.reduce(function (o, a) {
            var m = a.PICKUPON;
            (o[m]) ? o[m].data.push(a) : o[m] = { PICKUPON: m, data: [a] };
            return o;
        }, {});
        var result = Object.keys(groups).map(function (k) {
            return groups[k];
        });
        //    console.log ( result ) ;
        return result;
    };
    ConfirmedOrderPage.prototype.changeOrderStatus = function (oItem) {
        var _this = this;
        this.oAPIService.send2ServerP("merchant/fulfilled/" + oItem.TRANSACTION_ID, true).then(function (data) {
        }).catch(function (err) {
            console.log('Error:' + JSON.stringify(err));
        }).then(function () {
            _this.fetchItems();
        });
    };
    ConfirmedOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-incoming-order',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/confirmed-order/confirmed-order.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Confirmed order</ion-title>\n    <button ion-button menuToggle (click)="goBack()">\n      <ion-icon name="back"></ion-icon>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div *ngIf="bLoaded">\n    <div *ngIf="oItemGroupedByDate.length == 0">\n      <p class="ksd-no-result">{{sErrorText}}</p>\n    </div>\n    <div no-padding *ngFor="let g of oItemGroupedByDate">\n      <div class="ksd-date">{{g.PICKUPON | date: \'dd MMM yyyy\'}}</div>\n      <ion-card padding [class]="getStyle(g.PICKUPON)" *ngFor="let o of g.data;" ion-item>\n        <ion-row class="ksd-padding">\n          <ion-col col-3>\n            <div class="ksd-time">{{o.PICKUPTIME}}</div>\n          </ion-col>\n          <ion-col col-3>\n            <div class="ksd-name">{{o.CUSTOMER_NAME}}</div>\n          </ion-col>\n          <ion-col col-6>\n            <div class="ksd-order-number">Order No. {{o.BOOKINGREF}}</div>\n          </ion-col>\n        </ion-row>\n        <ion-item no-padding ion-item [class]="getStyle(g.PICKUPON)" *ngFor="let oD of o._D; let i = index;">\n          <ion-item no-padding item-left [class]="getStyle(g.PICKUPON)">\n            <div class="ksd-details" (click)="showOrderDetails(o)">{{oD.QUANTITY}} x {{oD.TITLE}}</div>\n            <button align-right ion-button round *ngIf="i == o._D.length - 1" class="ksd-round-button" item-right (click)="changeOrderStatus(oD)">Fulfilled</button>\n          </ion-item>\n        </ion-item>\n        <ion-item no-lines [class]="getStyle(g.PICKUPON)">\n          <div style="padding-bottom: 20px"></div>\n        </ion-item>\n        <!--<ion-item no-lines class="ksd-spacer ksd-card">\n        </ion-item>-->\n      </ion-card>\n      <div style="padding-bottom: 20px;" [class]="getStyle(g.PICKUPON)"></div>\n    </div>\n  </div>\n\n\n  <!--<ion-content padding>\n  <div *ngIf="bLoaded">\n    <ion-list>\n      <ion-item-group padding *ngFor="let g of oItemGroupedByDate; let i = index">\n        <div class="ksd-date">{{g.PICKUPON}}</div>\n        <ion-card class="ksd-card" *ngFor="let o of g.data; let i = index" ion-item>\n          <ion-row>\n            <ion-col>\n              <div class="ksd-time">{{o.PICKUPTIME}}\n                </div>\n            </ion-col>\n            <ion-col>\n              <div class="ksd-name">{{o.CUSTOMER_NAME}}</div>\n            </ion-col>\n            <ion-col>\n              <div class="ksd-order-number">Order No. {{o.BOOKINGREF}}</div>\n            </ion-col>\n          </ion-row>\n          <ion-item no-padding ion-item class="ksd-card" *ngFor="let oD of o._D; let i = index;">\n            <ion-item class="ksd-card" no-padding  item-left >\n              <div class="ksd-details">{{oD.QUANTITY}} x {{oD.TITLE}}</div>\n              <button align-right ion-button round *ngIf="i == o._D.length - 1" class="ksd-round-button" item-right (click)="changeOrderStatus(oD)">Fulfilled</button>\n            </ion-item>\n          </ion-item>\n          <ion-item no-lines class="ksd-spacer ksd-card">\n          </ion-item>\n        </ion-card>\n      </ion-item-group>\n    </ion-list>\n  </div>-->\n</ion-content>\n<ion-footer>\n  <button primary ion-button full (click)="nextPage()"><p class="ksd-anchor-button"> View history order</p></button>\n</ion-footer>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/confirmed-order/confirmed-order.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */]])
    ], ConfirmedOrderPage);
    return ConfirmedOrderPage;
}());

//# sourceMappingURL=confirmed-order.js.map

/***/ })

});
//# sourceMappingURL=19.js.map
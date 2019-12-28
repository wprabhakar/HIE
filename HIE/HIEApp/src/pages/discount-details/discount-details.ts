import { Component } from '@angular/core';
//import { EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {  Modal,  ViewController, ModalController } from 'ionic-angular';
import { CartService } from '../../providers/cart-service';
import { APIService } from '../../providers/api-service';
//import { sIMAGE_URL } from '../../app/properties';
import { Global_Variables } from '../../app/properties';

@IonicPage()
@Component({
  selector: 'page-discount-details',
  templateUrl: 'discount-details.html',
})
export class DiscountDetailsPage {
  oMerchant: any = {};
  collectionDate: any = '';
  collectionTime: any = '';
  oItem: any = {};
  //  o: any = {} ;
  constructor(public navCtrl: NavController, private readonly oAPIService: APIService,
    public navParams: NavParams, public oCartService: CartService) {
    this.collectionDate = Global_Variables.collectionDate;
    this.collectionTime = Global_Variables.collectionTime;
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
  public getUnitPrice() {
    return Math.round(+this.oItem.USUAL_PRICE * (1 - +this.oItem.DISCOUNT) * 100) / 100;
  }
  public getAmount() {
    return +this.oItem.qty * this.getUnitPrice();
  }
  public adjustItemQty(oItem: any, qty: number) {
    oItem.qty += qty;
  }
  public add2Cart(oItem: any) {
    this.oCartService.addItem(oItem);
    this.navCtrl.pop();
  }
  public goBack() {
    this.navCtrl.pop();
  }
  getImageURL(oItem: any) {
    return this.oAPIService.buildImageURL(oItem, this.oMerchant.ID, '156h_');

    // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
    //   oItem.IMAGE_URL = this.oMerchant.IMAGE_URL;
    // let img = oItem.IMAGE_URL;
    // if (img.startsWith('http://') ||
    //   img.startsWith('https://'))
    //   return img;
    // return sIMAGE_URL + this.oMerchant.ID + "/" + img;
  }
}

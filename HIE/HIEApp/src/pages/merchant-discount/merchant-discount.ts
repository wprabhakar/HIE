import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';
//import { MultiPickerModule } from 'ion-multi-picker';
import { SearchResultPage } from '../search-result/search-result';
import { APIService } from '../../providers/api-service';
import { CartService } from '../../providers/cart-service';
//import { LoginService } from '../../providers/login-service';
//import { sIMAGE_URL } from '../../app/properties';
import { Global_Variables } from '../../app/properties';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-merchant-discount',
  templateUrl: 'merchant-discount.html'
})

export class MerchantDiscountPage {
  oMerchant: any = {};
  collectionDate: any = '';
  collectionTime: any = '';
  oItems: any[] = [];
  loading: Loading;
  bDisabled = true;
  oMinDate = new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000)).toISOString();;
  oMaxDate = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString();;
  bLoaded: boolean = false;
  oMID: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private readonly oAPIService: APIService,
//    private readonly oLoginService: LoginService,
    private readonly oService: CartService,
    private readonly loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public viewCtrl: ViewController) {
    if (Global_Variables.collectionDate == '') {
      Global_Variables.collectionDate =
        moment(this.oMinDate).format("YYYY-MM-DD");
    }
    this.collectionDate = Global_Variables.collectionDate;
    this.collectionTime = Global_Variables.collectionTime;
    this.simpleColumns = Global_Variables.collectionTimes;

    this.oMID = Global_Variables.oMID; //Global_VnavParams.get("MerchantID");
  }

  simpleColumns: any[] = [];
  ionViewDidLoad() {
    //    this.loading.present();
    this.oAPIService.send2ServerP("merchant/" + this.oMID).then((data: any) => {
      this.oMerchant = data.result[0];
    });
    this.oAPIService.send2ServerP("products/" + this.oMID).then((data: any) => {
      this.oItems = data.result;
      this.bLoaded = true;
      //      this.loading.dismissAll()
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
      //      this.loading.dismissAll()
    });
  }

  dateChanged() {
    this.bLoaded = false;
    this.oItems = [];
    this.loading = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.bDisabled = false;
    this.loading.present();
    Global_Variables.collectionDate = this.collectionDate;
    this.oAPIService.send2ServerP("products/" + this.oMID + "/" + this.collectionDate).then((data: any) => {
      this.oItems = data.result;
      this.bLoaded = true;
      this.loading.dismissAll()
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
      this.loading.dismissAll()
    });
  }

  onItemClick(o) {
    if (Global_Variables.collectionDate == '') {
      console.log("Collection Date NOT Set");
      return;
    }
    //    this.oService.setID ( this.oMerchant.ID ) ;
    this.navCtrl.push('DiscountDetailsPage', { oMerchant: this.oMerchant, oItem: o });
  }
  getImageURL(oItem: any) {
    return this.oAPIService.buildImageURL(oItem, this.oMerchant.ID);
    // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
    //   oItem.IMAGE_URL = this.oMerchant.IMAGE_URL;
    // let img = oItem.IMAGE_URL;
    // if (img.startsWith('http://') ||
    //   img.startsWith('https://'))
    //   return img;
    // return sIMAGE_URL + this.oMerchant.ID + "/" + img;
  }
  openCart() {
    if (this.oService.calcTotalQty() == 0)
      return;
    this.navCtrl.push('ShoppingCartPage');
  }
  goBack() {
    this.navCtrl.setRoot(SearchResultPage);
  }
  onReview() {
    this.navCtrl.setRoot('ReviewPage', { oMerchant: this.oMerchant });
  }
}

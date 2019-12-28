import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { ToastController } from "ionic-angular";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/catch";
// import 'rxjs/add/observable/throw';
//import { AddMenuPage } from '../add-menu/add-menu';
//import { sIMAGE_URL } from '../../app/properties';
import { LoginService } from '../../providers/login-service';

@IonicPage()
@Component({
  selector: 'page-view-menu',
  templateUrl: 'view-menu.html'
})
export class ViewMenuPage {
  PRODUCT_ID: number = 0;
  oItem: any = {};
  bLoaded: boolean = false;
  oDiscounts: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  //private readonly loadingCtrl: LoadingController,
    private readonly oLoginService: LoginService,
    private readonly oAPIService: APIService
  //  ,private readonly toastCtrl: ToastController
  ) {

    this.PRODUCT_ID = navParams.get('PRODUCT_ID');
    if (this.PRODUCT_ID === undefined) return;
    console.log(this.PRODUCT_ID);
    oAPIService.send2ServerP("product/" + this.PRODUCT_ID).then((data) => {
      this.oItem = data.result[0];
      console.log(JSON.stringify(this.oItem));
      oAPIService.send2ServerP("product/" + this.PRODUCT_ID + "/discounts").then((d) => {
        this.oDiscounts = d.result;
        this.bLoaded = true;
      });
    });
  }
  onEdit() {
    this.navCtrl.push('AddMenuPage', { PRODUCT_ID: this.oItem.ID });
  }
  getImageURL(oItem: any) {
    return this.oAPIService.buildImageURL ( oItem, this.oLoginService.getUserID(), '156h_' ) ;
    // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
    //   return "" ;
    // let img = oItem.IMAGE_URL;
    // if (img.startsWith('http://') ||
    //   img.startsWith('https://'))
    //   return img;
    // return sIMAGE_URL + this.oLoginService.getUserID() + "/" + img;
  }
  goBack ( )
  {
    this.navCtrl.pop();
//    this.navCtrl.setRoot('MerchantHomePage');
  }
}

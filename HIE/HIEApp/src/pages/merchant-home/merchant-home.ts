import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { APIService } from '../../providers/api-service';
import { LoginService } from '../../providers/login-service';
//import { sIMAGE_URL } from '../../app/properties';
import { Global_Variables } from '../../app/properties';
//import { ElementRef, Renderer } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-merchant-home',
  templateUrl: 'merchant-home.html'
})
export class MerchantHomePage {
//  @ViewChild(Content) content: Content;
  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;
  headercontent: any;
  bSearching: boolean = false ;
  sText: string = '';
  oMerchant: any = {};
  bLoaded: boolean = false;
  searchControl: FormControl;
  oItems: any[] = [];
  oAllItems: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private readonly oAPIService: APIService,
    private readonly oLoginService: LoginService
  )
     {
    Global_Variables.sCurrentPage = 'Home' ;
    this.oAPIService.send2ServerP("merchant").then((data: any) => {
      this.oMerchant = data.result[0];
    });
  }

  loadProducts() {
    this.oAPIService.send2ServerP("products", false).then((data: any) => {
      this.oItems = data.result ;
      this.oAllItems = data.result ;
      this.bLoaded = true;
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    });
  }

  ionViewDidLoad() {
//    this.bLoaded = false;
  }

  ionViewWillEnter ( ) {
    this.bLoaded = false;
    this.oItems = [] ;
    this.oAllItems = [] ;
    this.loadProducts();
  }

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
  onItemClick(o:any) {
    this.navCtrl.push('ViewMenuPage', { PRODUCT_ID: o.ID });
  }

  addMenu() {
    this.navCtrl.push('AddMenuPage');
  }

  onSearchInput() {
    this.bSearching = true;
//    console.log ( "Searching: " + this.sText) ;
//    this.filterItems(this.sText) ;
    this.oItems = this.filterItems(this.sText);
//    console.log ( JSON.stringify ( this.oItems ) ) ;
    this.bSearching = false;
  }
  filterItems(sText: string) {
    if (sText.length == 0)
      return this.oAllItems;
    return this.oAllItems.filter((item) => {
      return item.TITLE.toLowerCase().indexOf(sText.toLowerCase()) > -1;
    });
  }
}

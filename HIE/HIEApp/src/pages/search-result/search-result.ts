import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Loading, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
// import { MerchantService } from '../../providers/merchant-service';
import 'rxjs/add/operator/debounceTime';
import { SearchOptionsPage } from '../search-options/search-options';
import { CartService } from '../../providers/cart-service';
import { APIService } from '../../providers/api-service';
import { Global_Variables } from '../../app/properties';
import { MerchantChangePage } from '../merchant-change/merchant-change';

//import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
//import { sIMAGE_URL } from '../../app/properties';

@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html'
})

export class SearchResultPage {
  sText: string = '';
  searchControl: FormControl;
  oItems: any[] = [];
  bSearching: any;
  bLoaded = false;
  loading: Loading;
  sNoResults: string = 'NO RESULT';
  constructor(public navCtrl: NavController,
    private oService: CartService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public oAPIService: APIService) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.loading.present();
    var r = '%';
    var c = [];
    if (Global_Variables.searchRegion != 'Any')
      r = Global_Variables.searchRegion;
    if (Global_Variables.searchCuisine.length == 0) {
      c.push('%');
      this.oAPIService.send2ServerP("merchantsallcuisine", true, { REGION: r, CUISINE: c }).then((data) => {
        this.oItems = data.result;
        this.loading.dismiss();
        this.bLoaded = true;
      });
    }
    else {
      c = Global_Variables.searchCuisine;
      this.oAPIService.send2ServerP("merchants", true, { REGION: r, CUISINE: c }).then((data) => {
        this.oItems = data.result;
        this.loading.dismiss();
        this.bLoaded = true;
      });
    }
  }
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

  showConfirmAlert(oItem: any) {
    let alert = this.alertCtrl.create({
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
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes, proceed',
          handler: () => {
            this.oService.removeAllItems();
            Global_Variables.oMID = oItem.ID;
            this.oService.setID(oItem.ID);
            this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: oItem, MerchantID: oItem.ID });
          }
        }
      ]
    }).present();
  }
  onMerchantClick(oItem: any) {
    if (Global_Variables.oMID != 0 &&
      Global_Variables.oMID != oItem.ID
      && this.oService.calcTotalQty() != 0
    ) {
            this.showConfirmAlert ( oItem ) ;
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
      Global_Variables.oMID = oItem.ID;
      this.oService.setID(oItem.ID);
      this.navCtrl.setRoot('MerchantDiscountPage', { selectedItem: oItem, MerchantID: oItem.ID });
    }
  }

  go2Search() {
    //    this.oCartService.removeAllItems ( ) ;
    this.navCtrl.setRoot(SearchOptionsPage);
  }

  goBack() {
    this.go2Search();
  }

  /*
  70h70w_file-1500530951007.jpg
  156h_file-1500530951007.jpg
*/
}

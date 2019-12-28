import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { AlertController } from "ionic-angular";
//import { MyUtilsPage } from '../pages/my-utils/my-utils' ;

//import { PreLoginPage } from '../pages/pre-login/pre-login';
import { LoginPage } from '../pages/login/login';
import { LoginService } from '../providers/login-service';

import { SearchOptionsPage } from '../pages/search-options/search-options';
//import ImgCache from 'imgcache.js';
import { Global_Variables } from '../app/properties';
//import {ScreenOrientation} from "@ionic-native/screen-orientation";
//import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-app-component',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  customerPages: Array<{ title: string, component: any, space: string, style: string, padtop: String }>;
  merchantPages: Array<{ title: string, component: any, space: string, style: string, padtop: String }>;

  public connectSubscription;
  public disconnectSubscription;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private backgroundMode: BackgroundMode
    // ,androidPermissions:AndroidPermissions
    //, private oSO:ScreenOrientation
    , public alert: AlertController,
    private network: Network,
    public oLoginService: LoginService) {
    platform.ready().then(() => {
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
      this.backgroundMode.enable();
      this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
        Global_Variables.isConnected = false;
      });
      this.connectSubscription = this.network.onConnect().subscribe(() => {
//        console.log('network connected!');
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          console.log("Network Connected.");
          Global_Variables.isConnected = true;
          // if (this.network.type === 'wifi') {
          //   console.log('we got a wifi connection, woohoo!');
          // }
        }, 1000);
      });

    });

    // used for an example of ngFor and navigation
    this.customerPages = [
      { title: 'Home', component: SearchOptionsPage, space: 'ksd-big-space', style: 'ksd-padding', padtop: 'Y' },
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

  ionViewWillUnload() {
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
  }
  getBgColor(title: String) {
    if (title === Global_Variables.sCurrentPage)
      return 'ksd-title-selected';
    return 'ksd-title';
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  onClose() {
    this.nav.setRoot('MerchantHomePage');
  }
  setupMinimizedNotification() {
    document.addEventListener("pause", () => {
      console.log('paused');
    }, false);
  }

  setupResumeNotification() {
    document.addEventListener("resume", () => {
      console.log('resume');
    }, false);
  }
  onExitApp() {
    let alert = this.alert.create({
      title: 'Confirm',
      message: 'Do you want to exit?',
      cssClass: 'alert-css',
      buttons: [{
        cssClass: 'alert-button-css',
        text: "Yes",
        handler: () => { 
          this.backgroundMode.disable();
          this.platform.exitApp() ; }
      }, {
        text: "No",
        role: 'cancel'
      }]
    })
    alert.present();
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
//import { CartIndicatorComponent } from '../components/cart-indicator/cart-indicator';
import { SelectRegionComponent } from '../components/select-region/select-region';
import { SelectCuisineComponent } from '../components/select-cuisine/select-cuisine';

import { PreLoginPage } from '../pages/pre-login/pre-login';
import { PasswordResetMessagePage } from '../pages/password-reset-message/password-reset-message';
import { LoginPage } from '../pages/login/login';
import { LoginErrorPage } from '../pages/login-error/login-error';
import { DBLoginPage } from '../pages/db-login/db-login';
import { SearchResultPage } from '../pages/search-result/search-result';
import { SearchOptionsPage } from '../pages/search-options/search-options';

//import { MyUtilsPage } from '../pages/my-utils/my-utils';
import { AppProviders } from '../providers/app-providers';
import { LazyImageComponent } from '../components/lazy-image/lazy-image';
import { MultiPickerModule } from 'ion-multi-picker';
import { KsdHeaderDirective } from '../directives/ksd-header/ksd-header';
//import { TextMaskModule } from 'angular2-text-mask';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { APIService } from '../providers/api-service';
import { LoginService } from '../providers/login-service';
import { FaceBook } from '../providers/face-book';
//import { RestaurantService } from '../providers/restaurant-service';
import { MerchantService } from '../providers/merchant-service';
import { CartService } from '../providers/cart-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Facebook }  from '@ionic-native/facebook';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { Calendar } from '@ionic-native/calendar';
//import { DatePickerComponent } from '../components/date-picker/date-picker';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog' ;
//import { CardModule } from 'ngx-card/ngx-card';
//import { CreditCardComponent } from '../components/credit-card/credit-card';
//import { AutoJumpDirective } from '../directives/auto-jump/auto-jump';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
//import { MerchantProfilePage } from '../pages/merchant-profile/merchant-profile' ;
import { MerchantChangePage } from '../pages/merchant-change/merchant-change' ;

@NgModule({
  declarations: [
    MyApp,
//    CartIndicatorComponent,
    LazyImageComponent,
    PreLoginPage,
    LoginPage,
    LoginErrorPage,
       SelectRegionComponent,
   SelectCuisineComponent,
//   MerchantProfilePage,
    PasswordResetMessagePage,
    DBLoginPage,
    SearchOptionsPage,
    SearchResultPage,
    MerchantChangePage,
 //   MyUtilsPage,
    KsdHeaderDirective,
    AlertDialogComponent,
//    CreditCardComponent,
//    AutoJumpDirective,
  ],

  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    //    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MultiPickerModule //Import MultiPickerModule
//       SelectRegionComponent,
//   SelectCuisineComponent
   // , TextMaskModule
//   ,CardModule
//,DatePickerComponent
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
//    CartIndicatorComponent,
//    SelectRegionComponent,
//    SelectCuisineComponent,
    PreLoginPage,
    LoginPage,
    LoginErrorPage,
    PasswordResetMessagePage,
    DBLoginPage,
    SearchOptionsPage,
    SearchResultPage,
    MerchantChangePage
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
        Camera,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MerchantService, CartService, FaceBook, LoginService, APIService, StatusBar, SplashScreen, ImagePicker,  File, FileTransfer,  FilePath, Diagnostic, Facebook, BackgroundMode, Network, Calendar
        ,ScreenOrientation
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]      
})

export class AppModule { }
export function appProviderLoader() { return new AppProviders ( ).getProviders() ; }


import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
//import { FileTransfer } from '@ionic-native/file-transfer';
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

//https://www.joshmorony.com/automating-mocks-in-ionic-native-3-x/

class CameraMock {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
    })
  }
}

export class AppProviders {

  public getProviders(): any {

    let providers;
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
        { provide: Camera, useClass: CameraMock },
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MerchantService, CartService, FaceBook, LoginService, APIService, StatusBar, SplashScreen, ImagePicker, File,
        //FileTransfer, 
        FilePath, Diagnostic, Facebook, BackgroundMode, Network, Calendar

      ];

    } else {

      // Use device providers
      providers = [
        Camera,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MerchantService, CartService, FaceBook, LoginService, APIService, StatusBar, SplashScreen, ImagePicker,  File,
        //FileTransfer,  
        FilePath, Diagnostic, Facebook, BackgroundMode, Network, Calendar
      ];

    }

    return providers;

  }
//*/
}
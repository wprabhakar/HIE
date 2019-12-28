//import { Page } from 'ionic/ionic';
import { Platform } from 'ionic-angular' ;
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare const facebookConnectPlugin: any;

//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702614956729294" --variable APP_NAME="HaveItEarly"

//https://ionicframework.com/docs/native/facebook/
//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="146887799193080" --variable APP_NAME="HaveItEarly"
//npm install --save @ionic-native/facebook


//Other References
//https://stackoverflow.com/questions/43549143/native-facebook-login-in-ionic-2

@Injectable()
export class FaceBook {

  constructor(private oPlatform: Platform) {
  }

  login(): any {
    return new Promise((resolve, reject) => {
      if (this.oPlatform.is('cordova')) {
        facebookConnectPlugin.login(['email'], (success) => {
          console.log(JSON.stringify(success));
          resolve(success);
        }, (err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });

      } else {
        console.log("Please run me on a device");
        reject('Please run me on a device');
      }
    });
  }

  getCurrentUserProfile(): any {
    return new Promise((resolve, reject) => {
      facebookConnectPlugin.api('me?fields=email,name', null,
        (profileData) => {
          console.log(JSON.stringify(profileData));
          resolve(profileData);
        }, (err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  }
}

import { ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {  Nav } from 'ionic-angular';
//import { Platform, Nav } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { AlertController } from 'ionic-angular';
//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
//import { Device } from 'ionic-native';
//import { Push } from 'ionic-native';
import { Global_Variables } from '../app/properties';
//import { sURL } from '../app/properties';
import { sEndPoint } from '../app/env.properties';
//import { APIService } from './api-service';

@Injectable()
export class LoginService {
  @ViewChild(Nav) nav: Nav;

  //  device_id: string = '';
  LoginType: String ;
  EMAIL: string ;
  LID: number = 0;
  LType: string = "N";
  jwtHelper: JwtHelper = new JwtHelper();

  /*
  http://nishanthkabra.com/ionic2push.html
  cordova plugin add phonegap-plugin-push --variable SENDER_ID="XXXXXXXXX"
  Update the app's package.json with following code
  "cordovaPlugins": [
      {
        "variables": {
          "SENDER_ID": "XXXXXXXXXX"
        },
        "locator": "phonegap-plugin-push"
      }
    ]
  */

  getUserID() { return this.LID; }
  getUserType() { return this.LType; }
  getEmail() { return this.EMAIL ; } 
  getLoginType ( ) { return this.LoginType ; }
  constructor(private http: Http, private alertCtrl: AlertController, public oStorage: Storage
    //, private oPlatform: Platform 
    //, private oAPIService: APIService
  ) {
    /*
    oPlatform.ready().then(() => {
      //      this.device_id = Device.device.uuid;
      var push = Push.init({
        android: {
          senderID: "XXXXXXXXX"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });
      push.on('registration', (data) => {
        console.log(data.registrationId);
        alert(data.registrationId.toString());
      });
      push.on('notification', (data) => {
        console.log(data);
        alert("Hi, Am a push notification");
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
    });*/
  }

  showNetworkError() {
    let alert = this.alertCtrl.create({
      title: 'No Network',
      subTitle: 'Pls check internet connection',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  performLogin(data): any {
//    return this.oAPIService.send2Server(sEndPoint + "auth", true, data);       
    if (Global_Variables.isConnected == false) {
      this.showNetworkError();
      return Promise.reject ( "No Network") ;
    }

      return this.http.post(sEndPoint + "auth", data)
        .map(res => res.json()).toPromise();
    // let s = sURL + "auth";
    // return this.http.post(s, data)
    //   .map(res => res.json()).toPromise();
  }

  performFBLogin(data): any {
//    return this.oAPIService.send2Server(sEndPoint + "auth", true, data);
      return this.http.post(sEndPoint + "fbauth", data)
        .map(res => res.json()).toPromise();
    // let s = sURL + "auth";
    // return this.http.post(s, data)
    //   .map(res => res.json()).toPromise();
  }

  getToken() {
    return Global_Variables.token;
    //  this.oStorage.get('token');
  }

  saveToken(id: string) {
    Global_Variables.token = id;
//    console.log("save Token: " + Global_Variables.token);

    //    this.oStorage.set('token', id);
    if (id) {
      let o = this.jwtHelper.decodeToken(id).data;
      console.log(o);
      this.LID = +o.UID;
      this.LType = o.TYPE;
      this.EMAIL = o.EMAIL ;
      this.LoginType = o.LOGINTYPE ;
    }
  }
}

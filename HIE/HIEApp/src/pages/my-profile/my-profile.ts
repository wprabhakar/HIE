import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from "ionic-angular";
//import { LoadingController, AlertController, ToastController } from "ionic-angular";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
//import { LoginService } from '../../providers/login-service';
import { APIService } from '../../providers/api-service';
import { Global_Variables } from '../../app/properties';
import { V } from '../../app/properties';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
  oInputForm: FormGroup;
  oForm;
  oItem: any = {};
  bLoaded: boolean = false;
  constructor(public platform: Platform, public alert: AlertController, public navCtrl: NavController, public navParams: NavParams, public oBuilder: FormBuilder,
//    private readonly loadingCtrl: LoadingController,
    //    private readonly oLoginService: LoginService,
    private readonly oAPIService: APIService
    //, private alertCtrl: AlertController,
    //   private readonly toastCtrl: ToastController
  ) {
    this.fetchItems();
  }
  // ionViewWillEnter() {
  //   Global_Variables.sCurrentPage = 'Profile';
  // }
  ionViewDidEnter() {
    Global_Variables.sCurrentPage = 'Profile';
    this.fetchItems();
  }
  fetchItems() {
    this.bLoaded = false;
    this.oAPIService.send2ServerP("myprofile").then((data: any) => {
      this.oItem = data.result[0];
      //      console.log(this.oItem);
      // this.oInputForm = this.oBuilder.group({
      //   NAME: [this.oItem.NAME, Validators.compose([])],
      //   EMAIL: [this.oItem.EMAIL, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      //   PASSWORD: [this.oItem.PASSWORD, Validators.compose([Validators.minLength(5), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
      //   MOBILE: [this.oItem.MOBILE, Validators.compose([Validators.pattern('^\\d+$'), Validators.required])],
      //   ADDRESS: [this.oItem.ADDRESS, Validators.compose([Validators.required])],
      // });

      this.oForm = new ValidationManager({
        'NAME': 'required|rangeLength:' + V.Name_Min + "," + V.Name_Max + '|pattern:' + V.Name,
        'EMAIL': 'required|email',
        //        'EMAIL': 'required|rangeLength:' + V.Email_Min + "," + V.Email_Max + '|pattern:' + V.Email,
        'PASSWORD': 'required|rangeLength:' + V.Password_Min + "," + V.Password_Max + '|pattern:' + V.Password,
        'MOBILE': 'required|rangeLength:' + V.Phone_Min + "," + V.Phone_Max,
        'ADDRESS': ''
        //rangeLength:' + 0 + "," + V.Address_Max 
        //+ '|pattern:' + V.Address,
      });
      this.oForm.setValue('NAME', this.oItem.NAME);
      this.oForm.setValue('EMAIL', this.oItem.EMAIL);
      this.oForm.setValue('PASSWORD', this.oItem.PASSWORD);
      this.oForm.setValue('MOBILE', this.oItem.MOBILE);
      this.oForm.setValue('ADDRESS', this.oItem.ADDRESS);

      this.oInputForm = this.oForm.getForm();

      this.bLoaded = true;
    });
    /*
        this.oInputForm = this.oBuilder.group({
          NAME: ['Pastamania', Validators.compose([])],
          EMAIL: ['pastamania@pastafood.com', Validators.compose([Validators.required])],
          PASSWORD: ['abcdef', Validators.compose([Validators.required])],
          MOBILE: ['+65 90008290', Validators.compose([Validators.required])],
          ADDRESS: ['Tampines Central 5, 04-21/22 Tampines Mall, Singapore 52910', Validators.compose([Validators.required])],
        });
    */
  }
  onSave(formData: any) {
    this.oAPIService.send2ServerP("myprofile/update", true, formData).then((data: any) => {
      console.log(JSON.stringify(data));
      let alert = this.alert.create({
        title: 'Profile',
        subTitle: 'Saved successfully.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  onChangePassword() {
    this.navCtrl.push('ChangePasswordPage', { 'Item': this.oItem });
  }
  onExitApp() {
    let alert = this.alert.create({
      title: 'Confirm',
      message: 'Do you want to exit?',
      cssClass: 'alert-css',
      buttons: [{
        cssClass: 'alert-button-css',
        text: "Yes",
        handler: () => { this.platform.exitApp() }
      }, {
        text: "No",
        role: 'cancel'
      }]
    })
    alert.present();
  }
  //    this.platform.exitApp();
  //  }
}

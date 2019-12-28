import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from
  '@angular/forms';
//import { Camera, FileEntry, File } from "ionic-native";
//import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { APIService } from '../../providers/api-service';
import { V } from '../../app/properties';
//import { SamePasswordValidator } from './validator/SamePasswordValidator';
//import { FormControl } from '@angular/forms';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  oInputForm: FormGroup;
  oItem: any;
  oForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public oBuilder: FormBuilder
//    private readonly loadingCtrl: LoadingController,
    ,private readonly oAPIService: APIService
    ,private alertCtrl: AlertController
//    ,private readonly toastCtrl: ToastController
  ) {
    this.oItem = navParams.get('Item');
    // this.oInputForm = this.oBuilder.group({
    //   CURRENT_PASSWORD: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
    //   PASSWORD: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
    //   PASSWORD_REENTRY: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password), this.passwordMatch])],
    // });
    this.setupForm();
  }

  setupForm() {

    this.oForm = new ValidationManager({
      // 'CURRENT_PASSWORD': 'required|equal:"' + this.oItem.PASSWORD + '"',
      'CURRENT_PASSWORD': 'required',
      //'PASSWORD': 'required|equalTo:CURRENT_PASSWORD|rangeLength:' + V.Password_Min + ',' + V.Password_Max,
      'PASSWORD': 'required|rangeLength:' + V.Password_Min + ',' + V.Password_Max,
      'PASSWORD_REENTRY': 'required|equalTo:PASSWORD'
    });
    //    this.form.setValue('CURRENT_PASSWORD', 'fff');
    this.oForm.setErrorMessage('PASSWORD_REENTRY', 'equalTo', 'Reentered Password is not same as New Password');
    this.oForm.setErrorMessage('PASSWORD', 'required', 'New Password is required');
    // this.oForm.setErrorMessage('CURRENT_PASSWORD', 'equal', 'Incorrect corrent password');
    // this.oForm.setErrorMessage('PASSWORD', 'equalTo', 'New Password should not be the same');
    this.oInputForm = this.oForm.getForm();
  }

  shouldShowOldPassword() {
    if (this.oItem.LOGINTYPE == 'F' &&
      this.oItem.CURRENT_PASSWORD == '')
      return false;
    return true;
  }
  sErrorText = "";
  onSave(formData: any) {
    this.sErrorText = '';
    // if (formData.PASSWORD === formData.CURRENT_PASSWORD) {
    //   this.sErrorText = 'New Password should not be the same';
    //   return;
    // }
    if (formData.PASSWORD !== formData.PASSWORD_REENTRY) {
      //      this.showPasswordNotSame();
      this.sErrorText = 'Repeat Password is not same as New Password';
      return;
    }
    var sService = "changepassword";
    if (this.shouldShowOldPassword() == false) {
      sService = "changefbpassword";
    }
    this.oAPIService.send2ServerP(sService, true, formData).then((data: any) => {
      //      console.log(JSON.stringify(data));
      if (data.result[0].ID != null) {
        let alert = this.alertCtrl.create({
          title: 'Change Successful',
          subTitle: 'Password was changed',
          buttons: ['Dismiss']
        });
        alert.present();
//        this.navCtrl.setRoot()
//        this.navCtrl.pop();
      }
      else
        this.showPasswordNotChanged();
    });
  }
  // showPasswordNotSame() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Password Check Failed',
  //     subTitle: 'Pls check New Passwords',
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  // }
  showPasswordNotChanged() {
    let alert = this.alertCtrl.create({
      title: 'Password Changed Failed',
      subTitle: 'Pls enter correct current Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  goBack() {
    this.navCtrl.pop() ;
  }

  // private passwordMatch() {
  //   let that = this;
  //   return (c: FormControl) => {
  //     return (c.value == this.oInputForm.get('PASSWORD').value) ? null : { 'passwordMatch': { valid: false } };
  //   }
  // }
}

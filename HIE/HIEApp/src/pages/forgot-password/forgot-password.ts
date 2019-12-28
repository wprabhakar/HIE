import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { PasswordResetMessagePage } from
  '../password-reset-message/password-reset-message';
import { FormBuilder, FormGroup } from
  '@angular/forms';
import { V } from '../../app/properties';
//import { FormControl } from '@angular/forms';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  oInputForm: FormGroup;
  oForm;

  //  data: any = { email: "user1@user1.com" };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public oBuilder: FormBuilder) {
    // this.oInputForm = this.oBuilder.group({
    //   email: ['', Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.email, Validators.required])],
    // });

    this.oForm = new ValidationManager({
      //      'name': 'required|minLength:4|maxLength:12|alphaSpace',
      'email': 'required|email|rangeLength:' + V.Email_Min + "," + V.Email_Max
    });
    //    this.form.setValue('CURRENT_PASSWORD', 'fff');
    this.oForm.setErrorMessage('email', 'email', 'Please enter correct Email');
    this.oInputForm = this.oForm.getForm( ) ;
//    this.oForm.setErrorMessage('email', 'rangeLength', 'must be between ' + V.Email_Min + ' and ' + V.Email_Max );    
  }

  resetPassword(formData: any) {
    //TODO: Send Email

    this.showAlert();
  }
  showAlert() {
    let oModal = this.modalCtrl.create(PasswordResetMessagePage, { userId: 8675309 });
    //, { enableBackdropDismiss: false });
    oModal.onDidDismiss(data => {
      console.log(data);
    });
    oModal.present();
  }
}

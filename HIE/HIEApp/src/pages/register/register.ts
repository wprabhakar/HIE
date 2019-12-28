import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ViewController } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { Storage } from '@ionic/storage';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { V } from '../../app/properties';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  oInputForm: FormGroup;
  oForm;
  
  constructor(public navCtrl: NavController, public oAPIService: APIService, public oStorage: Storage,
    public viewCtrl: ViewController,
    public oBuilder: FormBuilder, public alertCtrl: AlertController) {
    // this.oInputForm = oBuilder.group({
    //   NAME: ['', Validators.compose([Validators.maxLength(V.Name_Max), Validators.minLength(V.Name_Min), Validators.pattern(V.Name)])],
    //   EMAIL: ['', Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.pattern(V.Email)])],
    //   PASSWORD: ['', Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
    //   MOBILE: ['', Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
    //   ADDRESS: ['', Validators.compose([Validators.maxLength(V.Address_Max), Validators.pattern(V.Address)])]
    // });

    this.oForm = new ValidationManager({
      'NAME': 'required|rangeLength:' + V.Name_Min + "," + V.Name_Max + '|pattern:' + V.Name,
      'EMAIL': 'required|rangeLength:' + V.Email_Min + "," + V.Email_Max + '|pattern:' + V.Email,
      'PASSWORD': 'required|rangeLength:6'
      // + V.Password_Min 
      + "," + V.Password_Max + '|pattern:' + V.Password,
      'MOBILE': 'required|rangeLength:' + V.Phone_Min + "," + V.Phone_Max,
      'ADDRESS': ''
    });

    this.oInputForm = this.oForm.getForm();
    
  }

  onCreate(formData: any) {
    if ( formData.ADDRESS === null )
      formData.ADDRESS = ' ' ;
    this.oAPIService.send2ServerP("register", true, formData).then((data) => {
      {
        this.navCtrl.push(LoginPage).then(() => {
          this.navCtrl.remove(this.viewCtrl.index);
        });
      }
    });
  }
}

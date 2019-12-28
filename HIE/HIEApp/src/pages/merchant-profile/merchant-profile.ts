import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup } from
  '@angular/forms';
//  import { FormBuilder, FormGroup, Validators } from
'@angular/forms';
//import { LoginService } from '../../providers/login-service';
import { APIService } from '../../providers/api-service';
//import { LoadingController, ToastController } from "ionic-angular";
//import { LoadingController } from "ionic-angular";
import { Global_Variables } from '../../app/properties';
import { V } from '../../app/properties';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-merchant-profile',
  templateUrl: 'merchant-profile.html'
})
export class MerchantProfilePage {
  oInputForm: FormGroup;
  oForm: ValidationManager;
  oItem: any = {};
  bLoaded: boolean = false;
  bIsFormValid: boolean = true;

  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, public oBuilder: FormBuilder
    //, private readonly oLoginService: LoginService
    , private readonly oAPIService: APIService, public oEvents: Events,
    private alert: AlertController
//    private readonly loadingCtrl: LoadingController,
    //  private readonly toastCtrl: ToastController
  ) {
    //    Global_Variables.sCurrentPage = 'Profile';
    this.fetchItems();

  }

  fetchItems() {
    this.bLoaded = false;
    this.oAPIService.send2ServerP("profile").then((data: any) => {
      this.oItem = data.result[0];
      //      console.log(this.oItem);

      // this.oInputForm = this.oBuilder.group({
      //   NAME: [this.oItem.NAME, Validators.compose([Validators.maxLength(V.Name_Max), Validators.minLength(V.Name_Min), Validators.pattern(V.Name)])],
      //   LOCATION: [this.oItem.LOCATION, Validators.compose([Validators.required])],
      //   FOOD_TYPE: [this.oItem.FOOD_TYPE, Validators.compose([Validators.required])],
      //   EMAIL: [this.oItem.EMAIL, Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.pattern(V.Email)])],
      //   PASSWORD: [{value: this.oItem.PASSWORD, disabled:true}, Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
      //   MOBILE: [this.oItem.MOBILE, Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
      //   OUTLET_PHONE: [this.oItem.OUTLET_PHONE, Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
      //   ADDRESS: [this.oItem.ADDRESS, Validators.compose([Validators.maxLength(V.Address_Max), Validators.pattern(V.Address)])]
      // });

      this.oForm = new ValidationManager({
        'NAME': 'required|rangeLength:' + V.Name_Min + "," + V.Name_Max + '|pattern:' + V.Name,
        'LOCATION': 'required',
        'FOOD_TYPE': 'required',
        'EMAIL': 'required|email',
        //        'EMAIL': 'required|rangeLength:' + V.Email_Min + "," + V.Email_Max + '|pattern:' + V.Email,
        'PASSWORD': 'required|rangeLength:' + V.Password_Min + "," + V.Password_Max + '|pattern:' + V.Password,
        'MOBILE': 'required|rangeLength:' + V.Phone_Min + "," + V.Phone_Max,
        'OUTLET_PHONE': 'required|rangeLength:' + V.Phone_Min + "," + V.Phone_Max,
        'ADDRESS': ''
        //rangeLength:' + 0 + "," + V.Address_Max + '|pattern:' + V.Address,
      });
      this.oForm.setValue('NAME', this.oItem.NAME);
      this.oForm.setValue('EMAIL', this.oItem.EMAIL);
      this.oForm.setValue('LOCATION', this.oItem.LOCATION);
      this.oForm.setValue('FOOD_TYPE', this.oItem.FOOD_TYPE);
      this.oForm.setValue('PASSWORD', this.oItem.PASSWORD);
      this.oForm.setValue('MOBILE', this.oItem.MOBILE);
      this.oForm.setValue('OUTLET_PHONE', this.oItem.OUTLET_PHONE);
      this.oForm.setValue('ADDRESS', this.oItem.ADDRESS);

      //      this.oForm.setErrorMessage('MOBILE', 'maxlength', 'must be 8 digits') ;
      //      this.oForm.setErrorMessage('OUTLET_PHONE', 'maxlength', 'must be 8 digits') ;
      this.oInputForm = this.oForm.getForm();
      this.bLoaded = true;
    });

  }
  ionViewWillEnter() {
    Global_Variables.sCurrentPage = 'Profile';
  }
  ionViewDidEnter() {
    Global_Variables.sCurrentPage = 'Profile';
    this.fetchItems();
    this.oEvents.subscribe("Cuisines", (data) => {
      this.zone.run(() => {
        this.oInputForm.value.FOOD_TYPE = data;
        this.isFormValid();
      });
    });
  }
  // ionViewDidEnter() {
  //   Global_Variables.sCurrentPage = 'Profile';
  // }

  ionViewWillLeave() {
    this.oEvents.unsubscribe("Cuisines");
    this.bLoaded = false;
  }

  onSave(formData: any) {
    console.log(JSON.stringify(formData));
    let s: string = formData.FOOD_TYPE;
    if (s.length == 0) {
      let alert = this.alert.create({
        title: 'Error',
        subTitle: 'Please select Food Type',
        buttons: ['OK']
      });
      alert.present();
      console.log("No Food Type Selected");
      return;
    }
    formData.CUISINES = s.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    formData.CUISINES = formData.CUISINES.replace("'", "");
    this.oAPIService.send2ServerP("profile/update", true, formData).then((data: any) => {
      //      console.log(JSON.stringify(data));
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
  isFormValid() {
    this.bIsFormValid = !("" == this.oInputForm.value.FOOD_TYPE);
  }
  getCuisines() {
    return this.oItem.FOOD_TYPE;
  }
}

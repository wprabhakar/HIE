import { Component, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup } from
  '@angular/forms';


/*

CA Link : https://ca-test.adyen.com/ca/ca/login.shtml
Account	: HIEarly 
User Name : admin
Password : H@veitearly2018

https://docs.adyen.com/developers/test-cards/test-card-numbers

*/

import { CartService } from '../../providers/cart-service';
import { Global_Variables } from '../../app/properties';
import { APIService } from '../../providers/api-service';
//import { sIMAGE_URL } from '../../app/properties';
//import { MultiPickerModule } from 'ion-multi-picker';
//import * as adyen from 'adyen-cse-js' ;
//https://libraries.io/npm/adyen-encryption
import AdyenEncrypt from 'adyen-encrypt';
//declare var encrypt;
//import { TextMaskModule } from 'angular2-text-mask';
import { sAdyenClientKey } from '../../app/env.properties';
//import { Inputmask } from 'inputmask';
//https://github.com/RobinHerbots/Inputmask
//import Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";
//import {Directive} from 'ionic2-text-mask' ;
import { V } from '../../app/properties';
//import { CardModule } from 'ngx-card/ngx-card';
import { ValidationManager } from "ng2-validation-manager";

//declare var Card: any;

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
  //  directives: [Directive]
  //  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})

export class ShoppingCartPage {
  //  @ViewChild("f", { read: NgForm }) oF: NgForm;
  //  @ViewChild('CARD_NUMBER', { read: ElementRef })
  //  public oCreditCard: ElementRef;
  //  @Input() oFormControl: FormControl;
  //  oPaymentForm: ElementRef;
  public oInputForm: FormGroup;
  oForm;
  bPaymentFailed: boolean = false;
  sPaymentFailed: string = '';
  oServerTime = new Date().toISOString();
  collectionDate: any = '';
  collectionTime: any = '';
  simpleColumns: any[] = [];
  oMID: number = 0;
  oMerchant: any = {};
  bLoaded: boolean = false;
  loading: Loading;
  maskCard = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  maskExpiry = [/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/, /\d/, /\d/];

  constructor(
    //private zone: NgZone, private elementRef: ElementRef, 
    public navCtrl: NavController, private oService: CartService, private readonly oAPIService: APIService, private readonly loadingCtrl: LoadingController, public oBuilder: FormBuilder, 
    private alertCtrl: AlertController) {
    this.collectionDate = Global_Variables.collectionDate;
    this.collectionTime = Global_Variables.collectionTime;
    this.simpleColumns = Global_Variables.collectionTimes;
    this.oAPIService.send2ServerP("time").then((data: any) => {
      console.log(data);
      this.oServerTime = data.date;
    });

    // this.oInputForm = this.oBuilder.group({
    //   NAME: ['Balthazar Gronon', Validators.compose([Validators.maxLength(V.Name_Max), Validators.minLength(V.Name_Min), Validators.pattern(V.Name)])],
    //   CARD: ['5555 4444 3333 1111', Validators.compose([Validators.required])],
    //   EXPIRY: ['10 / 2019', Validators.compose([Validators.required])],
    //   CCV: ['737', Validators.compose([Validators.required])],
    //   EXPIRY_MM: [''],
    //   EXPIRY_YYYY:[''],
    //   CARD_NUMBER:[''],
    // });

    //https://scotch.io/tutorials/how-to-implement-conditional-validation-in-angular-2-model-driven-forms
    this.oForm = new ValidationManager({
      'NAME': 'required|alphaSpace|rangeLength:' + V.Name_Min + "," + V.Name_Max,
      'CARD': 'required|rangeLength:16,19|pattern:[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}',
      'EXPIRY': 'required|rangeLength:9,9|pattern:[0-9]{2} / [0-9]{4}',
      'CCV': 'required|rangeLength:3,3|pattern:[0-9]{3}',
      'EXPIRY_MM': '',
      'EXPIRY_YYYY': '',
      'CARD_NUMBER': ''
    });

    this.oForm.setErrorMessage('CARD', 'pattern', 'Please enter valid Credit Card Number');
    this.oForm.setErrorMessage('EXPIRY', 'rangeLength', 'Must be in MM / YYYY format')
    if (this.sPayURL == 'pay/') {
      // this.oForm.setValue('CARD', '4111 1111 1111 1111');
      // this.oForm.setValue('EXPIRY', '08/2018');
      // this.oForm.setValue('CCV', '737');
    }

    this.oInputForm = this.oForm.getForm();
    //    this.oForm.setErrorMessage('CARD', 'rangeLength', 'Credit Card Number must be 16');
    // this.oForm.setErrorMessage('CURRENT_PASSWORD', 'equalTo', 'New Password should not be the same');
  }

  // ionViewDidLoad() {
  //   // console.log ( this.oF ) ;
  //   // var e = this.oCreditCard ;//.nativeElement;
  //   // console.log ( e ) ;
  // }
  ionViewDidEnter(): void {
    this.loading = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.loading.present();
    this.oMID = this.oService.getID();
    this.oAPIService.send2ServerP("merchant/" + this.oMID).then((data: any) => {
      this.oMerchant = data.result[0];
      this.loading.dismissAll()
      this.bLoaded = true;
    });

    // if (this.cart.length && this.cart.length > 0 ) {
    //   return;
    // }
    /*
        let alert = this.alertCtrl.create({
          title: '<b>Empty Shopping Cart</b>',
          subTitle: 'Your shopping cart is empty.',
          buttons: ['OK']
        });
        alert.present();
    */
  }
  goBack() {
    this.navCtrl.pop();
  }

  oErrors: any = [];
  encrypt(): any {
    console.log(this.oInputForm.value);
    var form = this.oInputForm.value;
    // Form and encryption options. See adyen.encrypt.simple.html for details.
    //    var options = {};
    // Bind encryption to the form.
    //    console.log ( adyen );
    //    var oEncryptedForm = adyen.createEncryptedForm(form, key, options);
    const instance = new AdyenEncrypt(sAdyenClientKey, {
      enableValidations: true,
      numberIgnoreNonNumeric: true,
      cvcIgnoreBins: '101,404'
    });

    console.log(form);
    var v = instance.encrypt({
      number: form.CARD_NUMBER,
      cvc: form.CCV,
      expiryMonth: form.EXPIRY_MM,
      expiryYear: form.EXPIRY_YYYY,
      holderName: form.NAME,
      generationtime: this.oServerTime
    })
    console.log(JSON.stringify(v));
    if (v.valid == false) {
      this.oErrors = v.errors;
      //      this.zone.run(() => {
      this.sPaymentFailed = "check " + this.oErrors[0];
      this.bPaymentFailed = true;
      //      });
      let alert = this.alertCtrl.create({
        title: 'Incorrect information',
        subTitle: this.sPaymentFailed,
        buttons: ['Dismiss']
      });
      alert.present();
      return null;
    }
    return v;
  }

  getCard() {
    var oForm = this.oInputForm.value;
    var v: string = oForm.CARD;
    //    v = v.replace(/\D+/g, '')
    //   console.log ( "CardNo." + v ) ;
    var s = v.split(' ');
    oForm.CARD_NUMBER = '';
    for (var i = 0; i < s.length; i++)
      oForm.CARD_NUMBER += s[i];
  }
  getExpiryMonth() {
    var oForm = this.oInputForm.value;
    var v = oForm.EXPIRY;
    var s = v.split("/");
    //   console.log ( "Expiry_MM " + s[0] ) ;
    oForm.EXPIRY_MM = (s[0].trim());
  }
  getExpiryYear() {
    var oForm = this.oInputForm.value;
    var v = oForm.EXPIRY;
    var s = v.split("/");
    //   console.log ( "Expiry_YYYY " + s[1] ) ;
    oForm.EXPIRY_YYYY = s[1].trim();
  }

  showNetworkError() {
    let alert = this.alertCtrl.create({
      title: 'No Network',
      subTitle: 'Please contact Haveitearly (enquiry@haveiteary.com) for possibiliity of double payment',
      buttons: ['Dismiss']
    });
    alert.present();
  }


    sPayURL = "pay/" ;
//  sPayURL = "payTest/";
  onPay(formData: any) {
    this.getCard();
    this.getExpiryMonth();
    this.getExpiryYear();
    this.loading = this.loadingCtrl.create({
      content: 'processing...',
    });
    this.loading.present();
    var vEncryptedData = this.encrypt();
    if (vEncryptedData == null) {
      this.loading.dismiss();
      return;
    }
    var oAmt = this.oService.calcTotalSum();
    var oData: any = {};
    oData.oItems = this.oService.getCart();
    oData.oPaymentInfo = vEncryptedData;
    this.oAPIService.send2ServerP(this.sPayURL + this.oMID + "/" + oAmt + "/" + this.collectionDate + "/" +
      this.collectionTime, true, oData).then((data: any) => {
        //        console.log(data);
        this.loading.dismissAll()
        if (data.success == false) {
          //          this.zone.run(() => {
          this.sPaymentFailed = data.message;
          this.bPaymentFailed = true;
          //          });
          console.log("Payment Failed " + data.message);
          //          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Payment Failed',
            subTitle: this.sPaymentFailed,
            buttons: ['Dismiss']
          });
          alert.present();
          return;
        }
        this.oService.removeAllItems();
        this.navCtrl.push('ThankYouPage');
      }).catch(() => {
        if (Global_Variables.isConnected == false) {
          this.loading.dismissAll()
          this.showNetworkError();
        }
      });
  }
}

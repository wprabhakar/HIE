import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { LoginService } from '../../providers/login-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Global_Variables } from '../../app/properties';
//import { SearchResultPage } from '../search-result/search-result' ;
import * as moment from 'moment';
//import { V } from '../../app/properties';
//import { FormControl } from '@angular/forms';
import { ValidationManager } from "ng2-validation-manager";

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {
  oInputForm: FormGroup ;
  oForm;
  
  oItems= new Array();
  bLoaded = false ;
  noMoreItemsAvailable: boolean = false;
  oMerchant:any = {} ;
  start:number = 0 ;
  size:number = 5 ;

//  data: any = { description: "" } ;
 constructor(public navCtrl: NavController, public navParams: NavParams, public oAPIService: APIService, public oStorage: Storage, public oLoginService: LoginService,
  public oBuilder: FormBuilder, public alertCtrl: AlertController) {
    Global_Variables.sCurrentPage = 'Review' ;
    this.oMerchant = navParams.get("oMerchant");
    
    // this.oInputForm= oBuilder.group({
    //   description: ['', Validators.compose([Validators.maxLength(V.Review_Max), Validators.minLength(V.Review_Max), Validators.required])]
    // });

    this.oForm = new ValidationManager({
//      'description': 'required|alphaSpace|rangeLength:' + V.Review_Min + "," + V.Review_Max
      'description': 'required'
    });
    //    this.form.setValue('CURRENT_PASSWORD', 'fff');
    this.oForm.setErrorMessage('description', 'required', 'Please enter your review');
    this.oInputForm = this.oForm.getForm( ) ;
  }

  onSave() {
//    console.log(JSON.stringify(this.oInputForm.value));
    this.oAPIService.send2ServerP ( "feedback/" + this.oLoginService.getUserID() + '/' + Global_Variables.oMID, true, this.oInputForm.value ).then((data: any) => {
//      console.log('inserted' + JSON.stringify(data));
      this.oItems.splice(0, 0, data.result[0]);
      this.oInputForm.controls['description'].setValue('');
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    })
  }
  ngOnInit() {
    this.oAPIService.send2ServerP ( "review/" + Global_Variables.oMID ).then((data: any) => {
//      console.log(JSON.stringify(data))
      this.oItems = data.result;
      this.start = this.oItems.length ;
      this.bLoaded = true;
    });
  }
  loadMoreItems(infiniteScroll: any) {
    if (this.noMoreItemsAvailable == false) { //condition when to stop
      this.oAPIService.send2ServerP("review/" + Global_Variables.oMID + "/" + this.start + "/" + this.size).then((data: any) => {
//        console.log(JSON.stringify(data))
        if ( data.result.length == 0 )
          this.noMoreItemsAvailable = true ;
        else
        {
          this.oItems.push.apply(this.oItems, data.result);
          this.start += data.result.length ;
        }
        infiniteScroll.complete();
      });
    }
  }
 
  onRemoveItem(oItem: any) {
    this.oAPIService.send2ServerP ( "delete/feedback", true, oItem)
      .then((data: any) => {
      for (var i = 0, len = this.oItems.length; i < len; i++) {
        if (this.oItems[i].ID === oItem.ID) {
          this.oItems.splice(i, 1);
          i = len;
        }
      }
      console.log(JSON.stringify(data) + 'has been deleted sucessfully')
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err) + 'cannot be deleted')
    })
  }
  getElapsedTime ( dt: any, st: any )
  {
    let s = moment(st).utc () ;
    let c = moment().utc() ;
    let t = moment(dt).add(c.diff(s)) ;
    // console.log ( "s: " + s ) ;
    // console.log ( "c: " + c ) ;
    // console.log ( "dt: " + dt ) ;
    // console.log ( "t: " + t ) ;
//    console.log ( moment(dt).local() ) ;
    return moment(t).fromNow(); // 5 years ago
  }
  getImageURL(oItem: any) {
    return this.oAPIService.buildImageURL ( oItem, this.oMerchant.ID ) ;
  }
  goBack() {
//    console.log ( "***********") ;
//    this.navCtrl.pop();
    this.navCtrl.setRoot('MerchantDiscountPage');
  }
  // goBack() {
  //   this.navCtrl.setRoot('MerchantDiscountPage');
  // }
}

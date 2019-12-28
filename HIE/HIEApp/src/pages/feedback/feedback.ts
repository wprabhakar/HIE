import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { APIService } from '../../providers/api-service';
import { LoginService } from '../../providers/login-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Global_Variables } from '../../app/properties';
//import { FormControl } from '@angular/forms';
import { ValidationManager } from "ng2-validation-manager";
//import { V } from '../../app/properties';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  oInputForm: FormGroup;
  oForm;

  oItems = new Array();
  bLoaded = false;
  noMoreItemsAvailable: boolean = false;
  start: number = 0;
  size: number = 5;

  //  data: any = { description: "" } ;
  constructor(public navCtrl: NavController, public oAPIService: APIService, public oStorage: Storage, public oLoginService: LoginService,
    public oBuilder: FormBuilder, public alertCtrl: AlertController) {
    Global_Variables.sCurrentPage = 'Feedback';
    // this.oInputForm= oBuilder.group({
    //   description: ['', Validators.compose([Validators.maxLength(100), Validators.minLength(3)])]
    // });
    this.oForm = new ValidationManager({
      //      'description': 'required|alphaSpace|rangeLength:' + V.Review_Min + "," + V.Review_Max
      'description': 'required'
    });
    //    this.form.setValue('CURRENT_PASSWORD', 'fff');
    this.oForm.setErrorMessage('description', 'required', 'Please enter your feedback');
    this.oInputForm = this.oForm.getForm();
  }

  onSave() {
//    console.log(JSON.stringify(this.oInputForm.value));
    this.oAPIService.send2ServerP("feedback/" + this.oLoginService.getUserID() + "/0", true, this.oInputForm.value).then((data: any) => {
      console.log('inserted' + JSON.stringify(data));
      this.oItems.splice(0, 0, data.result[0]);
      this.oInputForm.controls['description'].setValue('');
    }).catch((err) => {
      console.log('Error:' + JSON.stringify(err));
    })
  }
  ngOnInit() {
    this.oAPIService.send2ServerP("feedback/" + this.start + "/" + this.size).then((data: any) => {
      console.log(JSON.stringify(data))
      this.oItems = data.result;
      this.start = this.oItems.length;
      this.bLoaded = true;
    });
  }
  loadMoreItems(infiniteScroll: any) {
    if (this.noMoreItemsAvailable == false) { //condition when to stop
      this.oAPIService.send2ServerP("feedback/" + this.start + "/" + this.size).then((data: any) => {
        console.log(JSON.stringify(data))
        if (data.result.length == 0)
          this.noMoreItemsAvailable = true;
        else {
          this.oItems.push.apply(this.oItems, data.result);
          this.start += data.result.length;
        }
        infiniteScroll.complete();
      });
    }
  }
  onRemoveItem(oItem: any) {
    this.oAPIService.send2ServerP("delete/feedback", true, oItem)
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
  getElapsedTime(dt: any, st: any) {
    let s = moment(st).utc();
    let c = moment().utc();
    let t = moment(dt).add(c.diff(s));
    console.log("s: " + s);
    console.log("c: " + c);
    console.log("dt: " + dt);
    console.log("t: " + t);
    //    console.log ( moment(dt).local() ) ;
    return moment(t).fromNow(); // 5 years ago
  }
  goBack() {
    this.navCtrl.pop();
  }
}

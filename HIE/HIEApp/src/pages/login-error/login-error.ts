import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login-error',
  templateUrl: 'login-error.html'
})
export class LoginErrorPage {

  text:String = "" ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.text = "Please enter correct Email/Password" ;
  }
  ok ( )
  {    
     this.navCtrl.pop();
  }
}

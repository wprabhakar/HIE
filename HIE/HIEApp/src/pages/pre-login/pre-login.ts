import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login' ;

@Component({
  selector: 'page-pre-login',
  templateUrl: 'pre-login.html'
})
export class PreLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  onRegister ( )
  {
    this.navCtrl.push ( 'RegisterPage' ) ;
  }
  onLogin ( )
  {
    this.navCtrl.push ( LoginPage ) ;
  }
}

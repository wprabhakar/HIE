import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login' ;

@Component({
  selector: 'page-password-reset-message',
  templateUrl: 'password-reset-message.html'
})
export class PasswordResetMessagePage {

  text:String ;
  EMAIL:String ;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.EMAIL = "eainthu.naing@gmail.com" ;
    this.text = "Email to reset your password have <br>been sent to<br> <b>" + this.EMAIL  + "</b>";
    this.text += "<br><br><br>Please check your email.<br><br>" ;
  }

  ok() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
    this.navCtrl.setRoot(LoginPage) ;
  }
}

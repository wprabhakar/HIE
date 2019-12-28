import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';

@Component({
  selector: 'page-db-login',
  templateUrl: 'db-login.html'
})
export class DBLoginPage {

  data: any = { email: "", password: "" };

  constructor(//private navCtrl: NavController, 
    private viewCtrl: ViewController, private oLoginService: LoginService) {
  }

  login() {
    this.oLoginService.performLogin(this.data)
      .then((data) => {
        console.log("Logged In " + JSON.stringify(data));
        this.viewCtrl.dismiss();
      })
      .catch((err) => {
        console.log("Login Failed");
        console.log(err);
      })
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
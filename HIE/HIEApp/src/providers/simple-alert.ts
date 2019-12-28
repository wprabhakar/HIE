import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class SimpleAlert {

  constructor(public alertCtrl: AlertController) {
  }
  createAlert(title: string, message: string): any {
    return this.alertCtrl.create({
      title: title, message: message, cssClass: 'alertDanger',
      buttons: [
        {
          text: 'Ok',
        }]
    });
  }

}

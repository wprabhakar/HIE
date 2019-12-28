import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmedOrderPage } from './confirmed-order';

@NgModule({
  declarations: [
    ConfirmedOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmedOrderPage),
  ],
  exports: [
    ConfirmedOrderPage
  ]
})
export class ConfirmedOrderPageModule {}

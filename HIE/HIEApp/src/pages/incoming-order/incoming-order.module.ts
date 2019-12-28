import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomingOrderPage } from './incoming-order';

@NgModule({
  declarations: [
    IncomingOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomingOrderPage),
  ],
  exports: [
    IncomingOrderPage
  ]
})
export class IncomingOrderPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountDetailsPage } from './discount-details';

@NgModule({
  declarations: [
    DiscountDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountDetailsPage),
  ],
  exports: [
    DiscountDetailsPage
  ]
})
export class DiscountDetailsPageModule {}

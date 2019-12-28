import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantDiscountPage } from './merchant-discount';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    MerchantDiscountPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantDiscountPage),
    MultiPickerModule //Import MultiPickerModule
  ],
  exports: [
    MerchantDiscountPage
  ]
})
export class MerchantDiscountPageModule {}

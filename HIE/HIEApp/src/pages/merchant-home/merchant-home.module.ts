import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantHomePage } from './merchant-home';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    MerchantHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantHomePage),
    MultiPickerModule //Import MultiPickerModule
  ],
  exports: [
    MerchantHomePage
  ]
})
export class MerchantHomePageModule {}

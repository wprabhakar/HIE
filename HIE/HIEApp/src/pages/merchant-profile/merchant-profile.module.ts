//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantProfilePage } from './merchant-profile';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListCuisinesComponentModule } from '../../components/list-cuisines/list-cuisines.module';

@NgModule({
  declarations: [
    MerchantProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantProfilePage),
    ListCuisinesComponentModule
  ],
  exports: [
    MerchantProfilePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MerchantProfilePageModule {}

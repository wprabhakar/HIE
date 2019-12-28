import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddedInfoPage } from './added-info';

@NgModule({
  declarations: [
    AddedInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddedInfoPage),
  ],
  exports: [
    AddedInfoPage
  ]
})
export class AddedInfoPageModule {}

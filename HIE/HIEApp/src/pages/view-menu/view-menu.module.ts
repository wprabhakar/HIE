import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMenuPage } from './view-menu';

@NgModule({
  declarations: [
    ViewMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMenuPage),
  ],
  exports: [
    ViewMenuPage
  ]
})
export class ViewMenuPageModule {}

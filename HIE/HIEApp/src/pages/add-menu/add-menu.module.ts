import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMenuPage } from './add-menu';

@NgModule({
  declarations: [
    AddMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMenuPage),
  ],
  exports: [
    AddMenuPage
  ]
})
export class AddMenuPageModule {}

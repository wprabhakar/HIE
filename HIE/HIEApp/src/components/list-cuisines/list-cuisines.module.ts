import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ListCuisinesComponent } from './list-cuisines';

@NgModule({
  declarations: [
    ListCuisinesComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ListCuisinesComponent
  ]
})
export class ListCuisinesComponentModule {}

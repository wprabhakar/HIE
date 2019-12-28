import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSummaryPage } from './order-summary';

@NgModule({
  declarations: [
    OrderSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSummaryPage),
  ],
  exports: [
    OrderSummaryPage
  ]
})
export class OrderSummaryPageModule {}

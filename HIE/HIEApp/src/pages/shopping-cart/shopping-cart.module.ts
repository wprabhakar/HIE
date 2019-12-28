import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';
import { MultiPickerModule } from 'ion-multi-picker';
//import { TextMaskModule } from 'angular2-text-mask';
//import { CreditCardDirectivesModule } from 'angular-cc-library';
//import { AutoJumpDirective } from '../../directives/auto-jump/auto-jump';
//import { CardModule } from 'ngx-card/ngx-card';
//import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

//declare var Card:any ;

@NgModule({
  declarations: [
    ShoppingCartPage,
//    AutoJumpDirective,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    MultiPickerModule
//    ,CardModule
    ,TextMaskModule
//    TextMaskModule,
//    CreditCardDirectivesModule
  ],
  exports: [
    ShoppingCartPage
  ],
//  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ShoppingCartPageModule {}

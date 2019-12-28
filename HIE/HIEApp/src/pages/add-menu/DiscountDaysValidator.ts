import { FormControl, FormGroup } from '@angular/forms';
export class DiscountDaysValidator {
  static validDiscountDays(fg: FormGroup){
    console.log ( fg['RATE'].value ) ;
    console.log ( fg['ADVANCEDAYS'].value ) ;
    var oR = fg['RATE'].value ;
    var oA = fg['ADVANCEDAYS'].value ;
    if(isNaN(oR) && isNaN(oA))
    {
       return ({validDiscountDays: true}) ;
    }
    return (null);
  }
}
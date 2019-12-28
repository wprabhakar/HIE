import { FormControl } from '@angular/forms';
export class PriceValidator {
  static validPrice(fc: FormControl){
    if(isNaN(fc.value) == false)
    {
      if ( parseFloat(fc.value) > 1.0 && parseFloat(fc.value) <= 999.99 )
       return ({validPrice: true}) ;
    }
    return (null);
  }
}
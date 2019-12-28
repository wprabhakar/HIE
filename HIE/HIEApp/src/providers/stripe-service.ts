import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { CartService } from './cart-service' ;
import { LoginService } from './login-service' ;

import 'rxjs/add/operator/map';

@Injectable()
export class StripeService {

  constructor(public http: Http, public oService: CartService, public oLoginService: LoginService) {
    console.log('Hello StripeService Provider');
  }
  
  charge ( token: any, amount: number )
  {
    var oItems = this.oService.getCart ( ) ;
    const body = { token: token.id, items: oItems, id: this.oService.getID () } ;
    console.log ( JSON.stringify ( body ) ) ;
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post ( 'http://localhost:4200/stripe/payment/' + this.oLoginService.getUserID ( ) + "/" + amount , JSON.stringify ( body ), options )
         .map ( res => {
           console.log ( res.json ( ) ) ;
           return res.json ( ) ;
         })
         .toPromise ( ) ;
  } 
}

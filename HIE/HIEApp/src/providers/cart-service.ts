import { Injectable, EventEmitter } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { sIMAGE_URL } from '../app/properties';

@Injectable()
export class CartService {

  public id: number;
  private cart: any[] = [];
  public statusChanged = new EventEmitter<{
    oProduct: any, type: string; totalCount: number;
    //rid: number, ID: number 
  }>();

  setID(oID: number) {
    this.id = oID;
  }
  getID(): number { return this.id; }
  getCart(): any[] {
    return this.cart;
  };

  addItem(oItem: any): boolean {
    console.log(JSON.stringify(oItem));
    var n = this.cart.length ;
    for ( var i = 0 ; i < n ; i++ )
    {
      if ( this.cart[i].oProduct.ID == oItem.ID )
      {
        this.cart[i].qty += oItem.qty ;
        return true ;
      }
//      return false ;
    }

    oItem.PRICE = Math.round((+oItem.USUAL_PRICE) * (1 - (+oItem.DISCOUNT))*100)/100;
    
    var q = oItem.qty;
    if (!q) q = 1;
    this.cart.push({
      oProduct: oItem,
      qty: q,
      bShowDelete: true
    });
    oItem._qty = (oItem.qty ? oItem.qty : 1);
    this.statusChanged.emit({
      oProduct: oItem,
      type: 'add',
      totalCount: this.cart.length
    });
  };

  removeItem(oItem: any): void {
    let me = this;
    this.cart.forEach(function (o, i) {
      if (o.oProduct.ID == oItem.ID) {
        //        o.qty = 0 ;
        me.removeCartItem(i);
        return;
      }
    });
  }

  updateSelectedItem(oItems: any[]) {
    oItems.forEach(function (oItem) {
      oItem.wasSelected = false;
      oItem._qty = "";
    });
    this.cart.forEach(function (oCItem, i) {
      oItems.forEach(function (oItem) {
        if (oCItem.oProduct.ID == oItem.ID) {
          oItem.wasSelected = true;
          oItem._qty = oCItem.qty;
        }
      });
    });
  }

  removeAllItems(): void {
    this.cart.length = 0;
  }

  removeFromCart(oCItem: any): void {
    this.removeItem(oCItem.oProduct);
  }


  removeCartItem(index): void {
    var oCItem = this.cart[index];
    this.cart.splice(index, 1);
    this.statusChanged.emit({
      oProduct: oCItem.oProduct,
      type: 'remove',
      totalCount: this.cart && this.cart.length ? this.cart.length : 0,
      //      rid: oCItem.rid,
      //      ID: oCItem.ID
    });

  };
  adjustQty(idx: number, qty: number) {
    var oCItem: any;
    oCItem = this.cart[idx];
    oCItem.qty += qty;
    if (oCItem.qty == 0) {
      this.removeFromCart(idx);
      return;
    }
    else oCItem.Product._qty = oCItem.qty;
    if (oCItem.Product.qty == 1)
      oCItem.Product.bShowDelete = true;
    else
      oCItem.Product.bShowDelete = false;
  }

  //From Restaurant Menu Page
  adjustQty4Item(oItem: any, qty: number) {
    var me = this;
    this.cart.forEach(function (oCItem, i) {
      if (oCItem.oProduct.ID == oItem.ID) {
        oCItem.qty += qty;
        if (oCItem.qty == 0) {
          oItem._qty = "";
          oItem.wasSelected = false;
          me.removeFromCart(oCItem);
          return;
        }
        else oItem._qty = oCItem.qty;
        if (oCItem.qty == 1)
          oCItem.bShowDelete = true;
        else
          oCItem.bShowDelete = false;
        //        console.log("bShowDelete: " + o.bShowDelete);
        return;
      }
    });
  }
  //From Shopping Cart
  adjustItemQty(oCItem: any, qty: number) {
    var me = this;    
    this.cart.forEach(function (o, i) {
      if (o.oProduct.ID == oCItem.oProduct.ID) {
        o.qty += qty;
        if (o.qty == 0) {
          oCItem.oProduct._qty = "";
          oCItem.oProduct.wasSelected = false;
          me.removeFromCart(oCItem);
          return;
        }
        else oCItem.oProduct._qty = o.qty;
        if (o.qty == 1)
          o.bShowDelete = true;
        else
          o.bShowDelete = false;
        return;
      }
    });
  }

  getPrice(oItem: any): number {
    return (+oItem.PRICE) * (+oItem._qty);
  }

  getTotalSaved(): number {
    let s = 0;

    if (!this.cart || !this.cart.length) {
      return s;
    }

    for (let i = 0; i < this.cart.length; i = i + 1) {
      s = s + (+this.cart[i].oProduct.USUAL_PRICE - (+this.cart[i].oProduct.PRICE)) * (+this.cart[i].qty);
    }

    return Math.round(s * 100) / 100;

  }
  calcTotalQty(): number {
    let q = 0;
    if (!this.cart || !this.cart.length) {
      return q;
    }
    for (let i = 0; i < this.cart.length; i = i + 1) {
      q = q + (+this.cart[i].qty);
    }
    return q;
  }
  calcTotalSum(): number {
    let sum = 0;

    if (!this.cart || !this.cart.length) {
      return sum;
    }

    for (let i = 0; i < this.cart.length; i = i + 1) {
      sum = sum + (+this.cart[i].oProduct.PRICE) * (+this.cart[i].qty);
    }

    return Math.round(sum * 100) / 100;
  }

}

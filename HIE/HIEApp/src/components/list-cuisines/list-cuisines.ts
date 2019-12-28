import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Global_Variables } from '../../app/properties';
import { Events } from 'ionic-angular' ;
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//https://stackoverflow.com/questions/45500899/create-custom-dialog-box-in-ionic-2

@Component({
  selector: 'list-cuisines',
  templateUrl: 'list-cuisines.html'
})
export class ListCuisinesComponent {
  @Output() select = new EventEmitter();
  oItems = [{ Name: 'Others' }
    , { Name: 'Japanese' }
    , { Name: 'Chinese' }
    , { Name: 'Indian' }
    , { Name: 'Thai' }
    , { Name: 'Western' }
  ];
  @Input() current:any ;
  @Input() readonly: boolean ;

  constructor ( public oEvents: Events )
  {
    console.log ( "In SelectCuisines") ;
  }
  onSelected(o: any) {
    let s = "";
    o.forEach((item: string, index: number) => {
      if (index > 0)
        s += ",";
      s += "'" + item.trim() + "'";
    });
    console.log(s);
    if ( this.current === null )
      Global_Variables.selectedCuisines = s;
    else
      this.current = s ;
    this.oEvents.publish ( "Cuisines", s ) ;
  }
  ngOnInit() {
    var v = Global_Variables.selectedCuisines ;
    if ( this.current !== null )
    {
      v = this.current ;
    }
    console.log ( v ) ;
    this.oItems.forEach((item) => {
      if ( v.indexOf(item.Name) > -1)
          item['checked'] = true;
      else
        item['checked'] = false ;
    });
  }
}

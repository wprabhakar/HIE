import { Component, Output, EventEmitter } from '@angular/core';
import { Events } from 'ionic-angular';
import { Global_Variables } from '../../app/properties';

@Component({
  selector: 'select-region',
  templateUrl: 'select-region.html'
})
export class SelectRegionComponent {
  @Output() select = new EventEmitter();
  oItems = [{ Name: 'Any' }
    , { Name: 'North' }
    , { Name: 'South' }
    , { Name: 'West' }
    , { Name: 'East' }
    , { Name: 'Central' }
  ];

  constructor(public oEvents: Events) {
  }
  // onSelected ( e: any )
  // {
  //   console.log ( "SELECTED: " + JSON.stringify ( e )) ;
  //   this.oEvents.publish ( "Region", e ) ;
  // }
  onSelected(o: any) {
    let s = o; //Global_Variables.searchRegion.trim() ;
    if (s == 'Any')
      s = '%';
    Global_Variables.selectedRegion = s;
    this.oEvents.publish("Region", s);
  }
  ngOnInit() {
    let s = Global_Variables.searchRegion;
    if (Global_Variables.searchRegion === '%')
      s = 'Any';
    this.oItems.forEach((item) => {
      if (s === item.Name) {
        item['checked'] = true;
        Global_Variables.selectedRegion = s;
        if (s == 'Any')
          Global_Variables.selectedRegion = '%';
      }
      else
        item['checked'] = false;
    })
  }
}

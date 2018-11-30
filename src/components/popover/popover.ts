import { Component } from '@angular/core';
import {NavParams, ViewController, Events} from "ionic-angular";
import { FilterHelper} from "../../pages/home/FilterHelper";

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  filterHelper: FilterHelper;
  types: Array<string>;
  data;
  tags: Array<string>;

  constructor(public navParams: NavParams, public viewCtr: ViewController, public events: Events) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
    this.filterHelper = this.navParams.get('filterHelper');
    console.log(this.filterHelper);
    this.types = this.filterHelper.types;
    this.data = this.filterHelper.data;
    this.tags = this.filterHelper.tags;

    // console.log('PopoverLeave set to');
    // console.log(config.get('pop'))
  }

  updateData(type: string) {
    this.data[type] = !this.data[type];
    this.events.publish('filter:data-passed', this.data)
  }

  dismissAndFilter() {
    this.filterHelper.updateInitialState(this.data);
    this.viewCtr.dismiss(this.filterHelper);
    console.log(this.data);
    console.log('Dismissed Filter Successfully');
  }

  close() {
    this.viewCtr.dismiss(null, null, {animate: false, duration: 0});
  }



  // passData() {

  // }

  /*TODO: If we want to get the user exactly what they checked before closing popup, we need to set filterHelper.data =
    initialState before dismissing
   */

  closeAndReset() {
    // this.filterHelper.resetInitialStateAndData();
    // this.filterHelper.data = this.filterHelper.initialState;
    // console.log(this.filterHelper.data);
    this.viewCtr.dismiss(this.filterHelper, null, {animate: false, duration: 0});
    this.events.publish('filter:cancelled')

  }

}

import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
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

  constructor(public navParams: NavParams, public viewCtr: ViewController) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
    this.filterHelper = this.navParams.get('filterHelper');
    console.log(this.filterHelper);
    this.types = this.filterHelper.types;
    this.data = this.filterHelper.data;
  }

  updateData(type: string) {
    this.data[type] = !this.data[type];
  }

  dismissAndFilter() {
    this.filterHelper.updateInitialState(this.data);
    this.viewCtr.dismiss(this.filterHelper);
    console.log(this.filterHelper.data);
    console.log('Dismissed Filter Successfully');
  }

  close() {
    this.filterHelper.resetInitialState();
    this.viewCtr.dismiss(null);

  }

}

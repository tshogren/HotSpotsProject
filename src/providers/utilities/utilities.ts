import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";


@Injectable()
export class UtilitiesProvider {

  constructor(private platform: Platform) {
    console.log('Hello UtilitiesProvider Provider');
  }

  /** Returns a string representation of the current time in the form YYYY/MM/DD/hh:mm:ss */
  getTimestamp() {

    const date = new Date();

    return date.getFullYear().toString() + this.formatDate(date.getMonth().toString()) + this.formatDate(date.getDate().toString()) +
      this.formatDate(date.getHours().toString()) + this.formatDate(date.getMinutes().toString()) +
      this.formatDate(date.getSeconds().toString());
  }

  private formatDate(dateFunction: string) {

    return (dateFunction.length < 2) ? "0" + dateFunction : dateFunction
  }



  resolveURL(icon) {
    if(icon["url"]) {
      icon.url = icon.url.replace("www/", "");
    }

  }

}

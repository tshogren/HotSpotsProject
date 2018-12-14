import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, RefresherContent } from 'ionic-angular';
import { Observable } from "rxjs";
import { Place } from "../../assets/models/place.interface";
import { PlaceDataProvider } from "../../providers/suggestion-data/suggestion-data";
import set = Reflect.set;

/**
 * Displays all suggestions.
 */

@IonicPage()
@Component({
  selector: 'page-community-all',
  templateUrl: 'community-all.html',
})
export class CommunityAllPage {

  private suggestions: Observable<Place[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private placeData: PlaceDataProvider) {
    this.suggestions = placeData.getAllSuggestions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityAllPage');
  }

  refreshAll(refresher: Refresher) {
    this.suggestions = this.placeData.getAllSuggestions();
    setTimeout(() => refresher.complete(), 750);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Refresher, RefresherContent } from "ionic-angular/umd";
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {Observable} from "rxjs";
import {Place} from "../../assets/models/place.interface";

/**
 * Displays the 20 most recent suggestions.
 */

@IonicPage()
@Component({
  selector: 'page-community-recent',
  templateUrl: 'community-recent.html',
})
export class CommunityRecentPage {

  recentSuggestions: Observable<Place[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public placeData: PlaceDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityRecentPage');
  }

  ionViewWillEnter() {
    this.recentSuggestions = this.placeData.getRecentSuggestions();
  }

  refreshRecent(refresher: Refresher) {
    this.recentSuggestions = this.placeData.getRecentSuggestions();
    setTimeout(() => {refresher.complete()}, 750);
  }
}

import {Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, RefresherContent } from 'ionic-angular';
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {Observable} from "rxjs-compat";
import {Place} from "../../assets/models/place.interface";

/**
 * Displays the 20 suggestions with the most likes.
 */

@IonicPage()
@Component({
  selector: 'page-community-top',
  templateUrl: 'community-top.html',
})
export class CommunityTopPage {

  private topSuggestions: Observable<Place[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public suggestionData: PlaceDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityTopPage');
  }

  ionViewWillEnter() {
    this.topSuggestions = this.suggestionData.getTopSuggestions();
  }

  refreshTop(refresher: Refresher) {
    this.topSuggestions = this.suggestionData.getTopSuggestions();
    setTimeout(() => {refresher.complete()}, 750);
  }
}

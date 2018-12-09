import {Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {Observable} from "rxjs-compat";
import {Suggestion} from "../../assets/models/suggestion.interface";

/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  private topSuggestions: Observable<Suggestion[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public suggestionData: PlaceDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }

  ionViewWillEnter() {
    // Subscribe to suggestion data list: remove suggestions with likes >= 50 and likes <= -10
    this.topSuggestions = this.suggestionData.getTopSuggestions();
  }

  ionViewDidLeave() {
  }
}

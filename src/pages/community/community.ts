import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Tabs page for community
 *
 */

@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage {

  communityTopRoot = 'CommunityTopPage';
  communityRecentRoot = 'CommunityRecentPage';
  communityAllRoot = 'CommunityAllPage';


  constructor(public navCtrl: NavController) {}

}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from "../assets/models/user";
import {UserData} from "../assets/models/user-data.interface";
import {PlaceDataProvider} from "../providers/suggestion-data/suggestion-data";
import {UtilitiesProvider} from "../providers/utilities/utilities";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any; //= 'Intro'; //set to TabsPage if not displaying everytime
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public loadingCtrl: LoadingController, private storage: Storage, private placeData: PlaceDataProvider,
              private util: UtilitiesProvider) {
    //this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      this.setup().then(() => console.log("User initialized"));

      platform.pause.subscribe(() => {
        console.log("App paused");
        User.setLastTimeActive(this.util.getTimestamp());
        let userData: UserData = User.bundleUserData();
        storage.set('userData', userData);
      })
    });
  }

  async setup() {
    // await this.storage.remove('userData');

    let userData = await this.storage.get('userData');
    console.log(userData);
    if (userData) {
      User.initialize(userData);
      this.rootPage = TabsPage
    }
    else {
      const allSuggestions = await this.placeData.getAllSuggestions().toPromise();
      console.log(allSuggestions);
      let newUser: UserData = {
        likedPlaces: [],
        downvotedPlaces: [],
        addedPlaces: allSuggestions,
        visitedPages: [],
        lastTimeActive: this.util.getTimestamp()
      };
      User.initialize(newUser);
      this.rootPage = 'Intro';
      this.storage.set('userData', newUser);
      console.log(User.getAddedPlaces());
    }

    };


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loader.present();
  }
}


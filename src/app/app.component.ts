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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any; //= 'Intro'; //set to TabsPage if not displaying everytime
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public loadingCtrl: LoadingController, public storage: Storage, public placeData: PlaceDataProvider) {
    //this.presentLoading();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.storage.get('introShown').then((result) => {
      //
      //   if (result) {
      //     this.rootPage = TabsPage;
      //   } else {
      //     this.rootPage = 'Intro';
      //     this.storage.set('introShown', true);
      //   }
      //
      //   this.loader.dismiss();
      //
      // });

      this.setup().then(() => console.log("User initialized"));
    });
  }

  async setup() {
    await this.storage.remove('userData');
    // const defaultSuggestions = await this.placeData.getDefaultSuggestions().toPromise();

    let userData = await this.storage.get('userData');

          console.log(userData);
    if (userData) {
      User.initialize(userData);
      this.rootPage = TabsPage
    }
    else {
      const defaultSuggestions = await this.placeData.getDefaultSuggestions().toPromise();
      console.log(defaultSuggestions);
      let newUser: UserData = {
        likedPlaces: [],
        downvotedPlaces: [],
        addedPlaces: defaultSuggestions
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


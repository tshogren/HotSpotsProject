import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any; //= 'Intro'; //set to TabsPage if not displaying everytime
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public loadingCtrl: LoadingController, public storage: Storage){//, //public storage: Storage) {
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
      this.storage.get('userData').then(value => {
          console.log(value);
          if (value) {
            this.rootPage = TabsPage
          }
          else {
            this.rootPage = 'Intro';
            this.storage.set('userData', true);
          }

        },
        err => console.log(err))

    });
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loader.present();
  }
}



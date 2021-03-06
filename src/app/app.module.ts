import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, PopoverCmp} from 'ionic-angular';
import { MyApp } from './app.component';

import { SuggestPage } from '../pages/suggest/suggest';
import { InformationPage } from '../pages/information/information';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps} from "@ionic-native/google-maps";
import {PopoverComponent} from "../components/popover/popover";

import { AngularFireModule } from "@angular/fire"
import { AngularFireDatabaseModule, AngularFireDatabase } from "@angular/fire/database"
import { AngularFireAuthModule } from "@angular/fire/auth"
import {Keyboard} from "@ionic-native/keyboard";
import { SuggestionManagerProvider } from '../providers/suggestion-manager/suggestion-manager';
import { PlaceDataProvider } from '../providers/suggestion-data/suggestion-data';
import {IonicStorageModule} from "@ionic/storage";
import { UtilitiesProvider } from '../providers/utilities/utilities';
import {Toast} from "@ionic-native/toast";

export const firebaseConfig = {
  apiKey: "AIzaSyANyAIWgkJ0sKXsnLSo-hi_NVeixfvAj4I",
  authDomain: "hotspots-60e48.firebaseapp.com",
  databaseURL: "https://hotspots-60e48.firebaseio.com",
  projectId: "hotspots-60e48",
  storageBucket: "hotspots-60e48.appspot.com",
  messagingSenderId: "944740966846"
};

@NgModule({
  declarations: [
    MyApp,
    SuggestPage,
    InformationPage,
    HomePage,
    TabsPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SuggestPage,
    InformationPage,
    HomePage,
    TabsPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    AngularFireDatabase,
    Keyboard,
    Toast,
    SuggestionManagerProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlaceDataProvider,
    UtilitiesProvider
  ]
})
export class AppModule {}

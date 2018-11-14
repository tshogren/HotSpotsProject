import { Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, Platform, Events, ToastController } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, GoogleMapOptions, HtmlInfoWindow } from "@ionic-native/google-maps";
import * as _ from 'underscore';

import { mapStyle } from './mapStyle';
import { androidMap, iOSMap} from "./map-style";
import { markersDataArray } from './markersData';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller'
import {PopoverComponent} from "../../components/popover/popover";
import { MarkerModel } from "./MarkerModel";
import { FilterHelper } from "./FilterHelper";
import { BoundsChecker } from "../../assets/models/bounds-checker";
import { LikeManager } from "../../assets/models/like-manager";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: GoogleMap;
  private boundsChecker: BoundsChecker;
  private location: LatLng;

  private markers = [];
  private filterHelper: FilterHelper;

  // public navCtrl: NavController
  constructor(private platform: Platform,
              private  googleMaps: GoogleMaps,
              public popoverCtrl: PopoverController,
              public events: Events,
              public toaster: ToastController,
              public afDB: AngularFireDatabase) {

    this.location = new LatLng(44.937907, -93.168582);
    this.filterHelper = new FilterHelper();

    events.subscribe('filter:data-passed', filterData => {
      this.filter(filterData);
    });
    events.subscribe('filter:cancelled', () => {
      this.markers.forEach((markerModel: MarkerModel) => {
        markerModel.showMarker();
      })
    })

  }

  /** Loads map after page is ready and attaches event listeners. */
  ionViewDidLoad() {
    console.log('Home page loaded');
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;

      const mapOptions: GoogleMapOptions = this.platform.is('android') ? androidMap : iOSMap;

      this.map = GoogleMaps.create(element, mapOptions);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 17
        };

        this.map.moveCamera(options);
        console.log(markersDataArray);

        this.boundsChecker = new BoundsChecker(this.map, this.location, this.toaster);

        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          this.boundsChecker.checkBounds(this.map.getVisibleRegion(), this.map.getCameraPosition());
        });

        for (let i = 0; i < markersDataArray.length; i++) { // don't enumerate, use sequential for loop
          this.addMarker(markersDataArray[i]);
        }

      })
    });

  }

  addMarker(markerData) {

    // TODO: Give markers a tags paramater (String array) and destructure it here
    const {name, position, description, icon, type} = markerData;

    //Uncomment following line and run app to easily add/update our database references if/when we add markers (only for likes)
    // this.afDB.list('/markerLikes').update(name, {likes: 0});


    let htmlInfoWindow = new HtmlInfoWindow();
    let frame = document.createElement('div');

    // example tags
    let tags = ["academic", "food", "foo", "bar", "athletic"];

    frame.setAttribute('class', 'frame');
    frame.innerHTML = [`<h5 id="title" class="infoHeader">${name}</h5>`,
      `<div id="tag-container"></div>`,
      `<p class="description">${description}</p>`,
      `<div class="row-container">`,
        `<button id="like-button"><span id="heart" class="like-button"></span></button>`,
        `<span id="num-likes" class="row-item num-likes"></span>`,
      `</div>`
    ].join('');

    // adding tags to markers
    tags.forEach(tag => {

      let tagDisplay = document.createElement('span');
      tagDisplay.classList.add('tag');
      tagDisplay.textContent = tag.toUpperCase();

      frame.querySelector('#tag-container').appendChild(tagDisplay);
    });

    const likeManager = new LikeManager(this.afDB, frame);


    htmlInfoWindow.setContent(frame, {width: '200px', height: '200px'});
    htmlInfoWindow.setBackgroundColor('white');

    let markerOptions = {
      icon: icon,
      position: position,
    };

    this.map.addMarker(markerOptions)
      .then(marker => {
        console.log('Marker added');
        this.markers.push(new MarkerModel(marker, name, type, htmlInfoWindow, frame));


        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });
      });
  }


  presentPopover(myEvent) {
    let filterHelper = this.filterHelper;

    // Clicking backdrop to close filter plays an animation that makes the user unable to drag screen for a few seconds
    const popover = this.popoverCtrl.create(PopoverComponent, { filterHelper }, {enableBackdropDismiss: false});

    popover.onDidDismiss(data => {
      if (data !== null) {
        this.filterHelper = data;
        console.log('Data received!');
        console.log(data);
        this.filterHelper.resetInitialStateAndData();

      }
    });


    popover.present({
      ev: myEvent
    })
   ;
  }

  filter(filterData) {

    this.markers.forEach((markerModel: MarkerModel) => {

      console.log('Marker Model:');
      console.log(markerModel);
      console.log('Marker type' + markerModel.type);
      console.log('Checky: ' + markerModel.type + ', ' + filterData[markerModel.type]);

      let markerType = markerModel.type;
      console.log('Checky 2: ' + markerType + ', ' + filterData[markerType]);

      if(filterData[markerType] !== undefined) { // Only doing this now to account for some markers not having a type


        if(filterData[markerType] === true) {
          markerModel.showMarker();
          console.log('Made Visible');
        }
        else if (filterData[markerType] === false) {
          markerModel.hideMarker();
          console.log('Made Invisible');
        }
        else {
          console.log('Something was unaccounted for. Marker: ' + markerModel.title);
        }
      }
    });

  }

  btnClick() {
    let options = {
      target: this.location,
      zoom: 17
    };
    this.location = new LatLng(44.937907, -93.168582);
    this.map.moveCamera(options);
  }

}

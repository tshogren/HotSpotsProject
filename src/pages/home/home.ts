import { Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, Platform, Events, ToastController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  LatLng,
  GoogleMapOptions,
  HtmlInfoWindow,
  Marker, ILatLng, GoogleMapsAnimation
} from "@ionic-native/google-maps";
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
import { User } from "../../assets/models/user";
import {Observable} from "rxjs";
import {Place} from "../../assets/models/place.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: GoogleMap;
  private boundsChecker: BoundsChecker;
  private center: LatLng;

  private markerData: Place[];
  private markers: MarkerModel[];
  private filterHelper: FilterHelper;

  private addedMarker$: Observable<Place>;
  private removedMarker$: Observable<string>;

  // public navCtrl: NavController
  constructor(private platform: Platform,
              public popoverCtrl: PopoverController,
              public events: Events,
              public toaster: ToastController,
              public afDB: AngularFireDatabase) {

    this.center = new LatLng(44.937907, -93.168582);
    this.filterHelper = new FilterHelper();
    this.markerData = User.getAddedPlaces();                             // Change marker data to markersDataArray to get
    this.markers = [];                                                   // markers from the js file instead

    events.subscribe('filter:data-passed', filterData => {
      this.filter(filterData);
    });
    events.subscribe('filter:cancelled', () => {
      this.markers.forEach((markerModel: MarkerModel) => {
        markerModel.showMarker();
      })
    });

    this.addedMarker$ = User.getAddedPlace();
    this.removedMarker$ = User.getRemovedPlace();
  }

  /** Loads map after page is ready and attaches event listeners. */
  ionViewDidLoad() {
    console.log('Home page loaded');
    console.log(document.getElementsByClassName('pgm-info-tail-erase-border'));
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;

      const mapOptions: GoogleMapOptions = this.platform.is('android') ? androidMap : iOSMap;

      this.map = GoogleMaps.create(element, mapOptions);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.center,
          zoom: 17
        };

        this.map.moveCamera(options);
        console.log(this.markerData);

        this.boundsChecker = new BoundsChecker(this.map, this.center, this.toaster);

        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          this.boundsChecker.checkBounds(this.map.getVisibleRegion(), this.map.getCameraPosition());
        });


        this.markerData.forEach(markerData => {
          this.addMarker(markerData);
        })

      });


      console.log(document);

    });

    // responses to user added and removed hotspots
    this.addedMarker$.subscribe(marker => {
      console.log(marker);
      this.addMarker(marker, GoogleMapsAnimation.BOUNCE);
      console.log(this.markers);
    });
    this.removedMarker$.subscribe(name => {
      console.log(name);
      this.removeMarker(name);

    });
  }

  addMarker(markerData, animation = null) {

    // TODO: Give markers a tags paramater (String array) and destructure it here
    const {name, position, description, icon, type, tags} = markerData;

    //Uncomment following line and run app to easily add/update our database references if/when we add markers (only for likes)
    // this.afDB.list('/markerLikes').update(name, {likes: 0});
    console.log(icon);
    console.log(icon["url"]);
    if (this.platform.is("android")) this.resolveURL(icon);

    let htmlInfoWindow = new HtmlInfoWindow();
    let frame = document.createElement('div');


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
    if (tags) {
      tags.forEach(tagName => {

        let tagDisplay = document.createElement('span');
        tagDisplay.classList.add('tag', `tag-${tagName.toLowerCase()}`);
        tagDisplay.textContent = tagName.toUpperCase();

        frame.querySelector('#tag-container').appendChild(tagDisplay);
      });
    }

    const likeManager = new LikeManager(this.afDB, frame);


    htmlInfoWindow.setContent(frame, {width: '250px', maxHeight: '250px'});
    // htmlInfoWindow.setBackgroundColor('');

    let markerOptions = {
      icon: icon,
      animation: animation,
      position: position,
      disableAutoPan: true
    };

    this.map.addMarker(markerOptions)
      .then(marker => {
        console.log('Marker added');
        this.markers.push(new MarkerModel(marker, name, type, htmlInfoWindow, frame, tags));


        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
          this.panMarker(marker, .25);
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

    this.markers.forEach(marker => {

      console.log('Marker Model:');
      console.log(marker);
      console.log('Marker type' + marker.type);
      console.log('Checky: ' + marker.type + ', ' + filterData[marker.type]);

      let markerType = marker.type;
      console.log('Checky 2: ' + markerType + ', ' + filterData[markerType]);

      if(filterData[markerType] !== undefined) { // Only doing this now to account for some markers not having a type


        if(filterData[markerType] === true) {
          marker.showMarker();
          console.log('Made Visible');
        }
        else if (filterData[markerType] === false) {
          marker.hideMarker();
          console.log('Made Invisible');
        }
        else {
          console.log('Something was unaccounted for. Marker: ' + marker.title);
        }
      }
      let markerTag = marker.tags;
      for(let index = 0; index < markerTag.length; index++)
      if(filterData[markerTag[index]] === true){
        marker.showMarker();
      }
    });

  }

  btnClick() {
    let options = {
      target: this.center,
      zoom: 17
    };
    this.center = new LatLng(44.937907, -93.168582);
    this.map.moveCamera(options);
  }

  /** Horizontally centers the marker and offsets the vertical center south by the inputted percentage */
  panMarker(marker: Marker, centerOffset: number) {

    let pos = marker.getPosition();

    let mapWindow = this.map.getVisibleRegion();
    let mapHeight = mapWindow.northeast.lat - mapWindow.southwest.lat;
    let mapCenter = this.map.getCameraTarget();

    let diffy = mapCenter.lat - pos.lat;
    let diffx = mapCenter.lng - pos.lng;

    let panTarget: ILatLng = {
      lat: (mapCenter.lat + centerOffset * mapHeight) - diffy,
      lng:mapCenter.lng - diffx
    };

    this.map.animateCamera({target: panTarget, duration: 350})
  }

  removeMarker(name: string) {
    // let ind = this.markers.findIndex(marker => {return marker.title === name});
    let badMarker = this.markers.find(marker => {return marker.title === name});
    console.log(badMarker);
    if(badMarker) {
      badMarker.markerReference.remove();
      this.markers = this.markers.filter(marker => {return marker.title !== name});
    }
    if(badMarker === undefined) { // give some time for marker to be pushed onto the markers array
      setTimeout(() => this.removeMarker(name), 1000)
    }
  }

  resolveURL(icon) {
    if(icon["url"]) {
      icon.url = icon.url.replace("www/", "");
    }

  }

}

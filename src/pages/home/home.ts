import { Component, ElementRef, ViewChild} from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  LatLng,
  GoogleMapOptions,
  HtmlInfoWindow,
  Marker, ILatLng, GoogleMapsAnimation
} from "@ionic-native/google-maps";

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
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Toast} from "@ionic-native/toast";

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

  constructor(private platform: Platform,
              public popoverCtrl: PopoverController,
              public events: Events,
              public toaster: Toast,
              public afDB: AngularFireDatabase,
              public placeData: PlaceDataProvider,
              public util: UtilitiesProvider) {

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

    // subscribe to newly suggested places
    const lastTimeActive: string = User.getLastTimeActive();
    this.placeData.getNewSuggestions(lastTimeActive).on("child_added", placeSnap => {
      User.addPlace(placeSnap.val());
    })
  }

  addMarker(markerData, animation = null) {

    const {name, position, description, icon, type, tags} = markerData;

    console.log(icon);
    console.log(icon["url"]);
    if (this.platform.is("android")) this.util.resolveURL(icon);

    let htmlInfoWindow = new HtmlInfoWindow();
    let frame = document.createElement('div');


    frame.setAttribute('class', 'frame');
    frame.innerHTML = [`<h5 id="title" class="infoHeader">${name}</h5>`,
      `<div id="tag-container"></div>`,
      `<p class="description">${description}</p>`,
      `<div class="row-container">`,
        `<button id="like-button"><span id="heart" class="like-button"></span></button>`,
        `<span id="num-likes" class="row-item num-likes"></span>`,
      `</div>`,
      `<button id="remove"><span id="cross"></span></button>`
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

    frame.querySelector('#remove').addEventListener('click', () => User.removePlace(name));

    const likeManager = new LikeManager(this.afDB, this.placeData, frame);


    htmlInfoWindow.setContent(frame, {width: '250px', maxHeight: '250px'});

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

      let markerType = marker.type;

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
      if (marker.tags) {
        marker.tags.forEach(tag => {

          if (filterData[tag.substring(0, 1).toUpperCase() + tag.substring(1)] === true) { // tags are listed with first letter capitalized in FilterHelper
            marker.showMarker();
          }
        });
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

}

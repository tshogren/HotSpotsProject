import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform, Events} from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  LatLng,
  GoogleMapOptions,
  HtmlInfoWindow,
} from "@ionic-native/google-maps";
import * as _ from 'underscore';

import { mapStyle } from './mapStyle';
import { markersDataArray } from './markersData';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller'
import {PopoverComponent} from "../../components/popover/popover";
import { MarkerModel } from "./MarkerModel";
import { FilterHelper } from "./FilterHelper";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  private markers = [];
  private filterHelper: FilterHelper;

  // public navCtrl: NavController
  constructor(private platform: Platform,
              private  googleMaps: GoogleMaps,
              public popoverCtrl: PopoverController,
              public events: Events) {

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

  ionViewDidLoad() {
    console.log('Home ionViewDidLoad loaded');
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;


      let style = mapStyle;
      let mapOptions: GoogleMapOptions = {
        gestures:{
          rotate: false
        },
        styles: style,
        preferences: {
          zoom: {
            minZoom: 17
          }
        },
        building: true
      };

      this.map = this.googleMaps.create(element, mapOptions);//{styles: style});

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 17
        };

        this.map.moveCamera(options);
        console.log(markersDataArray);

        for (let i = 0; i < markersDataArray.length; i++) { // don't enumerate, use sequential for loop
          console.log(markersDataArray[i]);
          this.addMarker(markersDataArray[i]);

        }


      })
    });
  }

  addMarker(markerData) {

    //TODO: Destructure type attribute here when we have it ready for each marker data object
    const {name, position, description, icon, type} = markerData;


    let htmlInfoWindow = new HtmlInfoWindow();
    let frame = document.createElement('div');

    frame.setAttribute('class', 'frame');
    frame.innerHTML = [`<h3 class="infoHeader">${name}</h3>`,
      `<p class="description">${description}</p>`
    ].join('');

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

        // console.log(this.markers.length);

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });
      });
    // console.log(this.markers.length)
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

        // let filterData = this.filterHelper.data; // each type is true if it was checked and false if unchecked
        //TODO: When all markers have their type set, use filterData to set visibility of each marker

        // this.filter(filterData)

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

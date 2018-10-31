import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  LatLng,
  GoogleMapOptions,
  HtmlInfoWindow,
} from "@ionic-native/google-maps";
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
              public popoverCtrl: PopoverController) {
    this.location = new LatLng(44.937907, -93.168582);
    this.filterHelper = new FilterHelper();

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
    const {name, position, description, icon} = markerData;


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
        // let markerModel = new MarkerModel(marker, '', htmlInfoWindow, frame);
        // console.log(markerModel);
        this.markers.push(new MarkerModel(marker, '', htmlInfoWindow, frame)); //TODO: change type when we have it ready

        // console.log(this.markers.length);

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });
      });
    // console.log(this.markers.length)
  }
  

  presentPopover(myEvent) {
    let filterHelper = this.filterHelper;
    const popover = this.popoverCtrl.create(PopoverComponent, { filterHelper });

    popover.onDidDismiss(data => {
      if (data !== null) {
        this.filterHelper = data;
        console.log('Data received!');

        let filterData = this.filterHelper.data; // each type is true if it was checked and false if unchecked
        //TODO: When all markers have their type set, use filterData to set visibility of each marker

      }
    });

    popover.present({
      ev: myEvent
    })
   ;
  }

  btnClick() {
    alert("This is for the user");
  }

}

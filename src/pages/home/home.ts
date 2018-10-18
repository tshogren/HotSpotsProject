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

  // public navCtrl: NavController
  constructor(private platform: Platform,
              private  googleMaps: GoogleMaps) {
    this.location = new LatLng(44.937907, -93.168582)

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
        styles: style
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

    const {name, position, description, icon} = markerData;
    console.log('Description');
    console.log(description);
    console.log(position);

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

    let marker = this.map.addMarker(markerOptions)
      .then(marker => {
        console.log('Marker added');
        this.markers.push(marker);

        // console.log(this.markers.length);

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });
      });
    // console.log(this.markers.length)
  }

  // deleteMarker() {
  //   this.markers.pop().remove();
  // }

  btnClicked(){
    alert("filter clicked")
  }

}

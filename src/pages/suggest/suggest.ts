import {Component, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {Events, ModalController, NavController, Platform, ToastController} from 'ionic-angular';
import { CameraPosition, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent, GoogleMapsMapTypeId,
  ILatLng, LatLng, LatLngBounds, Marker } from "@ionic-native/google-maps";
import { mapStyle } from "../home/mapStyle"
import { Keyboard } from "@ionic-native/keyboard";
import { iOSMap, androidMap } from "../home/map-style";
import { BoundsChecker } from "../../assets/models/bounds-checker";

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage {

  @ViewChild('map')

  private mapElement: ElementRef;
  private map: GoogleMap;
  private center: LatLng;

  private markers = [];

  private suggestedMarker: Marker;
  private markerTitle: string;

  constructor(private platform: Platform,
              private navCtrl: NavController,
              public modalCtrl: ModalController,
              public event: Events,
              private keyboard: Keyboard,
              public renderer: Renderer2,
              public  toaster: ToastController) {

    this.center = new LatLng(44.938314, -93.168643);
    console.log(this.center);

    this.markerTitle = '';

  }

  ionViewDidLoad() {
    console.log('SuggestPage loaded');

    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.renderer.addClass(document.getElementById('next-button'), 'hide');
      this.renderer.removeClass(document.getElementById('checkmark'), 'hide');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.renderer.removeClass(document.getElementById('next-button'), 'hide');
      this.renderer.addClass(document.getElementById('checkmark'), 'hide')
    });

    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;


      let mapOptions: GoogleMapOptions = this.platform.is('android') ? androidMap : iOSMap;

      this.map = GoogleMaps.create(element, mapOptions);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {


        let options = {
          target: this.center,
          zoom: 17
        };


        this.map.moveCamera(options);

        let boundsChecker = new BoundsChecker(this.map, this.center, this.toaster);

        // console.log(this.map.getCameraTarget());

        /* Limits panning. Modified slightly from https://stackoverflow.com/questions/3125065/how-do-i-limit-panning-in-google-maps-api-v3
           for use with Android and iOS SDK.*/

        this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe(params => {

          if (this.suggestedMarker) {
            this.suggestedMarker.remove();
          }

          let markerPosition: LatLng = params[0];

          this.suggestedMarker = this.map.addMarkerSync({
            animation: GoogleMapsAnimation.DROP,
            position: markerPosition,
            disableAutoPan: true,
            icon: {
              url: 'assets/imgs/pin-empty.png',
              size: {
                width: 30,
                height: 38
              }
            },
          });

          this.validate()
        });

        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          boundsChecker.checkBounds(this.map.getVisibleRegion(), this.map.getCameraPosition());
        });

      })
    });

    this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));


    document.getElementById('input-place-name').addEventListener('keyup', () => {
      this.updateMarkerTitle();
      this.validate();
    });
  }

  openSuggestionForm() {
    let markerTitle = this.markerTitle;
    let markerPosition = this.suggestedMarker.getPosition();
    const selectionMenu = this.modalCtrl.create('SuggestFormPage', {markerTitle, markerPosition});

    selectionMenu.present();

  }


  ionViewWillLeave() {
    console.log(this.markerTitle);
  }


  ionViewDidLeave() {
    console.log('Left Suggest page');
  }

  private updateMarkerTitle() {

    // Getting user input from the child input node of ion-input and casting it because TypeScript is typesafe
    this.markerTitle = (<HTMLInputElement>document.getElementById('input-place-name').firstElementChild).value;
    console.log('Title length: ' + this.markerTitle.length);
  }

  private validate() {
    const button = document.getElementById('next-button');
    console.log('Validating. Can continue: ' + (this.suggestedMarker !== undefined && this.markerTitle.length > 0));

    if(this.suggestedMarker !== undefined && this.markerTitle.length > 0) {
      this.renderer.removeAttribute(button,'disabled');
    }
    else {
      this.renderer.setAttribute(button, 'disabled', '');
    }
  }
}

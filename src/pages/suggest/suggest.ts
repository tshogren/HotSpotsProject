import {Component, ElementRef, ViewChild, Renderer2} from '@angular/core';
import {AlertController, Events, ModalController, NavController, Platform, ToastController} from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent, LatLng,
  Marker } from "@ionic-native/google-maps";
import { mapStyle } from "../home/mapStyle"
import { Keyboard } from "@ionic-native/keyboard";
import { iOSMap, androidMap } from "../home/map-style";
import { BoundsChecker } from "../../assets/models/bounds-checker";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Toast} from "@ionic-native/toast";

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})
export class SuggestPage {

  @ViewChild('map')

  private mapContainer: ElementRef;
  private map: GoogleMap;
  private center: LatLng;

  private suggestedMarker: Marker;
  private markerTitle: string;

  constructor(private platform: Platform,
              private navCtrl: NavController,
              public modalCtrl: ModalController,
              public event: Events,
              private keyboard: Keyboard,
              public renderer: Renderer2,
              public toaster: Toast,
              public util: UtilitiesProvider,
              public alertCtrl: AlertController) {

    this.center = new LatLng(44.938314, -93.168643);
    console.log(this.center);

    this.markerTitle = '';

  }

  ionViewDidLoad() {
    console.log('SuggestPage loaded');
    // hardcoding the visible region size to resolve layout differences in Android/iOS
    const scrollCont: Element = document.getElementsByClassName('scroll-content')[0];
    const content: HTMLElement = document.getElementById('content');
    content.style.height = 'calc(100vh - ' + getComputedStyle(scrollCont, null).marginTop + " - " +
      getComputedStyle(scrollCont, null).marginBottom + ')';
    content.style.width = '100%';
    content.style.boxSizing = 'border-box';

    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.renderer.addClass(document.getElementById('next-button'), 'hide');
      this.renderer.removeClass(document.getElementById('checkmark'), 'hide');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.renderer.removeClass(document.getElementById('next-button'), 'hide');
      this.renderer.addClass(document.getElementById('checkmark'), 'hide')
    });

    this.platform.ready().then(() => {
      let mapContainer = this.mapContainer.nativeElement;

      let mapOptions: GoogleMapOptions = this.platform.is('android') ? androidMap : iOSMap;

      this.map = GoogleMaps.create(mapContainer, mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

        let options = {
          target: this.center,
          zoom: 17
        };

        this.map.moveCamera(options);

        let boundsChecker = new BoundsChecker(this.map, this.center, this.toaster);

        this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe(params => {

          if (this.suggestedMarker) {
            this.suggestedMarker.remove();
          }

          let markerPosition: LatLng = params[0];

          let markerOptions = {
            animation: GoogleMapsAnimation.DROP,
            position: markerPosition,
            disableAutoPan: true,
            icon: {
              url: 'www/assets/imgs/pin-empty.png',
              size: {
                width: 30,
                height: 38
              },
            },
          };

          this.util.resolveURL(markerOptions.icon);

          this.suggestedMarker = this.map.addMarkerSync(markerOptions);

          this.validate()
        });

        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          boundsChecker.checkBounds(this.map.getVisibleRegion(), this.map.getCameraPosition());
        });

      })
    });

    this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));


  }

  openSuggestionForm() {
    let markerTitle = this.markerTitle;
    let markerPosition = this.suggestedMarker.getPosition();

    const selectionMenu = this.modalCtrl.create('SuggestFormPage', {markerTitle, markerPosition});
    selectionMenu.present();

    setTimeout(() => {
      this.markerTitle = "";
      this.suggestedMarker.remove();
    }, 750);

  }

  presentInfo() {
    const info = this.alertCtrl.create({
      subTitle: 'Long press on the map to place a suggested HotSpot and follow the on screen prompts to submit it.' +
        ' Note that suggested HotSpots are visible to all users.',
      buttons:['Got it!']
    });

    info.present()
  }


  private validate() {
    const button = document.getElementById('next-button');

    if(this.suggestedMarker !== undefined && this.markerTitle.length > 0) {
      this.renderer.removeAttribute(button,'disabled');
    }
    else {
      this.renderer.setAttribute(button, 'disabled', '');
    }
  }
}

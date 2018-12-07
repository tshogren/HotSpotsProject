import {CameraPosition, GoogleMap, ILatLng, LatLng, LatLngBounds, VisibleRegion} from "@ionic-native/google-maps";
import { ToastController } from "ionic-angular";

export class BoundsChecker {

  private map: GoogleMap;
  private defaultCenter: LatLng;

  private redirectionBounds = {
    northeast: {lat: 44.943478, lng: -93.164986},
    northwest: {lat: 44.943478, lng: -93.173052},
    southwest: {lat: 44.934207, lng: -93.173052},
    southeast: {lat: 44.934207, lng: -93.164986},
    north: 44.943478,
    south: 44.93420,
    east: -93.164986,
    west: -93.173052
  };

  private panningBounds: LatLngBounds = new LatLngBounds([
    {lat: 44.945920, lng: -93.162441},
    {lat: 44.932427, lng: -93.171863}
    ]);

  private mapWidth;
  private mapHeight;

  private northeast: ILatLng;
  private northwest: ILatLng;
  private southwest: ILatLng;
  private southeast: ILatLng;

  private currentCenter: ILatLng;

  constructor(map: GoogleMap, defaultCenter: LatLng, public toaster: ToastController) {
    this.map = map;
    this.defaultCenter = defaultCenter;


  }

   checkBounds(visibleRegion: VisibleRegion, cameraPosition: CameraPosition<ILatLng>) {

    this.northeast = visibleRegion.northeast;
    this.northwest = visibleRegion.farLeft;
    this.southeast = visibleRegion.nearRight;
    this.southwest = visibleRegion.southwest;

    this.currentCenter = cameraPosition.target;

    let cornerBounds = {};
    cornerBounds['northeast'] = this.isInBounds(this.northeast);
    cornerBounds['northwest'] = this.isInBounds(this.northwest);
    cornerBounds['southeast'] = this.isInBounds(this.southeast);
    cornerBounds['southwest'] = this.isInBounds(this.southwest);

    this.mapHeight = Math.abs(this.northeast.lat) - Math.abs(this.southeast.lat);
    this.mapWidth = Math.abs(Math.abs(this.northeast.lng) - Math.abs(this.northwest.lng));

    console.log('Map Width: ' + this.mapWidth);
    console.log(cornerBounds);

    let cornersInBounds: Array<string> = [];
    Object.keys(cornerBounds).forEach(corner => {  // for each corner, if corner is in bounds
      if(cornerBounds[corner]) {
        cornersInBounds.push(corner)
      }
    });

    console.log(cornersInBounds);

    if(cornersInBounds.length < 4) {

      let centerOfRedirect: LatLng;

      if (cornersInBounds.length === 0) {
        this.presentToast();
        centerOfRedirect = this.defaultCenter;
      }

      if (cornersInBounds.length === 1) {
        centerOfRedirect = this.redirectToCorner(cornersInBounds[0])
      }

      if (cornersInBounds.length === 2) {
        centerOfRedirect = this.redirectAlongBoundary(cornersInBounds);
      }
      console.log(this.currentCenter);
      console.log(centerOfRedirect);

      this.map.animateCamera({
        target: centerOfRedirect,
        duration: 200
      });

    }

  }

  private isInBounds(coordinate: ILatLng) {
    return this.panningBounds.contains(coordinate);
  }

  private redirectToCorner(corner) {
    if(corner === 'northeast') {
      return new LatLng(this.redirectionBounds.south + this.mapHeight / 2,
        this.redirectionBounds.west + this.mapWidth / 2);
    }

    if(corner === 'northwest') {
      return new LatLng(this.redirectionBounds.south + this.mapHeight / 2,
        this.redirectionBounds.east - this.mapWidth / 2);
    }

    if(corner === 'southeast') {
      return new LatLng(this.redirectionBounds.north - this.mapHeight / 2,
        this.redirectionBounds.west + this.mapWidth / 2);
    }

    if(corner === 'southwest') {
      return new LatLng(this.redirectionBounds.north - this.mapHeight / 2,
        this.redirectionBounds.east - this.mapWidth / 2);
    }
  }

  private redirectAlongBoundary(corners: Array<string>) {
     if(corners.every(corner => {
       return corner.includes('north');
     })) {

       return new LatLng(this.redirectionBounds.south + this.mapHeight / 2, this.currentCenter.lng);
     }

     if(corners.every(corner => {
       return corner.includes('south')
     })) {
       return new LatLng(this.redirectionBounds.north - this.mapHeight / 2, this.currentCenter.lng);
     }

     if(corners.every(corner => {
       return corner.includes('east')
     })) {
       return new LatLng(this.currentCenter.lat, this.redirectionBounds.west + this.mapWidth / 2);
     }

     if(corners.every(corner => {
       return corner.includes('west')
     })) {
       return new LatLng(this.currentCenter.lat, this.redirectionBounds.east - this.mapWidth / 2);
     }
  }

  private presentToast() {

    const butteredToast = this.toaster.create({
      message: 'Where are you going?',
      duration: 1000,
      position: 'bottom'
    });

    butteredToast.present();
  }



}

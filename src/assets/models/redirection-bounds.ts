import {ILatLng, LatLng, LatLngBounds} from "@ionic-native/google-maps";

export class RedirectionBounds {

  /** Constructs an object with two LatLang points to hold the coordinates of the map boundaries as well as the latitude and longitude of the
   * boundary in each cardinal direction (N, S, E, W). Makes changing the redirection bounds easier.
   */

  northeast;
  northwest;
  southeast;
  southwest;
  north;
  south;
  east;
  west;

  constructor(northeast: ILatLng, southwest: ILatLng) {

    this.northeast = northeast;
    this.southwest = southwest;
    this.northeast = {lat: northeast.lat, lng: southwest.lng};
    this.southeast = {lat: southwest.lat, lng: northeast.lng};
    this.north = northeast.lat;
    this.south = southwest.lat;
    this.east = northeast.lng;
    this.west = southwest.lng;

  }
}

import { Marker, HtmlInfoWindow } from "@ionic-native/google-maps";

export class MarkerModel {

  markerReference: Marker;
  type: string;
  tags: Array<string>;
  infoWindow: HtmlInfoWindow;
  frame: HTMLElement;
  title: string;

  constructor(markerReference: Marker, title: string, type: string, infoWindow: HtmlInfoWindow, frame: HTMLElement) {
    this.markerReference = markerReference;
    this.type = type;
    this.infoWindow = infoWindow;
    this.frame = frame;
    this.title = title;
  }

  showMarker(){
    this.markerReference.setVisible(true);
  }

  hideMarker() {
    this.markerReference.setVisible(false);
  }

  updateInfoWindow() {
    this.infoWindow.setContent(this.frame, {height: '150px', width: '150px'})
  }
}

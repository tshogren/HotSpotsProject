import { GoogleMapOptions, GoogleMapsMapTypeId } from "@ionic-native/google-maps";

const zoom = 17;
const style = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "weight": 3
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#808080"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#808080"
      },
      {
        "lightness": 10
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#808080"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffead5"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ff8000"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffead5"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ff8000"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      },
    ]
  }
];

export const androidMap: GoogleMapOptions = {
  mapType: GoogleMapsMapTypeId.SATELLITE,
  gestures:{
    rotate: false
  },
  // styles: style,
  preferences: {
    zoom: {
      minZoom: 10,
      maxZoom: 20
    }
  },
  building: true
};

export const iOSMap: GoogleMapOptions = {
  gestures:{
    rotate: false
  },
  styles: style,
  preferences: {
    zoom: {
      minZoom: 10,
      maxZoom: 20
    }
  },
  building: true
}

;

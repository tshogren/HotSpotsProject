import {Place} from "./place.interface";
import {UserData} from "./user-data.interface";
import {Observable, Subject} from "rxjs";

export namespace User {

  let initialized: boolean;
  let likedPlaces: string[] = [];
  let downvotedPlaces: string[] = [];
  let addedPlaces: Place[] = [];

  let lastAddedPlace: Subject<Place> = new Subject<Place>();
  let lastAddedPlace$: Observable<Place> = lastAddedPlace.asObservable();
  let lastRemovedPlace: Subject<string> = new Subject<string>();
  let lastRemovedPlace$: Observable<string> = lastRemovedPlace.asObservable();

  const newUser: UserData = {
    likedPlaces: [],
    downvotedPlaces: [],
    addedPlaces: []
  }

  export function initialize(userData: UserData) {
    if (initialized) throw new Error("User is already initialized");

    likedPlaces = userData.likedPlaces;
    downvotedPlaces = userData.downvotedPlaces;
    addedPlaces = userData.addedPlaces;
  }

  export function addPlace(place: any) {
    addedPlaces.push(place);
    lastAddedPlace.next(place);
  }

  export function removePlace(placeName: string) {
    addedPlaces = addedPlaces.filter(place => {
      return place.name != placeName
    });
    lastRemovedPlace.next(placeName);
  }

  export function addLikedPlace(placeName: string) {
    downvotedPlaces = downvotedPlaces.filter(suggestion => {
      return suggestion !== placeName;
    });
    likedPlaces.push(placeName);
  }

  export function addDownvotedPlace(placeName: string) {
    likedPlaces = likedPlaces.filter(place => {
      return place !== placeName;
    });
    downvotedPlaces.push(placeName);
  }

  export function getAddedPlace() {
    return lastAddedPlace$
  }

  export function getRemovedPlace() {
    return lastRemovedPlace$
  }

  export async function bundleUserData() {
    let userData: UserData = {
      likedPlaces: likedPlaces,
      downvotedPlaces: downvotedPlaces,
      addedPlaces: addedPlaces
    };

    return Promise.resolve(userData)
  }

  export function hasLiked(placeName) {
    return likedPlaces.some(place => {
      return placeName === place;
    })
  }

  export function hasDownvoted(placeName: string) {
    return downvotedPlaces.some(place => {
      return place === placeName;
    })
  }

  export function hasAdded(placeName) {
    return addedPlaces.some(place => {
      return place.name === placeName;
    })
  }

  export function getAddedPlaces() {
    return addedPlaces
  }
}

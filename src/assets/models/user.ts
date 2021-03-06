import {Place} from "./place.interface";
import {UserData} from "./user-data.interface";
import {Observable, Subject} from "rxjs";

export namespace User {

  let initialized: boolean;
  let likedPlaces: string[] = [];
  let downvotedPlaces: string[] = [];
  let addedPlaces: Place[] = [];
  let visitedPages: string[];
  let lastTimeActive: string;

  let lastAddedPlace: Subject<Place> = new Subject<Place>();
  let lastAddedPlace$: Observable<Place> = lastAddedPlace.asObservable();
  let lastRemovedPlace: Subject<string> = new Subject<string>();
  let lastRemovedPlace$: Observable<string> = lastRemovedPlace.asObservable();


  export function initialize(userData: UserData) {
    if (initialized) throw new Error("User is already initialized");

    likedPlaces = userData.likedPlaces;
    downvotedPlaces = userData.downvotedPlaces;
    addedPlaces = userData.addedPlaces;
    visitedPages = userData.visitedPages;
    lastTimeActive = userData.lastTimeActive;
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
    downvotedPlaces = downvotedPlaces.filter(place => {
      return place !== placeName;
    });
    likedPlaces.push(placeName);
  }

  export function addDownvotedPlace(placeName: string) {
    likedPlaces = likedPlaces.filter(place => {
      return place !== placeName;
    });
    downvotedPlaces.push(placeName);
  }

  export function resetLikeStatus(placeName: string) {
    downvotedPlaces = downvotedPlaces.filter(place => {return place !== placeName});
    likedPlaces = likedPlaces.filter(place => {return place !== placeName});
  }

  export function getAddedPlace() {
    return lastAddedPlace$
  }

  export function getRemovedPlace() {
    return lastRemovedPlace$
  }

  export function addVisitedPage(pageName: string) {
    visitedPages.push(pageName);
  }

  export function bundleUserData() {
    let userData: UserData = {
      likedPlaces: likedPlaces,
      downvotedPlaces: downvotedPlaces,
      addedPlaces: addedPlaces,
      visitedPages: visitedPages,
      lastTimeActive: lastTimeActive
    };

    return userData;
  }

  export function hasVisited(pageName: string) {
    return visitedPages.some(page => {return page === pageName});
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

  export function setLastTimeActive(timestamp: string) {
    lastTimeActive = timestamp;
  }

  export function getLastTimeActive() {
    return lastTimeActive;
  }

  export function getAddedPlaces() {
    return addedPlaces
  }
}

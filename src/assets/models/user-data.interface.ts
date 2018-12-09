import {Place} from "./place.interface";

export interface UserData {
  likedPlaces: string[];
  downvotedPlaces: string[];
  addedPlaces: Place[];
  visitedPages: string[];
}

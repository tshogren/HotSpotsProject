import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database'
import {Suggestion} from "../../assets/models/suggestion.interface";
import {take} from "rxjs/operators";
import {Place} from "../../assets/models/place.interface";

/*
  Retrieves suggestions from the database.

*/
@Injectable()
export class PlaceDataProvider {

  private topSuggestions: AngularFireList<Place>;
  private recentSuggestions: AngularFireList<Place>;
  private defaultSuggestions: AngularFireList<Place>;

  constructor(private afDB: AngularFireDatabase) {
    console.log('Hello PlaceDataProvider Provider');
    this.topSuggestions = afDB.list('/suggestions', ref => ref.orderByChild('likes').limitToLast(20));
    this.recentSuggestions = afDB.list('/suggestions', ref => ref.orderByChild('timestamp').limitToLast(20));
    this.defaultSuggestions = afDB.list('defaultPlaces');
  }

  getTopSuggestions() {
    return this.topSuggestions.valueChanges().pipe(take(1));
  }

  getRecentSuggestions() {
    return this.recentSuggestions.valueChanges().pipe(take(1));
  }

  getDefaultSuggestions() {
    return this.defaultSuggestions.valueChanges().pipe(take(1));
  }

  getLikes(suggestionTitle: string): AngularFireObject<Suggestion> {
    return this.afDB.object('/suggestions/' + suggestionTitle + '/likes');
  }



}

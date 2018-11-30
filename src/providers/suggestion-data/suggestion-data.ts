import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database'
import {Suggestion} from "../../assets/models/suggestion.interface";
import {take} from "rxjs/operators";

/*
  Retrieves suggestions from the database.

*/
@Injectable()
export class SuggestionDataProvider {

  private topSuggestions: AngularFireList<Suggestion>;
  private recentSuggestions: AngularFireList<Suggestion>;

  constructor(private afDB: AngularFireDatabase) {
    console.log('Hello SuggestionDataProvider Provider');
    this.topSuggestions = afDB.list('/suggestions', ref => ref.orderByChild('likes').limitToLast(20));
    this.recentSuggestions = afDB.list('/suggestions', ref => ref.orderByChild('timestamp').limitToLast(20));
  }

  getTopSuggestions() {
    return this.topSuggestions.valueChanges().pipe(take(1));
  }

  getRecentSuggestions() {
    return this.recentSuggestions.valueChanges().pipe(take(1));
  }

  getSuggestionLikesRef(suggestionTitle: string): AngularFireObject<Suggestion> {
    return this.afDB.object('/suggestions/' + suggestionTitle + '/likes');
  }



}

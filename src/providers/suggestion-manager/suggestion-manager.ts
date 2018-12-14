import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database'
import {SuggestionData} from "../../assets/models/suggestion-data.interface";

/**
  Adds valid suggestions to database.
*/

@Injectable()
export class SuggestionManagerProvider {

  private suggestionsRef : AngularFireList<SuggestionData>;

  constructor(afDB: AngularFireDatabase) {
    console.log('Hello SuggestionManagerProvider Provider');
    this.suggestionsRef = afDB.list('/suggestions')

  }

  addSuggestion(suggestionData: SuggestionData) {
    this.suggestionsRef.update(suggestionData.name, suggestionData);
  }

}

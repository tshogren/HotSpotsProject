import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import Color from 'color'
import { LatLng } from "@ionic-native/google-maps";
import { DataMap } from "../../assets/models/data-map";
import { TagController } from "../../assets/models/tag-controller";
import { SuggestionManagerProvider } from "../../providers/suggestion-manager/suggestion-manager";
import {SuggestionData } from "../../assets/models/suggestion-data.interface";
import { Keyboard } from "@ionic-native/keyboard";
import { Icon } from '../../assets/models/constants'

/**
 * Continuation of the process to submit a user suggestion.
 *
 */

@IonicPage()
@Component({
  selector: 'page-suggest-form',
  templateUrl: 'suggest-form.html',
})
export class SuggestFormPage {

  tags: string[] = ['athletic', 'food', 'study', 'nap', 'historic', 'art', 'loud'];

  private position: LatLng;
  private tagData: DataMap;
  private selectedType: string;
  private typeButtonBaseColor: string;
  private tagControllers: TagController[];

  private markerTitle: string;
  private description: string;
  private disableSubmit: boolean;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public suggestionManager: SuggestionManagerProvider,
              public keyboard: Keyboard) {
    this.tagControllers = [];
    this.tagData = new DataMap(this.tags);
    this.markerTitle = navParams.get('markerTitle');
    this.position = this.navParams.get('markerPosition');

    this.disableSubmit = true;
  }


  ionViewDidLoad() {
    console.log('SuggestFormPage loaded');

    this.typeButtonBaseColor = getComputedStyle(document.getElementById('type-container').children[0],
      null).getPropertyValue('background-color');
    this.tags.forEach(tag => {
      let tagElement = document.getElementById(tag);
      console.log(getComputedStyle(tagElement, null).getPropertyValue("background-color"));

      this.tagControllers.push(new TagController(tagElement, tag));
    });

    let buttons: HTMLElement = document.getElementById("buttons");

    this.keyboard.onKeyboardWillShow().subscribe(() => {
      buttons.classList.add("hide");
    });
    this.keyboard.onKeyboardWillHide().subscribe( () => {
      buttons.classList.remove("hide")
    })

  }

  close() {
    this.viewCtrl.dismiss();
  }


  handleTypeSelection(target: HTMLElement) {
    const button = (<HTMLElement> target.closest('button'));
    if(!button) return;

    const typeButtons: Array<HTMLElement> = (<HTMLElement[]> Array.from(document.getElementById('type-container').children));
    typeButtons.forEach(button => {

      button.classList.toggle('selected', false);
      button.style.backgroundColor = this.typeButtonBaseColor;

    });

    button.classList.toggle('selected');
    button.style.backgroundColor = Color(this.typeButtonBaseColor).darken(.4).toString();
    this.selectedType = button.getAttribute('data-type');
    this.validateSubmit();

  }

  handleTagSelection(target: HTMLElement, tag: string) {

    const button = (<HTMLElement> target.closest('button'));
    if(!button) return;

    this.tagData.toggleState(tag);
    button.classList.toggle('selected');
    this.colorChange(tag);

  }

  colorChange(tag) {
    let tagCtrl: TagController = this.tagControllers.find(tagObject => {return tagObject.getName() === tag});

    if(this.tagData.isSelected(tag)) {
      tagCtrl.darken()
    }
    else {
      tagCtrl.removeColorChange();
    }

  }

  /** Arranges suggestion data into an object and adds it to database. */
  submit() {
    alert('Marker title: ' + this.markerTitle + '\n' +
      'Selected type:' + this.selectedType + '\n' +
      // JSON.stringify(this.tagData, null, 2) + '\n' +
      "Tags: " + this.getSelectedTags().toString() + '\n' +
      "Description: " + this.description + '\n' +
      Date() + '\n' +
      JSON.stringify(Icon[this.selectedType.toUpperCase()], null, 2) + '\n' +
      this.position.toString());

    let suggestionData: SuggestionData = {
      name: this.markerTitle,
      description: this.description,
      type: this.selectedType,
      likes: 0,
      tags: Object.assign({}, this.getSelectedTags()),
      position: {
        lat: this.position.lat,
        lng: this.position.lng
      },
      icon: Icon[this.selectedType.toUpperCase()],
      timestamp: this.getTimestamp()
    };

    console.log(suggestionData.icon);

    this.suggestionManager.addSuggestion(suggestionData);

  }

  /** Returns true iff a type is selected and a description is inputted */
  private validateSubmit() {
    this.disableSubmit =  ! !!(this.selectedType && this.description);
  }

  /** Returns a string representation of the current time in the form YYYY/MM/DD/hh:mm:ss */
  private getTimestamp() {

    const date = new Date();

    return date.getFullYear().toString() + this.formatDate(date.getMonth().toString()) + this.formatDate(date.getDate().toString()) +
      this.formatDate(date.getHours().toString()) + this.formatDate(date.getMinutes().toString()) +
      this.formatDate(date.getSeconds().toString());
  }

  private formatDate(dateFunction: string) {

    return (dateFunction.length < 2) ? "0" + dateFunction : dateFunction
  }

  private getSelectedTags() {
    return this.tagData.getSelectedItems()
  }
}

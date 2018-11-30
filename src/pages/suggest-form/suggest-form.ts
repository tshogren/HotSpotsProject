import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import Color from 'color'
import { LatLng } from "@ionic-native/google-maps";
import { DataMap } from "../../assets/models/data-map";
import { TagController } from "../../assets/models/tag-controller";
import { SuggestionManagerProvider } from "../../providers/suggestion-manager/suggestion-manager";
import {SuggestionData } from "../../assets/models/suggestion-data.interface";
import { Keyboard } from "@ionic-native/keyboard";

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

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public suggestionManager: SuggestionManagerProvider,
              public keyboard: Keyboard) {
    this.tagControllers = [];
    this.tagData = new DataMap(this.tags);
    this.markerTitle = navParams.get('markerTitle');
    this.position = this.navParams.get('markerPosition');
  }


  ionViewDidLoad() {
    this.typeButtonBaseColor = getComputedStyle(document.getElementById('type-container').children[0],
      null).getPropertyValue('background-color');

    this.tags.forEach(tag => {
      let tagElement = document.getElementById(tag);
      this.tagControllers.push(new TagController(tagElement, tag));

    });
    console.log('ionViewDidLoad SuggestParamsPage');

    window.addEventListener('click', () => this.validateSubmit());
    document.getElementById('description-input').addEventListener('keyup', () => {
      this.updateDescription();
      this.validateSubmit();
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
    const typeButtons: Array<HTMLElement> = (<HTMLElement[]> Array.from(document.getElementById('type-container').children));


    typeButtons.forEach(button => {
      button.classList.toggle('selected', false);

      button.style.backgroundColor = this.typeButtonBaseColor;
    });

    let colorChangeTarget: HTMLElement;

    if(target.nodeName === 'BUTTON') {
      target.classList.toggle('selected');
      colorChangeTarget = target;
      console.log(target);
    }

    else {
      console.log(target.parentElement);
      colorChangeTarget = target.parentElement;
      target.parentElement.classList.toggle('selected')
    }

    this.selectedType = colorChangeTarget.getAttribute('data-type');
    colorChangeTarget.style.backgroundColor = new Color(this.typeButtonBaseColor).darken(.4).toString();

  }

  handleTagSelection(target: HTMLElement, tag: string) {


    this.tagData.toggleState(tag);

    if(target.nodeName === 'BUTTON') {
      target.classList.toggle('selected')
    }
    else {
      target.parentElement.classList.toggle('selected');
    }

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


  updateDescription() {
    console.log('Updating. Curr value: ' + (<HTMLInputElement>document.getElementById('description-input').firstElementChild).value);
    this.description = (<HTMLInputElement>document.getElementById('description-input').firstElementChild).value;
  }

  /** Arranges suggestion data into an object and adds it to database. */
  submit() {
    alert('Marker title: ' + this.markerTitle + '\n' +
      'Selected type:' + this.selectedType + '\n' +
      JSON.stringify(this.tagData, null, 2) + '\n' +
      this.getSelectedTags().toString() + '\n' +
      "Description: " + this.description + '\n' +
      Date() + '\n' +
      this.position.toString());

    let suggestionData: SuggestionData = {
      title: this.markerTitle,
      description: this.description,
      type: this.selectedType,
      likes: 0,
      tags: Object.assign({}, this.getSelectedTags()),
      lat: this.position.lat,
      lng: this.position.lng,
      timestamp: this.getTimestamp()
    };

    this.suggestionManager.addSuggestion(suggestionData);

  }

  /** Returns true iff a type is selected and a description is inputted */
  private validateSubmit() {
    if(this.selectedType && this.description) {
      document.getElementById('submit-button').removeAttribute('disabled');
    }
    else {
      document.getElementById('submit-button').setAttribute('disabled', '');
    }
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

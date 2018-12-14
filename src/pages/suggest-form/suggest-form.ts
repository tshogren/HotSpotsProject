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
import {UtilitiesProvider} from "../../providers/utilities/utilities";

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
              public keyboard: Keyboard, public util: UtilitiesProvider) {
    this.tagControllers = [];
    this.tagData = new DataMap(this.tags);
    this.markerTitle = navParams.get('markerTitle');
    this.position = this.navParams.get('markerPosition');

    this.disableSubmit = true;
  }


  ionViewDidLoad() {

    // hardcoding the visible region size to resolve layout differences in Android/iOS
    const scrollCont: Element = document.getElementsByClassName('scroll-content')[0];
    const content: HTMLElement = document.getElementById('content-form');
    content.style.height = 'calc(100vh - ' + getComputedStyle(scrollCont, null).marginTop + " - " +
      getComputedStyle(scrollCont, null).marginBottom + ')';
    content.style.width = '100%';
    content.style.boxSizing = 'border-box';

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
      tagCtrl.lighten()
    }
    else {
      tagCtrl.removeColorChange();
    }

  }

  /** Arranges suggestion data into an object and adds it to database. */
  submit() {

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
      timestamp: this.util.getTimestamp()
    };

    console.log(suggestionData.icon);

    this.suggestionManager.addSuggestion(suggestionData);

    setTimeout(() => {this.close()}, 750)

  }

  /** Returns true iff a type is selected and a description is inputted */
  private validateSubmit() {
    this.disableSubmit =  ! !!(this.selectedType && this.description);
  }

  private getSelectedTags() {
    return this.tagData.getSelectedItems()
  }
}

import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ToastController} from "ionic-angular";
import {Suggestion} from "../../assets/models/suggestion.interface";
import {State} from "../../assets/models/constants";
import {AngularFireObject} from "@angular/fire/database";
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {User} from "../../assets/models/user";
import {Place} from "../../assets/models/place.interface";
import * as _ from 'underscore'
/**
 * Displays information about a suggested HotSpot.
 *
 */
@Component({
  selector: 'suggestion-card',
  templateUrl: 'suggestion-card.html'
})
export class SuggestionCardComponent implements OnInit {

  private currentState: State;
  private newState: State;
  private upvoteColor: string;
  private downvoteColor: string;
  private suggestionLikes: AngularFireObject<Suggestion>;
  private isAdded: boolean;
  private toggleAdd_throttled: Function;

  @Input() suggestion: Place;
  @ViewChild('toggleAdd', {read: ElementRef}) addToggle: ElementRef;
  @ViewChild('icon') iconImg: ElementRef;
  @HostListener('click', ['$event'])
  onClick(event: Event) {

    let button: Element = (<HTMLElement> event.target).closest('button');

    if (!button) return;

    if (button.id == "upvote" || button.id == "downvote") {
      this.resolveLikeStatus(button);
    }

    if (button.id == "toggle-add") {
      this.toggleAdd_throttled(button);
    }
  }

  constructor(public renderer: Renderer2, private suggestionData: PlaceDataProvider, private toaster: ToastController) {
    console.log('Hello SuggestionCardComponent Component');

    // this.currentState = this.initializeState();
    this.upvoteColor = "neutral";
    this.downvoteColor = "neutral";
    this.toggleAdd_throttled = _.throttle(button => this.toggleAddOrRemove(button), 1000, {trailing: false});
  }

  ngOnInit() {
    this.initializeState();
    this.isAdded = User.hasAdded(this.suggestion.name);
    if(this.isAdded) {
      this.renderer.setStyle(this.addToggle.nativeElement, 'transform', 'rotate(45deg)');
    }
    this.renderer.setAttribute(this.iconImg.nativeElement, 'src', this.suggestion.icon.url.substring(3));

    this.suggestionLikes = this.suggestionData.getLikes(this.suggestion.name);
  }


  private resolveLikeStatus(button: Element) {

    let selectedButton: string = button.id;

    button.classList.add('handy');
    setTimeout(() =>{
      button.classList.remove('handy');
    }, 350);

    if (this.currentState === State.NEUTRAL) {
      if(selectedButton === "upvote") {
        this.makeUpvote();
      }
      else if (selectedButton === "downvote") {
        this.makeDownvote();
      }
    }

    if (this.currentState === State.DOWNVOTE) {
      if(selectedButton === "upvote") {
        this.makeUpvote();
      }
      else if (selectedButton === "downvote") {
        this.makeNeutral();
      }
    }

    if (this.currentState === State.UPVOTE) {
      if (selectedButton === "upvote") {
        this.makeNeutral();
      }
      else if (selectedButton === "downvote") {
        this.makeDownvote()
      }
    }

    let difference = this.newState - this.currentState;

    this.suggestion.likes += difference;                                    // updates number locally
    this.suggestionLikes.query.ref.transaction(likes => {    // updates number on database
      return likes + difference;
    });

    this.currentState = this.newState;
  }

  private makeUpvote() {
    this.upvoteColor = "upvote";
    this.downvoteColor = "neutral";
    this.newState = State.UPVOTE;
    User.addLikedPlace(this.suggestion.name);
  }

  private makeDownvote() {
    this.upvoteColor = "neutral";
    this.downvoteColor = "downvote";
    this.newState = State.DOWNVOTE;
    User.addDownvotedPlace(this.suggestion.name);
  }

  private makeNeutral() {
    this.upvoteColor = "neutral";
    this.downvoteColor = "neutral";
    this.newState = State.NEUTRAL;
    User.resetLikeStatus(this.suggestion.name);
  }

  private initializeState() {
    if (User.hasLiked(this.suggestion.name)) {
      this.currentState = State.UPVOTE;
      this.upvoteColor = "upvote"
    }
    else if (User.hasDownvoted(this.suggestion.name)) {
      this.currentState = State.DOWNVOTE;
      this.downvoteColor = "downvote";
    }
    else {
      this.currentState = State.NEUTRAL;
    }
  }

  private toggleAddOrRemove(button: Element) {
    if (this.isAdded) {
      button.classList.remove('rotateClose');
      button.classList.add('rotateAdd');
      User.removePlace(this.suggestion.name);
      this.displayMessage(this.suggestion.name + " removed from your map.");
      // console.log("Added places, removing " + this.suggestion.name + " :");
      // console.log(User.getAddedPlaces());
    }
    else if (!this.isAdded){
      button.classList.remove('rotateAdd');
      button.classList.add('rotateClose');
      User.addPlace(this.suggestion);
      this.displayMessage(this.suggestion.name + " added to your map.");
      // console.log("Added places, adding " + this.suggestion.name + " :");
      // console.log(User.getAddedPlaces());
    }

    this.isAdded = !this.isAdded
  }

  displayMessage(message: string) {             // Native Toast not showing when called from inside component :(
    const butteredToast = this.toaster.create({
      message: message,
      duration: 1750,
      position: 'bottom',
    });

    butteredToast.present();
  }
}

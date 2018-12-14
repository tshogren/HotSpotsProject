import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Suggestion} from "../../assets/models/suggestion.interface";
import {State} from "../../assets/models/constants";
import {AngularFireObject} from "@angular/fire/database";
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {User} from "../../assets/models/user";
import {Place} from "../../assets/models/place.interface";
import * as _ from 'underscore'
/**
 * Generated class for the SuggestionCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'suggestion-card',
  templateUrl: 'suggestion-card.html'
})
export class SuggestionCardComponent implements OnInit, AfterViewInit{

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
    console.log(button);
    console.log(button.id);
  }

  constructor(public renderer: Renderer2, private suggestionData: PlaceDataProvider) {
    console.log('Hello SuggestionCardComponent Component');

    // this.currentState = this.initializeState();
    this.upvoteColor = "neutral";
    this.downvoteColor = "neutral";
    this.toggleAdd_throttled = _.throttle(button => this.toggleAddOrRemove(button), 1000, {trailing: false});
    // this.isAdded = false;
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

  ngAfterViewInit() {
    // console.log(this.addToggle.nativeElement)
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

    console.log("Selected button: " + selectedButton);
    console.log("Current state: " + this.currentState);
    console.log("New State: " + this.newState);

    let difference = this.newState - this.currentState;

    this.suggestion.likes += difference;                                    // updates number locally
    this.suggestionLikes.query.ref.transaction(likes => {    // updates number on database
      return likes + difference;
    });
    console.log('Difference: ' + difference);

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
      console.log("Added places, removing " + this.suggestion.name + " :");
      console.log(User.getAddedPlaces());
    }
    else if (!this.isAdded){
      button.classList.remove('rotateAdd');
      button.classList.add('rotateClose');
      User.addPlace(this.suggestion);
      console.log("Added places, adding " + this.suggestion.name + " :");
      console.log(User.getAddedPlaces());
    }

    this.isAdded = !this.isAdded
  }
}

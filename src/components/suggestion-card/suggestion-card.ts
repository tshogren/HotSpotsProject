import { Component, Input, OnInit, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { Suggestion } from "../../assets/models/suggestion.interface";
import { State } from "../../assets/models/constants";
import { AngularFireObject } from "@angular/fire/database";
import { SuggestionDataProvider } from "../../providers/suggestion-data/suggestion-data";

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

  @Input() suggestion: Suggestion;
  @HostListener('click', ['$event'])
  onClick(event: Event) {

    let button: Element = (<HTMLElement> event.target).closest('button');

    if (!button) return;

    console.log(button);
    console.log(button.id);
    this.resolveLikeStatus(button);
  }

  constructor(public renderer: Renderer2, private suggestionData: SuggestionDataProvider) {
    console.log('Hello SuggestionCardComponent Component');

    this.currentState = this.getCurrentState();

    this.upvoteColor = "neutral";
    this.downvoteColor = "neutral";
  }

  ngOnInit() {
      this.suggestionLikes = this.suggestionData.getSuggestionLikesRef(this.suggestion.title);
  }

  ngAfterViewInit() {

  }

  private resolveLikeStatus(button: Element) {

    let selectedButton: string = button.id;

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
    this.suggestionLikes.query.ref.transaction(likes => {
      return likes + difference;
    });
    console.log('Difference: ' + difference);

    this.currentState = this.newState;
  }

  private makeUpvote() {
    this.upvoteColor = "upvote";
    this.downvoteColor = "neutral";
    this.newState = State.UPVOTE
  }

  private makeDownvote() {
    this.upvoteColor = "neutral";
    this.downvoteColor = "downvote";
    this.newState = State.DOWNVOTE
  }

  private makeNeutral() {
    this.upvoteColor = "neutral";
    this.downvoteColor = "neutral";
    this.newState = State.NEUTRAL;
  }

  private getCurrentState() {
    return State.NEUTRAL
  }
}

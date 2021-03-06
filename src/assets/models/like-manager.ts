import { AngularFireObject, AngularFireDatabase } from "@angular/fire/database"
import { Observable } from "rxjs";
import { User } from "./user";
import {PlaceDataProvider} from "../../providers/suggestion-data/suggestion-data";
import {Place} from "./place.interface";

/** Syncs marker likes to and from database. */
export class LikeManager {

  private markerTitle: string;
  private frame: HTMLElement;
  private isLiked: boolean;
  private markerPath: Observable<Place>;
  private markerLikesPath: AngularFireObject<any>;

  /**Gets marker info from info window frame and creates references to database objects. */
  constructor(afDB: AngularFireDatabase, placeData: PlaceDataProvider, frame: HTMLElement) {

    this.frame = frame;
    this.markerTitle = this.frame.querySelector('#title').textContent;
    this.isLiked = this.getLikeStatus();

    this.setInitialCondition();

    this.markerPath = placeData.getLikes(this.markerTitle).valueChanges(); //afDB.object('/markerLikes/' + this.markerTitle).valueChanges();
    this.markerPath.subscribe(likes => {
      frame.querySelector('#num-likes').textContent = likes.toString();
    });

    this.frame.querySelector('#like-button').addEventListener('click', () => this.handleLike());

    this.markerLikesPath = placeData.getLikes(this.markerTitle);//afDB.object('/markerLikes/' + this.markerTitle +'/likes');
  }

  private setInitialCondition() {

    let heartClassList = this.frame.querySelector('#heart').classList;
    if (this.isLiked === true) {
      heartClassList.toggle('liked', true);
    }
    else {
      heartClassList.toggle('not-liked', true);
    }

  }


  private setLikeStatus(liked: boolean) {
    this.isLiked = liked;
  }

  /** Changes styling of heart and determines how like/unlike should be reflected in the
   * database.
   */
  private handleLike() {

    let heartClassList = this.frame.querySelector('#heart').classList;

    if (this.isLiked === true) {
      heartClassList.toggle('liked', false);
      heartClassList.toggle('not-liked', true);
      this.decrementLike();
      User.resetLikeStatus(this.markerTitle);
    }
    else if(this.isLiked === false) {
      heartClassList.toggle('not-liked', false);
      heartClassList.toggle('liked', true);
      this.incrementLike();
      User.addLikedPlace(this.markerTitle);
    }
    else {
      console.log('Something unaccounted for.')
    }
    this.isLiked = !this.isLiked;
  }

  private incrementLike() {
    this.markerLikesPath.query.ref.transaction(likes => {
      return likes + 1;
    });
  }

  private decrementLike() {
    this.markerLikesPath.query.ref.transaction(likes => {
      return likes - 1;
    });
  }

  private getLikeStatus() {
    return User.hasLiked(this.markerTitle);
  }
}



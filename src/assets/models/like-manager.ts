import { AngularFireObject, AngularFireDatabase } from "@angular/fire/database"
import { Observable } from "rxjs";

/** Syncs marker likes to and from database. */
export class LikeManager {

  private markerTitle: string;
  private frame: HTMLElement;
  private isLiked: boolean;
  private markerPath: Observable<any>;
  private markerLikesPath: AngularFireObject<any>;

  /**Gets marker info from info window frame and creates references to database objects. */
  constructor(afDB: AngularFireDatabase, frame: HTMLElement) {

    this.frame = frame;
    this.markerTitle = this.frame.querySelector('#title').textContent;
    console.log(this.markerTitle);
    this.isLiked = this.getLikeStatus();

    this.setInitialCondition();

    this.markerPath = afDB.object('/markerLikes/' + this.markerTitle).valueChanges();
    this.markerPath.subscribe(data => {
      frame.querySelector('#num-likes').textContent = data.likes;
    });

    this.frame.querySelector('#like-button').addEventListener('click', event => this.handleLike());

    this.markerLikesPath = afDB.object('/markerLikes/' + this.markerTitle +'/likes');
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
    }
    else if(this.isLiked === false) {
      heartClassList.toggle('not-liked', false);
      heartClassList.toggle('liked', true);
      this.incrementLike();
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
    return false;
  }
}



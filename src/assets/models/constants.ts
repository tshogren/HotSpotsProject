import * as _ from 'underscore'

export enum Type {
  PLACE_OF_INTEREST = "POI",
  ACADEMIC = "Academic",
  LANDMARK = "Landmark",
  SOCIAL = "Social"

}

export const TypeValues = _.values(Type);

export const enum State {
  UPVOTE = 1,
  NEUTRAL = 0,
  DOWNVOTE = -1
}

export class Icon {
  static readonly ACADEMIC = {

  };
  static readonly POI = {

  };
  static readonly LANDMARK = {

  };
  static readonly SOCIAL = {

  };
}

export const tags = [];

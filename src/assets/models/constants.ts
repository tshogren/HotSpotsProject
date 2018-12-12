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

export namespace Icon {

  const iconWidth = 30;
  const iconHeight = 38;

  export const ACADEMIC = {
    'url': 'www/assets/imgs/academic-building.png',
    'size': {
      width: iconWidth,
      height: iconHeight
    }
  };

  export const POI = {
    'url': 'www/assets/imgs/pin-empty.png',
    'size': {
      width: iconWidth,
      height: iconHeight
    }
  };

  export const DORM = {
    'url': 'www/assets/imgs/dorm.png',
    'size': {
      width: iconWidth,
      height: iconHeight
    }
  };

  export const LANDMARK = {
    'url': 'www/assets/imgs/food.png',
    'size': {
      width: iconWidth,
      height: iconHeight,
    }
  };

  export const ATHLETICS = {
    'url': 'www/assets/imgs/athletic.png',
    'size': {
      width: iconWidth,
      height: iconHeight
    }
  };

}

export const tags = [];



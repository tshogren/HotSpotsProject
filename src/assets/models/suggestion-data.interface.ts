import {ILatLng} from "@ionic-native/google-maps";
import { Icon } from "./icon.interface.";

export interface SuggestionData {
  name: string;
  description: string;
  type: string;
  tags?: {[key: number]: string};
  likes: 0;
  position: ILatLng;
  icon: Icon;
  timestamp: string

}

import { ILatLng } from "@ionic-native/google-maps";
import { Icon } from "./icon.interface.";

export interface Place {
  name: string;
  description: string;
  type: string;
  tags?: string[];
  icon: Icon;
  position: ILatLng;
  likes: number

}


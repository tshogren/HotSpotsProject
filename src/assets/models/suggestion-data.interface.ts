import { Type } from "./constants";

export interface SuggestionData {
  title: string;
  description: string;
  type: string;
  tags?: {[key: number]: string};
  likes: 0;
  lat: number;
  lng: number;
  timestamp: string

}

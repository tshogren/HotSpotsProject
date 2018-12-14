import Color from 'color';

export class TagController {

  private target: HTMLElement;
  private baseColor: string;
  private lightenFactor: number;
  private darkenFactor: number;
  private tagName: string;

  constructor(tagElement: HTMLElement, tagName: string) {
    this.target = tagElement;
    this.baseColor = getComputedStyle(tagElement, null).getPropertyValue('background-color');
    this.tagName = tagName;
    this.lightenFactor = .6;
    this.darkenFactor = .4
  }

  lighten() {
    this.target.style.backgroundColor = Color(this.baseColor).lighten(this.lightenFactor).toString();
  }

  darken() {
    this.target.style.backgroundColor = Color(this.baseColor).darken(this.darkenFactor).toString();
  }

  removeColorChange() {
    this.target.style.backgroundColor = this.baseColor;
  }

  getName() {
    return this.tagName
  }
}

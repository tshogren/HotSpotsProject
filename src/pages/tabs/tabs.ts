import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { SuggestPage } from '../suggest/suggest';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import {Events, Tabs} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('tabs') tabRef: Tabs;

  mb: any;
  tab1Root = HomePage;
  tab2Root = SuggestPage;
  tab3Root = 'CommunityTopPage';
  tab4Root = ContactPage;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private event: Events ) {

  }

  ionViewDidLoad() {

    // Hides tabs when keyboard is shown. Credits to kabus202 and dPary. https://github.com/ionic-team/ionic/issues/7047

    let tabs = this.queryElement(this.elementRef.nativeElement, '.tabbar');
    this.event.subscribe('hideTabs', () => {
      this.renderer.setStyle(tabs, 'display', 'none');
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, '.scroll-content');
      this.mb = content.style['margin-bottom'];
      this.renderer.setStyle(content, 'margin-bottom', '0')
    });
    this.event.subscribe('showTabs', () => {
      this.renderer.setStyle(tabs, 'display', '');
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, '.scroll-content');
      this.renderer.setStyle(content, 'margin-bottom', this.mb)
    })
  }

  queryElement(elem: HTMLElement, q: string): HTMLElement {
    return <HTMLElement>elem.querySelector(q);
  }
}

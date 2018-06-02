import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { SwipeTabDirective } from '../../directives/swipe-tab.directive';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() { }

  transition($event) {
    console.log('transition: ', $event.index);
    this.swipeTabDirective.onTabChange($event.index);
  }
}

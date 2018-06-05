import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { SwipeTabDirective } from '../../directives/swipe-tab.directive';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;
    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root = HomePage;
    tab2Root = AboutPage;
    tab3Root = ContactPage;

    constructor() { }

    transition($event) {
        this.swipeTabDirective.onTabInitialized($event.index);
    }

    onTabChange(index: number) {
        this.tabRef.select(index);
    }
}

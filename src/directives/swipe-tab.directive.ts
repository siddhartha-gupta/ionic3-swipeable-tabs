import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, Host, Self, HostListener, Renderer2 } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[swipeTab]',
})

export class SwipeTabDirective implements OnInit {
    private el: HTMLElement;
    private swipeGesture: Gesture;
    private currentTabIndex: number = 0;

    constructor(
        public _el: ElementRef,
        public navCtrl: NavController,
        private _renderer: Renderer2
    ) { }

    ngOnInit() {
        /* setTimeout(() => {
            this.swipeGesture = new Gesture(divElement);
            this.swipeGesture.listen();
            console.log('guesture added');

            this.swipeGesture.on('swipe', (event) => {
                this.swipeHandler(event);
            });
        }, 5000); */
    }

    onTabChange(tabIndex: number) {
        console.log('in directive onTabChange: ', tabIndex);

        this.createWrapperDiv(tabIndex);
    }

    createWrapperDiv(tabIndex: number) {
        var elem = this._el.nativeElement.querySelectorAll('ion-tab')[tabIndex];
        var content = elem.getElementsByTagName('ion-content')[0];

        var contentHtml = content.innerHTML;

        var divElement = this._renderer.createElement("div");
        this._renderer.addClass(divElement, "input-wrapper");
        // this._renderer.removeChild(content);
        // debugger;
        this._renderer.insertBefore(content, divElement, null);

        // this._renderer.removeChild(content, content);
        // this._renderer.appendChild(divElement, content);
    }

    swipeHandler(event) {
        console.log('swipeHandler');
        if (event.direction == '2') {
            this.currentTabIndex++;
        } else if (event.direction == '4') {
            this.currentTabIndex--;
        }
        // this.navCtrl.parent.select(2);
    }
}
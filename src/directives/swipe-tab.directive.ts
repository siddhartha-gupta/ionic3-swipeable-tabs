import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, Host, Self, HostListener, Renderer } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[swipeTab]',
    /* host: {
        '(swipe)': 'swipeHandler($event)'
    } */
})

export class SwipeTabDirective implements OnInit {
    private el: HTMLElement;
    private swipeGesture: Gesture;
    private currentTabIndex: number = 0;

    constructor(
        public _el: ElementRef,
        public navCtrl: NavController,
        private _renderer: Renderer
    ) { }

    ngOnInit() {
        setTimeout(() => {
            // Remove the inputWrapper attribute (not really necessary, but just to be clean)
            this._renderer.setElementAttribute(this._el.nativeElement, "inputWrapper", null);

            // Get parent of the original input element
            var parent = this._el.nativeElement.parentNode;

            // Create a div and add it to the parent
            // Note: it seems that Renderer creates the element in the right place,
            // no need to specify where.
            var divElement = this._renderer.createElement(parent, "div");

            // Add class "input-wrapper"
            this._renderer.setElementClass(divElement, "input-wrapper", true);

            // Move the input as a child of the div
            divElement.appendChild(this._el.nativeElement);

            this.swipeGesture = new Gesture(divElement);
            this.swipeGesture.listen();
            console.log('guesture added');

            this.swipeGesture.on('swipe', (event) => {
                this.swipeHandler(event);
            });
        }, 5000);
    }

    ionViewDidEnter() {
        // debugger;
        // console.log(this.elementRef);
        // this.elementRef.nativeElement.querySelector('ion-content').addEventListener('click', this.onClick.bind(this));
    }

    /*@HostListener('swipe', ['$event'])
    onSwipe(e: any) {
        console.log('onSwipe');
    }*/

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
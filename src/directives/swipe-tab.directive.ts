import { Directive, ElementRef, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[swipeTab]',
})

export class SwipeTabDirective implements OnInit {
    private swipeGesture: Gesture;
    private currentTabIndex: number = 0;
    private tabCount: number = 0;

    @Output() onTabChange = new EventEmitter();

    constructor(
        public _el: ElementRef,
        private _renderer: Renderer2
    ) { }

    ngOnInit() {
        this.tabCount = this._el.nativeElement.querySelectorAll('ion-tab').length - 1;
    }

    onTabInitialized(tabIndex: number) {
        var elem = this._el.nativeElement.querySelectorAll('ion-tab')[tabIndex];
        var content = elem.getElementsByTagName('ion-content')[0];

        if (content.querySelector('.swipe-area') === null) {
            console.log('add swipe area');
            this.createWrapperDiv(content);
        }
    }

    createWrapperDiv(content: HTMLElement) {
        var divElement = this._renderer.createElement("div");
        this._renderer.addClass(divElement, "swipe-area");
        this._renderer.insertBefore(content, divElement, null);

        while (content.children.length > 1) {
            let child = content.children[0];
            this._renderer.removeChild(content, child);
            this._renderer.appendChild(divElement, child);
        }

        this.swipeGesture = new Gesture(divElement);
        this.swipeGesture.listen();
        console.log('add swipe guesture');

        this.swipeGesture.on('swipe', (event) => {
            this.swipeHandler(event);
        });
        /* this._renderer.listen(content, 'swipe', ($event) => {
            this.swipeHandler($event);
        }); */
    }

    swipeHandler(event) {
        console.log('swipeHandler');
        if (event.direction == '2') {
            this.moveForward();
        } else if (event.direction == '4') {
            this.moveBackward();
        }
    }

    moveForward() {
        if (this.currentTabIndex < this.tabCount) {
            this.currentTabIndex++;
            this.onTabChange.emit(this.currentTabIndex);
        }
    }

    moveBackward() {
        if (this.currentTabIndex > 0) {
            this.currentTabIndex--;
            this.onTabChange.emit(this.currentTabIndex);
        }
    }
}

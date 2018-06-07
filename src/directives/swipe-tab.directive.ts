import { Directive, ElementRef, Output, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[swipeTab]',
})

export class SwipeTabDirective implements OnInit {
    private currentTabIndex: number = 0;
    private tabCount: number = 0;
    private swipeCoords: [number, number];
    private swipeDuration: number;
    private browserSwipeGesture: Gesture;
    private touchListenersFns = [];

    @Output() onTabChange = new EventEmitter();

    constructor(
        public _el: ElementRef,
        private _renderer: Renderer2
    ) { }

    ngOnInit() {
        this.tabCount = this._el.nativeElement.querySelectorAll('ion-tab').length - 1;
    }

    onTabInitialized(tabIndex: number): void {
        var elem = this._el.nativeElement.querySelectorAll('ion-tab')[tabIndex];
        var content = elem.getElementsByTagName('ion-content')[0];

        if (content.querySelector('.swipe-area') === null) {
            console.log('add swipe area');
            this.createWrapperDiv(content);
        }
    }

    createWrapperDiv(content: HTMLElement): void {
        var divElement = this._renderer.createElement("div");
        this._renderer.addClass(divElement, "swipe-area");
        this._renderer.insertBefore(content, divElement, null);

        while (content.children.length > 1) {
            let child = content.children[0];
            this._renderer.removeChild(content, child);
            this._renderer.appendChild(divElement, child);
        }

        this.addEventListeners(divElement);
    }

    addEventListeners(divElement: HTMLElement) {
        if ('ontouchstart' in document.documentElement) {
            this.touchListenersFns.push(
                this._renderer.listen(divElement, 'touchstart', ($event) => {
                    this.deviceSwipeHandler($event, 'start');
                }),
                this._renderer.listen(divElement, 'touchend', ($event) => {
                    this.deviceSwipeHandler($event, 'end');
                })
            );
        } else {
            this.browserSwipeGesture = new Gesture(divElement);
            this.browserSwipeGesture.listen();

            this.browserSwipeGesture.on('swipe', (event) => {
                this.browserSwipeHandler(event);
            });
        }
    }

    deviceSwipeHandler(event: TouchEvent, status: string): void {
        console.log('deviceSwipeHandler, status: ', status);
        const coords: [number, number] = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (status === 'start') {
            this.swipeCoords = coords;
            this.swipeDuration = time;
        } else if (status === 'end') {
            const direction = [coords[0] - this.swipeCoords[0], coords[1] - this.swipeCoords[1]];
            const duration = time - this.swipeDuration;

            if (duration < 1000 && Math.abs(direction[0]) > 50
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
                if (direction[0] > 0) {
                    this.moveBackward();
                } else {
                    this.moveForward();
                }
            }
        }
    }

    browserSwipeHandler(event) {
        console.log('browserSwipeHandler, direction: ', event.direction);
        if (event.direction == '2') {
            this.moveForward();
        } else if (event.direction == '4') {
            this.moveBackward();
        }
    }

    moveForward(): void {
        if (this.currentTabIndex < this.tabCount) {
            this.currentTabIndex++;
            this.onTabChange.emit(this.currentTabIndex);
        }
    }

    moveBackward(): void {
        if (this.currentTabIndex > 0) {
            this.currentTabIndex--;
            this.onTabChange.emit(this.currentTabIndex);
        }
    }

    ngOnDestroy() {
        if (this.touchListenersFns.length > 0) {
            this.touchListenersFns.forEach(fn => fn());
        } else if (this.browserSwipeGesture) {
            this.browserSwipeGesture.unlisten();
        }
    }
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, throttleTime } from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-sticky-header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        width: 100%;
      }
    `
  ],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        // style({ opacity: 0, transform: 'translateY(-100%)' })
        style({ height: '40px' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class StickyHeaderComponent implements OnInit, AfterViewInit {
  private isVisible = true;

  constructor() {
    const scrollS$ = fromEvent(window, 'scroll').subscribe((res) => {
      console.log('aaaa', res);
    });

    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );
    // scrollS$.subscribe

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe((res) => {
      this.isVisible = true;
      console.log(res);
    });

    goingDown$.subscribe(() => (this.isVisible = false));
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    // console.log(this.isVisible);
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }
  ngOnInit() {
    fromEvent(window, 'onscroll').subscribe((res) => {
      console.log('aaaa', res);
    });
  }
  ngAfterViewInit() {
    console.log('aaaa', window);

  }
}

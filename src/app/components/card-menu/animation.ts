import {
  animate,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '500px',
    })),
    state('out', style({
      'max-height': '0px',
    })),
    transition('in => out', [group([
      animate('100ms ease-in-out', style({
        'opacity': '0'
      })),
      animate('100ms ease-in-out', style({
        'max-height': '0px'
      })),
      animate('100ms ease-in-out', style({
        'visibility': 'hidden'
      }))
    ]
    )]),
    transition('out => in', [group([
      animate('100ms ease-in-out', style({
        'opacity': '1'
      })),
      animate('100ms ease-in-out', style({
        'max-height': '500px'
      })),
      animate('1ms ease-in-out', style({
        'visibility': 'visible'
      })),
    ]
    )])
  ]),
]

export const DropDownAnimationContainer =
  trigger("dropDownMenuContainer", [
    transition(":enter", [
      query("ion-item, item-list", [
        style({ opacity: 0 })
      ]),
      sequence([
        query("ion-item, item-list", [
          stagger(-50, [
            animate(
              "50ms ease-in-out",
              style({ opacity: 1 })
            )
          ])
        ]),
      ])
    ]),

    transition(":leave", [
      query("ion-item, item-list", [
        style({ opacity: 0 })
      ]),
      sequence([
        query("ion-item, item-list", [
          stagger(50, [
            animate(
              "50ms ease-in-out",
              style({ opacity: 0 })
            )
          ])
        ]),
      ])
    ])
  ]);
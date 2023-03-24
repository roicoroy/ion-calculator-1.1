import { Directive, Input, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DomController, IonContent, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;

  @Input('appHideContent') content: any;

  @Input('appHideGrid') grid: any;

  private headerHeight = isPlatform('ios') ? 44 : 56;
  private headerChildren: any;
  private contentChildren: any;
  private contentEl: any;
  private gridEl: any;
  private gridChildren: any;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.headerChildren = this.header.children;
    this.contentEl = this.content.el;
    this.contentChildren = this.contentEl.children;
    this.gridEl = this.grid.el;
    this.gridChildren = this.gridEl.children;
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {

    // console.log($event);

    const scrollTop: number = $event.detail.scrollTop;

    let newPosition = -scrollTop;
    let newContentPosition = -scrollTop;
    console.log(newContentPosition);

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }
    if (newContentPosition < -this.headerHeight) {
      newContentPosition = -this.headerHeight;
    }
    let newOpacity = 1 - (newPosition / -this.headerHeight);

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      // this.renderer.setStyle(this.header, 'background', 'orange');
      // this.renderer.setStyle(this.contentEl, 'background', 'red');
      this.renderer.setStyle(this.contentEl, 'top', newContentPosition * 3 + 'px');
      // this.renderer.setStyle(this.contentEl, 'background', 'green');
      // console.log(this.headerChildren);
      for (let hh of this.headerChildren) {
        this.renderer.setStyle(hh, 'opacity', newOpacity);
      }
// this.renderer.

      // this.renderer.setStyle(this.contentChildren[0], 'background', 'pink');

      for (let cc of this.contentChildren) {
        this.renderer.setStyle(this.contentEl, 'background', 'red');
      }
      for (let gg of this.gridChildren) {
        this.renderer.setStyle(gg, 'background', 'red');
      }
    });
  }
}

// <ion-header #header>
//     <ion-toolbar><ion-title>Test</ion-title></ion-toolbar>
// </ion-header>
// <ion-content scrollEvents="true" appHideHeader [header]="header">
// </ion-content>
import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[elastic-header]'
})
export class ElasticHeaderDirective {

  public scrollerHandle: any;
  public header: any;
  public headerHeight: any;
  public translateAmt: any;
  public scaleAmt: any;
  public scrollTop: any;
  public lastScrollTop: any;
  public ticking: any;


  constructor(
    public element: ElementRef,
    public renderer: Renderer2
    ) {

  }

  ngOnInit() {
    this.scrollerHandle = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header = this.scrollerHandle.firstElementChild;
    this.headerHeight = this.scrollerHandle.clientHeight;
    this.ticking = false;

    this.renderer.setStyle(this.header, 'webkitTransformOrigin', 'center bottom');

    window.addEventListener('resize', () => {
      this.headerHeight = this.scrollerHandle.clientHeight;
    }, false);

    this.scrollerHandle.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateElasticHeader();
        });
      }

      this.ticking = true;
    });
  }

  public updateElasticHeader() {
    this.scrollTop = this.scrollerHandle.scrollTop;

    if (this.scrollTop >= 0) {
      this.translateAmt = this.scrollTop / 2;
      this.scaleAmt = 1;
    }
    else {
      this.translateAmt = 0;
      this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
    }

    this.renderer.setStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')');
    this.ticking = false;
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MenuFacade } from 'src/app/services/menu/menu.facade';
import { NavigationService } from 'src/app/services/navigation.service';
import { UpdateMenuStatus } from 'src/app/store/menu/menu.actions';
import { DropDownAnimationContainer, SlideInOutAnimation } from './animation';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
  animations: [
    DropDownAnimationContainer,
    SlideInOutAnimation,
  ]
})
export class CardMenuComponent implements OnInit, OnDestroy {

  isOpen = false;

  title: string;

  linksList = [
    {
      icon: 'settings',
      path: 'settings/tabs/waiters',
      name: 'settings'
    },
  ]

  animationState = 'out';

  private readonly ngUnsubscribe = new Subject();

  readonly menuState$: Observable<any>;

  constructor(
    private navigation: NavigationService,
    private facade: MenuFacade,
    private store: Store,
  ) {
    this.menuState$ = this.facade.menuState$;
    this.menuState$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((vs: any) => {
        // console.log(vs.isOpen[0]);
        this.isOpen = vs.isOpen[0];
      });
    this.title = 'Goiabeira';
  }

  async toggleMenuState() {
    this.isOpen = !this.isOpen;
    // this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.store.dispatch(new UpdateMenuStatus(this.isOpen));

  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
  async navigate(path: string) {
    this.navigation.navigateFadeOut(path);
    await this.toggleMenuState();
  }
}

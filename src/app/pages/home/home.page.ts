import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CardMenuComponent } from 'src/app/components/card-menu/card-menu.component';
import { ScrollHideConfig } from 'src/app/directive/scroll-hide.directive';
import { NavigationService } from 'src/app/services/navigation.service';
import { UpdateMenuStatus } from 'src/app/store/menu/menu.actions';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pages = new Array(10);

  // @ViewChild('cardMenu', { static: true }) cardMenu: CardMenuComponent;

  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  // headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 120 };

  constructor(
    private navigation: NavigationService,
    private store: Store
  ) { }
  async settings() {
    await this.navigation.navigateFadeOut('settings/tabs/waiters');
  }
  async openMenu() {
    this.store.dispatch(new UpdateMenuStatus(true));
  }
  async calculator() {
    await this.navigation.navigateFlip('calculator');
  }
  async details() {
    await this.navigation.navigateFadeOut('home/details');
  }
}

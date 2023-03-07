import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CardMenuComponent } from 'src/app/components/card-menu/card-menu.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { UpdateMenuStatus } from 'src/app/store/menu/menu.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('cardMenu', { static: true }) cardMenu: CardMenuComponent;

  constructor(
    private navigation: NavigationService,
    private store: Store
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // console.log(this.cardMenu);
    // this.cardMenu.isOpen = false;
  }
  async settings() {
    await this.navigation.navigateFadeOut('settings/tabs/waiters');
  }
  async openMenu() {
    this.store.dispatch(new UpdateMenuStatus(true));
  }
  async calculator() {
    await this.navigation.navigateFlip('calculator');
  }
  async details($event: Event) {
    await this.navigation.navigateFadeOut('home/details');
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
}

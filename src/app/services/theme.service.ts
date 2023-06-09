import { Injectable, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ThemeActions } from '../store/theme/theme.action';
import { IStates } from '../models';
export const DARK_MODE = 'dark_mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  public darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkModeIcon: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private readonly ngUnsubscribe = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store,
  ) { }

  themeInit() {
    const isDarkMode = this.store.selectSnapshot<any>((state: IStates) => state.theme.isDarkMode);
    console.log(isDarkMode);
    if (isDarkMode) {
      this.document.body.classList.toggle('dark', true);
      this.darkMode.next(true);
      this.darkModeIcon.next('moon');
    } else {
      this.document.body.classList.toggle('dark', false);
      this.darkMode.next(false);
      this.darkModeIcon.next('sunny');
    }
  }
  changeTheme(ev: any) {
    this.store.dispatch(new ThemeActions.SetDarkMode(ev.detail.checked))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: IStates) => {
        console.log(state.theme.isDarkMode);
        if (state.theme.isDarkMode) {
          this.document.body.classList.toggle('dark', state.theme.isDarkMode);
          this.darkModeIcon.next('moon');
          this.darkMode.next(true);
        }
        if (!state.theme.isDarkMode) {
          this.document.body.classList.toggle('dark', state.theme.isDarkMode);
          this.darkModeIcon.next('sunny');
          this.darkMode.next(false);
        }
      });

    // this.ionStorage.storageSet(DARK_MODE, ev.detail.checked).then(() => {
    // });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}

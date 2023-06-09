import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { PointsState } from './store/points/point.state';
import { WaitersState } from './store/waiters/waiter.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LanguageState } from './store/language/language.state';
import { ResultState } from './store/result/result.state';
import { KeyboardState } from './store/keyboard/keyboard.state';
import { TutorialState } from './store/tutorial/tutorial.state';
import { ComponentsModule } from './components/components.module';
import { ThemeState } from './store/theme/theme.state';
import { MenuState } from './store/menu/menu.state';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
    NgxsModule.forRoot([
      PointsState,
      WaitersState,
      LanguageState,
      ResultState,
      KeyboardState,
      TutorialState,
      ThemeState,
      MenuState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: [
        'language',
        'point',
        'waiter',
        'resultList',
        // 'keyboard',
        'tutorial',
        'theme',
        // 'menu'
      ]
    }),
    ComponentsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

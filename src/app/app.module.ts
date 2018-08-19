import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { SlidesPage } from '../pages/slides/slides';
import { AvaliacaoFinalPage } from '../pages/avaliacao-final/avaliacao-final';
import { DadosContasPage } from '../pages/dados-contas/dados-contas';
import { ConfPagaPage } from '../pages/conf-paga/conf-paga';
import { CartaoPage } from '../pages/cartao/cartao';
import { AvaliacaoValorPage } from '../pages/avaliacao-valor/avaliacao-valor';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardIO } from '@ionic-native/card-io';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio'
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { MathematicalProvider } from '../providers/mathematical/mathematical';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { NgProgressModule } from '@ngx-progressbar/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    Login,
    SlidesPage,
    DadosContasPage,
    ConfPagaPage,
    CartaoPage,
    AvaliacaoValorPage,
    AvaliacaoFinalPage
  ],
  imports: [
    BrowserModule,
  //  BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    NgProgressModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    Login,
    SlidesPage,
    AvaliacaoFinalPage,
    ConfPagaPage,
    CartaoPage,
    AvaliacaoValorPage,
    DadosContasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardIO,
    FingerprintAIO,
    File,
    FileOpener,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MathematicalProvider,
    Camera
  ]
})
export class AppModule {}

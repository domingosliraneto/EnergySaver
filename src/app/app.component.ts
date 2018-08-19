import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
// import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  // pages: Array<{title: string, component: any}>;

  items = [
    {
      title: 'Pagamento Confirmado',
      content: 'Olá Domingos, o seu pagamento foi confirmado, e seus dados estão disponives da área do cliente.',
      icon: 'md-done-all',
      time: {subtitle: 'Fevereiro', title: '19'}
    },
    {
      title: 'Hora do Café',
      content: 'Olá Domingos, obrigado por contratar nosso serviço, seu pagamento foi efetuado e estamos aguardando a confirmação de terceiros, enquanto isso vamos tomar um café.',
      icon: 'ios-cafe-outline',
      time: {subtitle: 'Fevereiro', title: '18'}
    },
    {
      title: 'Primeiros Passos',
      content: 'Domingos, seus dados empresarias foram cadastrados com cucesso, aguardamos o pagamento, para que seus dados sejam liberados.',
      icon: 'md-paper-plane',
      time: {subtitle: 'Fevereiro', title: '18'}
    },
    {
      title: 'Cadastro',
      content: 'Olá Domingos, Benvindo ao Energy Saver. Estamos dispostos a melhorar e economizar sua energia eletrica. Esta disposto a se livrar de tarifas abusicas?',
      icon: 'ios-thumbs-up',
      time: {subtitle: 'Fevereiro', title: '15'}
    }
  ]
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   //{ title: 'Home', component: HomePage },
    //   //{ title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

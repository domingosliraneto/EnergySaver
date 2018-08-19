import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'
import { NgProgress } from '@ngx-progressbar/core';

import { AvaliacaoValorPage } from '../avaliacao-valor/avaliacao-valor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Convertendo imagem...'
    });
    loader.present();
    Tesseract.recognize(this.srcImage)
    .progress(message => {
      if (message.status === 'recognizing text')
      this.progress.set(message.progress);
    })
    .catch(err => console.error(err))
    .then(result => {
      alert(result.text);
    })
    .finally(resultOrError => {
      this.progress.complete();
      loader.dismissAll();
    });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

  goToAvaliar() {
    this.navCtrl.push(AvaliacaoValorPage);
  }

}

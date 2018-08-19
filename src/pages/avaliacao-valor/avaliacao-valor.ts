import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavParams, IonicPage ,NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'
import { NgProgress } from '@ngx-progressbar/core';

import { CartaoPage } from '../cartao/cartao';

@IonicPage()
@Component({
  selector: 'page-avaliacao-valor',
  templateUrl: 'avaliacao-valor.html',
})
export class AvaliacaoValorPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  srcImage: string;
  OCRAD: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public progress: NgProgress) {
  }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
            datasets: [{
                label: '# Contratada',
              data: [3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400],
                backgroundColor: [
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)',
                    'rgba(102, 181, 255, 0.4)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            },{
                  label: '# Consumida',
                  data: [4679, 4046, 3493, 3969, 3632, 3768, 4032, 3877, 4473, 4031, 4287, 3235],
                  backgroundColor: [
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(230, 0, 0, 0.4)',
                    'rgba(0, 179, 60, 0.4)',
                  ],
                  borderColor: [
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(230, 0, 0, 1)',
                    'rgba(0, 179, 60, 1)',
                  ],
                  borderWidth: 1
            },{
                label: '# Ideal',
                data: [3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960],
                backgroundColor: [
                  'rgba(230, 184, 0, 0.4)',
                ],
                borderColor: [
                  'rgba(230, 184, 0, 1)',
                ],
                type: 'line'
            }
          ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Escolher Foto',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Tirar Foto',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demonstração',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
          }
        },{
          text: 'Cacelar',
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

  goToCard() {
    this.navCtrl.push(CartaoPage);
  }

}

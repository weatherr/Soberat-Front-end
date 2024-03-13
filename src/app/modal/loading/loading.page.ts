import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  @Input() modalCtrl: ModalController;
  @Input() timeForDismiss: number;


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.dismiss();
  }, this.timeForDismiss); // 500
  }

}

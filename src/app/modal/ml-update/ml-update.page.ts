import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DrinkService } from '../../drink.service';
import { NormalDrink } from '../../normalDrink';

@Component({
  selector: 'app-ml-update',
  templateUrl: './ml-update.page.html',
  styleUrls: ['./ml-update.page.scss'],
})
export class MlUpdatePage implements OnInit {

  @Input() drinkId: number;
  @Input() userId: number;
  @Input() currentML: number;
  @Input() normals: NormalDrink[];
  @Input() modalCtrl: ModalController;

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  constructor(public modalController: ModalController, private drinkService: DrinkService) { }

  changeVolume(mL): void // for the Box with numbers
  {
    const mLnumber: number = +mL;
    if (mLnumber != 0 && mLnumber > 0)
    {
      this.drinkService.changeQuantityNormal(mLnumber, this.drinkId, this.userId).subscribe(
        data => {
          console.log('Successfully changed volume!');
          const updDrinkQuantity: number = +mL;
          const updateItem = this.normals.find(e => e.id === this.drinkId);
          updateItem[`mL`] = updDrinkQuantity;
          this.dismiss();
          // this.errors = null;
        },
        error => {
          // this.errors = error.error;
          // // set back the previous value
          // const updateItem = this.normals.find(e => e.id === this.drinkId);
          // console.log(updateItem);
          // console.log(updateItem[`mL`]);
          // updateItem[`mL`] = updateItem[`mL`];
        }
      );
    }
  }

  ngOnInit() {
  }

}

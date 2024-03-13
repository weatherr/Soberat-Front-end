import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DrinkService } from '../../drink.service';
import { NormalDrink } from '../../normalDrink';

@Component({
  selector: 'app-abv-update',
  templateUrl: './abv-update.page.html',
  styleUrls: ['./abv-update.page.scss'],
})
export class AbvUpdatePage implements OnInit {

  @Input() drinkId: number;
  @Input() userId: number;
  @Input() currentABV: number;
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

  changeABV(abv): void // for the Box with numbers
  {
    const abvNumber: number = +abv;
    if (abvNumber != 0 && abvNumber > 0 && abvNumber <= 100)
    {
      this.drinkService.changeABV(abvNumber, this.drinkId, this.userId).subscribe(
        data => {
          console.log('Successfully changed abv!');
          const updDrinkQuantity: number = +abv;
          const updateItem = this.normals.find(e => e.id === this.drinkId);
          updateItem[`abv`] = updDrinkQuantity;
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

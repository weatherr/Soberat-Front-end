import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DrinkService } from '../../drink.service';
import { Drink } from '../../drink';

@Component({
  selector: 'app-quantity-update',
  templateUrl: './quantity-update.page.html',
  styleUrls: ['./quantity-update.page.scss'],
})
export class QuantityUpdatePage implements OnInit {

  @Input() drinkId: number;
  @Input() userId: number;
  @Input() currentQuantity: number;
  @Input() drinks: Drink[];
  @Input() modalCtrl: ModalController;

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  constructor(public modalController: ModalController, private drinkService: DrinkService) { }

  changeQuantity(quantity): void{
    const quantityNum: number = +quantity;
    if (quantityNum != 0 && quantityNum > 0)
    {
      // console.log('fasdfasdfasdf');
      this.drinkService.changeQuantity(quantityNum, this.drinkId, this.userId).subscribe(
        data => {
          console.log('Successfully changed quantity!');
          const updDrinkQuantity: number = +quantity;
          const updateItem = this.drinks.find(e => e.id === this.drinkId);
          updateItem[`quantity`] = updDrinkQuantity;
          this.dismiss();
          // this.errors = null;
        },
        error => {
          // this.errors = error.error;
          // // set back the previous value
          // const updateItem = this.drinks.find(e => e.id === this.drinkId);
          // console.log(updateItem);
          // console.log(updateItem[`quantity`]);
          // updateItem[`quantity`] = updateItem[`quantity`];
        }
      );
    }
  }

  ngOnInit() {
  }

}

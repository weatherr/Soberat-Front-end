import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';
import { User } from '../user';
import { NormalDrink } from '../normalDrink';
import { DrinkService } from '../drink.service';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';
import { AuthService } from './../shared/auth.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Platform } from '@ionic/angular';
// Modal
import { ModalController } from '@ionic/angular';
import { CalculatePage } from '../modal/calculate/calculate.page';
import { QuantityUpdatePage } from '../modal/quantity-update/quantity-update.page';
import { LoadingPage } from '../modal/loading/loading.page';
import { MlUpdatePage } from '../modal/ml-update/ml-update.page';
import { AbvUpdatePage } from '../modal/abv-update/abv-update.page';

export class soberAt{
  hoursNeeded: string;
  soberAt: string;
  animation: string;
  bac: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  searching = true;
  drinks: Drink[];
  drinks$: Observable<Drink[]>;
  private searchTerms = new Subject<string>();
  user: User;
  sober: soberAt;
  normalList: NormalDrink[];
  // selectedNormal: NormalDrink = {id: 15, name: 'beer', mL: 0, img: '', mainColor: '', secondaryColor: ''};
  errors = null;
  showQuantityInput = 0;
  showMLInput = false;
  showSpinner = true;

  hideCalculate = false;
  deviceHeight: number;
  deviceWidth: number;

  selectedDrink: Drink; // keeping it for the details under the list
  onSelect(drink: Drink): void {
    this.selectedDrink = drink;
  }
  focusFunction(): void
  {
    this.errors = null;
  }
  changeShow(id: number): void{
    // this.showQuantityInput = true;
    this.showQuantityInput = id;
  }
  searchFocused(): void
  {
    this.searching = true;
  }

  revertShow(id: number): void{
    this.showQuantityInput = 0;
  }

  getDrinks(userId: number): void {
    this.drinkService.getDrinksHttp(userId)
    .subscribe(drinks => this.drinks = drinks);
  }

  getNormalCart(userId: number): void {
    this.drinkService.getNormalCart(userId)
    .subscribe(normalList => this.normalList = normalList);
  }

  async changeABVmodal(id: number, currABV: number) {
    const modal = await this.modalController.create({
      component: AbvUpdatePage,
      cssClass: 'testingModal',
      componentProps: {
        modalCtrl: this.modalController,
        drinkId: id,
        userId: this.user.id,
        normals: this.normalList,
        currentABV: currABV
      }
    });
    return await modal.present();
  }

  changeABV(id: number, currentABV: number):void
  {
    // console.log(normal);
    this.changeABVmodal(id, currentABV);
  }

  changeVolume(mL: number, drinkId: number): void // for the Box with numbers
  {
    // console.log(mL);
    this.drinkService.changeQuantityNormal(mL, drinkId, this.user.id).subscribe(
      data => {
        console.log('Successfully changed volume!');
        const updDrinkQuantity: number = +mL;
        const updateItem = this.normalList.find(e => e.id === drinkId);
        updateItem[`mL`] = updDrinkQuantity;
        this.errors = null;
      },
      error => {
        this.errors = error.error;
        // set back the previous value
        const updateItem = this.normalList.find(e => e.id === drinkId);
        // console.log(updateItem);
        // console.log(updateItem[`mL`]);
        updateItem[`mL`] = updateItem[`mL`];
      }
    );
  }

  async changQuantityModal(id: number, currquantity: number) {
    const modal = await this.modalController.create({
      component: QuantityUpdatePage,
      cssClass: 'testingModal',
      componentProps: {
        modalCtrl: this.modalController,
        drinkId: id,
        userId: this.user.id,
        drinks: this.drinks,
        currentQuantity: currquantity
      }
    });
    return await modal.present();
  }

  changeQuantityAsd(id: number, currentQuantity: number){
    this.changQuantityModal(id, currentQuantity);
  }

  async changeMLmodal(id: number, currML: number) {
    const modal = await this.modalController.create({
      component: MlUpdatePage,
      cssClass: 'testingModal',
      componentProps: {
        modalCtrl: this.modalController,
        drinkId: id,
        userId: this.user.id,
        normals: this.normalList,
        currentML: currML
      }
    });
    return await modal.present();
  }

  changeMLAsd(id: number, currentML: number){
    this.changeMLmodal(id, currentML);
  }

  changeQuantity(drink: Drink, quantity: number): void{
    // console.log(quantity);
    // if (quantity != '' && quantity != 0 && quantity != undefined){
      // console.log('double trouble');
      this.drinkService.changeQuantity(quantity, drink.id, this.user.id).subscribe(
        data => {
          console.log('Successfully changed quantity!');
          const updDrinkQuantity: number = +quantity;
          const updateItem = this.drinks.find(e => e.id === drink.id);
          updateItem[`quantity`] = updDrinkQuantity;
          this.errors = null;
        },
        error => {
          this.errors = error.error;
          // set back the previous value
          const updateItem = this.drinks.find(e => e.id === drink.id);
          // console.log(updateItem);
          // console.log(updateItem[`quantity`]);
          updateItem[`quantity`] = updateItem[`quantity`];
        }
      );
      // this.hideCalculate = false;
    // }else{
    //   this.hideCalculate = true;
    // }
  }

  plus(drink: Drink): void{
    const updateItem = this.drinks.find(e => e.id === drink.id);
    const newQ = drink.quantity + 1;
    updateItem[`quantity`] = newQ;
    this.drinkService.changeQuantity(newQ, drink.id, this.user.id).subscribe();
  }

  minus(drink: Drink): void{
    const updateItem = this.drinks.find(e => e.id === drink.id);
    const newQ = drink.quantity - 1;
    if (newQ === 0)
    {
      this.delete(drink);
    }else{
      updateItem[`quantity`] = newQ;
      this.drinkService.changeQuantity(newQ, drink.id, this.user.id).subscribe();
    }
  }

  add(id: number): void {
    if (id <= 100)
    {
      this.addNormal(id, 100);
    }else{
      let isItemInCart = this.drinks.find(e => e.id == id);
      if (isItemInCart === undefined)
      {
        this.drinkService.addDrink(id, this.user.id)
        .subscribe(drink => {
          this.drinks.push(drink);
          this.searching = false;
        });
      }else{
        isItemInCart[`quantity`] += 1;
        this.drinkService.changeQuantity(isItemInCart[`quantity`], id, this.user.id).subscribe();
        this.searching = false;
      }
    }
  }

  addNormal(id: number, amount: number): void{
    let isItemInCart = this.normalList.find(e => e.id == id);
    if (isItemInCart === undefined)
    {
      this.drinkService.addDrinkNormal(id, this.user.id, amount)
      .subscribe(drink => {
          console.log(drink);
          this.normalList.push(drink);
          this.searching = false;
        }, error => {
          console.log(error.error);
          this.errors = error.error;
        }
      );
    }else{
      if (+amount == 0)
      {
        this.drinkService.getVolumeError().subscribe(
          data => {
          },
          error => {
            this.errors = error.error;
          }
        );
      }else{
        isItemInCart[`mL`] += +amount;
        this.drinkService.changeQuantityNormal(isItemInCart[`mL`], id, this.user.id).subscribe();
        this.searching = false;
      }
    }
  }

  delete(drink: Drink): void {
    this.drinks = this.drinks.filter(d => d !== drink); // vrushta ot array vsichki bez toq
    // if(this.normalList == [] && this.drinks == [])
    this.drinkService.deleteDrink(drink, this.user.id).subscribe();
    if (this.drinks.length == 0 && this.normalList.length == 0){
      this.clearList();
    }
  }

  deleteNormal(drink: NormalDrink): void {
    this.normalList = this.normalList.filter(d => d !== drink); // vrushta ot array vsichki bez toq
    this.drinkService.deleteNormalDrink(drink, this.user.id).subscribe();
    if (this.drinks.length == 0 && this.normalList.length == 0){
      this.clearList();
    }
  }

  clearList(): void
  {
    this.drinks = [];
    this.normalList = [];
    this.drinkService.clearList(this.user.id).subscribe();
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.searching = true;
  }

  calculate(): void
  {
    const getDatetime = new Date();
    // console.log(getDatetime.toLocaleString('en-GB'));
    this.drinkService.calculate(this.user.id, getDatetime.toLocaleString('en-GB')).subscribe(res => {
      this.sober = res;
      // console.log(res);
      this.calculateModal(res);
    });
  }

  constructor(private drinkService: DrinkService, private authService: AuthService, platform: Platform,
              public modalController: ModalController) {
    platform.ready().then(() => {
      this.deviceHeight = platform.height();
      this.deviceWidth = platform.width();
    });
  }

  async loadingModal() {
    const modal = await this.modalController.create({
      component: LoadingPage,
      cssClass: 'loadingModal',
      componentProps: {
        modalCtrl: this.modalController,
        timeForDismiss: 500
      }
    });
    this.showSpinner = false;
    return await modal.present();
  }

  async calculateModal(sober: soberAt) {
    const modal = await this.modalController.create({
      component: CalculatePage,
      // cssClass: 'tabletCalculateModal',
      componentProps: {
        hoursNeeded: sober.hoursNeeded,
        soberAt: sober.soberAt,
        animation: sober.animation,
        bac: sober.bac,
        modalCtrl: this.modalController
      }
    });
    return await modal.present();
  }

  ionViewWillEnter()
  {
    this.authService.userData().subscribe((data: any) => {
      this.user = data;
      this.getDrinks(this.user.id);
      this.getNormalCart(this.user.id);
    });
  }

  ngOnInit() {
    // if (this.showSpinner === true)
    // {
      // this.loadingModal();
    // }

    this.drinks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.drinkService.searchDrinks(term)),
    );
  }

}

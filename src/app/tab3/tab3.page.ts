import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../drink.service';
import { AuthService } from './../shared/auth.service';
import { User } from '../user';
import { TopDrink } from '../topdrink';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoadingPage } from '../modal/loading/loading.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  drinks: TopDrink[];
  user: User;
  isClicked: boolean = false;
  hasTenCharDrink: boolean = false; //finish this
  deviceHeight: number;
  deviceWidth: number;
  showSpinner = true;
  constructor(private drinkService: DrinkService, private authService: AuthService, platform: Platform,
              public modalController: ModalController) {
    platform.ready().then(() => {
      this.deviceHeight = platform.height();
      this.deviceWidth = platform.width();
    });
   }

  getTopDrinks(userId: number): void {
    this.drinkService.getFavouriteDrinks(this.user.id)
      .subscribe(drinks => {
        this.drinks = drinks;
        const search = drinks.find(e => e.name.length > 10);
        if(search !== undefined)
        {
          this.hasTenCharDrink = true;
        }
      });
  }

  clicked(): void
  {
    this.isClicked = true;
    // console.log(this.isClicked);
    // console.log(this.drinks);
  }

  ionViewWillEnter()
  {
    this.authService.userData().subscribe((data: any) => {
      this.user = data;
      this.getTopDrinks(this.user.id);
    });
  }

  async loadingModal() {
    const modal = await this.modalController.create({
      component: LoadingPage,
      cssClass: 'loadingModal',
      componentProps: {
        modalCtrl: this.modalController,
        timeForDismiss: 1500
      }
    });
    this.showSpinner = false;
    return await modal.present();
  }

  ngOnInit(): void {
    if (this.showSpinner === true)
    {
      this.loadingModal();
    }
  }
}

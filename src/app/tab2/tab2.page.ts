import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';
import { NormalDrink } from '../normalDrink';
import { Session } from '../session';
import { DrinkService } from '../drink.service';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';
import { AuthService } from './../shared/auth.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { User } from '../user';
import { ModalController } from '@ionic/angular';
import { LoadingPage } from '../modal/loading/loading.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  user: User;
  sessions: Session[];
  cocktails$: Observable<Drink[]>;
  normalDrinks$: Observable<NormalDrink[]>;
  private searchTerms = new Subject<number>();
  selectedDrink: Drink;
  isDisabled = false;
  showSpinner = true;

  currentCocktails: Drink[];
  currentNormalDrinks: NormalDrink[];

  constructor(private drinkService: DrinkService, private authService: AuthService, public modalController: ModalController) { }

  selectedSession: Session;
  onSelect(session: Session): void {
    this.selectedSession = session;
    this.drinkService.getSessionsCocktails(session.id)
    .subscribe(drinks => {
      this.currentCocktails = drinks;
    });
    this.drinkService.getSessionsNormalDrinks(session.id)
    .subscribe(drinks => this.currentNormalDrinks = drinks);
    this.isDisabled = true;
  }

  onDrinkSelect(drink: Drink): void {
    this.selectedDrink = drink;
  }

  getPreviousSessions(userId: number): void
  {
    this.drinkService.getPrevSessions(userId)
    .subscribe(sessions => this.sessions = sessions);
  }

  deleteSession(session: Session): void
  {
    // console.log(session.id);
    this.sessions = this.sessions.filter(d => d !== session);
    this.drinkService.deleteSession(session.id).subscribe();
  }

  ionViewWillEnter()
  {
    this.authService.userData().subscribe((data: any) => {
      this.user = data;
      this.getPreviousSessions(this.user.id);
    });
  }

  async loadingModal() {
    const modal = await this.modalController.create({
      component: LoadingPage,
      cssClass: 'loadingModal',
      componentProps: {
        modalCtrl: this.modalController,
        timeForDismiss: 1000
      }
    });
    this.showSpinner = false;
    return await modal.present();
  }

  ngOnInit(): void {
    if (this.showSpinner === true)
    {
      // this.initialSpinner();
      this.loadingModal();
    }
  }
}

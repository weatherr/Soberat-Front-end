import { Component, OnInit } from '@angular/core';
// for lottie
import { defineCustomElements } from '@teamhive/lottie-player/loader';
import { Storage } from '@ionic/storage';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

defineCustomElements(window);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dark = true;

  constructor(
              public storage: Storage,
              public authService: AuthService,
              // private token: TokenService,
              public router: Router,
              private authState: AuthStateService) {}


  updateDarkMode() {
    document.body.classList.toggle('dark', true);
  }

  ngOnInit() {
    this.storage.get('email').then((val) => {
      // console.log('Your age is:');
      // console.log(val);
      if (val !== null && val !== undefined)
      {
        // user.weight = 0;
        // console.log('YEEEEEEEEEEEEE');
        this.authService.signin(val).subscribe(
          () => {
            this.authState.setAuthState(true);
            this.router.navigate(['afterLogin']);
          }
        );
      }
    });

    // this.ionViewWillEnter();

    // const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    // this.dark = prefersColor.matches;
    // this.updateDarkMode();
  }
}

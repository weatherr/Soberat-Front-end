import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// for lottie
// import { defineCustomElements } from '@teamhive/lottie-player/loader';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// defineCustomElements(window);

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  dark = true;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    public alertController: AlertController,
    public storage: Storage
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }

  updateDarkMode() {
    document.body.classList.toggle('dark', true);
  }

  ngOnInit() {
    // const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
    // this.dark = prefersColor.matches;
    // this.updateDarkMode();
   }

  // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        this.errors = error.error;
      }, () => {
        this.storage.set('email', this.loginForm.value);
        this.authState.setAuthState(true);
        this.router.navigate(['afterLogin']);
      }
    );
  }
}

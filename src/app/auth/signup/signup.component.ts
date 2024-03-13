import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
//Disclaimer
import { ModalController } from '@ionic/angular';
import { DisclaimerPage } from '../../modal/disclaimer/disclaimer.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors = null;
  selectedValue: string;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    public modalController: ModalController,
    public storage: Storage
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      weight: [''],
      weightType: [''],
      gender: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  focusFunction(): void
  {
    this.errors = null;
  }

  kg(){
    this.selectedValue = 'kg';
  }

  pounds(){
    this.selectedValue = 'lb/pounds';
  }

  ngOnInit() {
    this.selectedValue = 'lb/pounds'; // says it's deprecated
    // this.disclaimer();
  }

   async disclaimer() {
    const modal = await this.modalController.create({
      component: DisclaimerPage,
      // cssClass: 'my-custom-class',
      componentProps: {
        modalCtrl: this.modalController
      }
    });
    return await modal.present();
  }

  onSubmit() {
    this.registerForm.patchValue({
      weightType: this.selectedValue
    });
    // console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        // console.log(result);
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.disclaimer();
        // console.log('Reg form test:');
        // console.log(this.registerForm.value);
        // this.storage.set('email', this.registerForm.value);
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }

}

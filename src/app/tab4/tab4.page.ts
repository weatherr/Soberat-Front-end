import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { User } from '../user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';
import { ModalController } from '@ionic/angular';
import { LoadingPage } from '../modal/loading/loading.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  UserProfile: User;
  clickedEdit = false;
  oldEmail: string;
  errors = null;
  editForm: FormGroup;
  selectedValue: string;
  showSpinner = true;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private auth: AuthStateService,
    public token: TokenService,
    public modalController: ModalController,
    public storage: Storage
  ) {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      weight: [''],
      weightType: [''],
      gender: [''],
    });
  }

  clicked(): void{
    this.clickedEdit = true;
  }

  // testing
  focusFunction(): void
  {
    // console.log('asdsd');
    this.errors = null;
  }

  kg(){
    this.selectedValue = 'kg';
  }

  pounds(){
    this.selectedValue = 'lb/pounds';
  }

  cancel(){
    this.clickedEdit = false;
  }

  onSubmit(){
    this.editForm.patchValue({
      weightType: this.selectedValue
    });
    this.authService.edit(this.editForm.value, this.oldEmail).subscribe(
      data => { // this is a successful return
        this.clickedEdit = false;
        this.oldEmail = this.UserProfile.email;
        this.UserProfile = this.editForm.value;
        this.errors = null;
      },
      error => {
        this.errors = error.error;
      });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.storage.remove('email');
    this.router.navigate(['home']);
  }

  ionViewWillEnter()
  {
    this.authService.userData().subscribe((data: any) => {
      this.UserProfile = data;
      this.oldEmail = this.UserProfile.email;
      this.selectedValue = this.UserProfile.weightType;
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

  ngOnInit() {
    if (this.showSpinner === true)
    {
      this.loadingModal();
    }
   }

}

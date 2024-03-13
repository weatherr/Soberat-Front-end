import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbvUpdatePageRoutingModule } from './abv-update-routing.module';

import { AbvUpdatePage } from './abv-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbvUpdatePageRoutingModule
  ],
  declarations: [AbvUpdatePage]
})
export class AbvUpdatePageModule {}

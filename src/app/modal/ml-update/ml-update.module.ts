import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MlUpdatePageRoutingModule } from './ml-update-routing.module';

import { MlUpdatePage } from './ml-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MlUpdatePageRoutingModule
  ],
  declarations: [MlUpdatePage]
})
export class MlUpdatePageModule {}

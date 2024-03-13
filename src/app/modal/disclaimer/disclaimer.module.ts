import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisclaimerPageRoutingModule } from './disclaimer-routing.module';

import { DisclaimerPage } from './disclaimer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisclaimerPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DisclaimerPage]
})
export class DisclaimerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuantityUpdatePageRoutingModule } from './quantity-update-routing.module';

import { QuantityUpdatePage } from './quantity-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuantityUpdatePageRoutingModule
  ],
  declarations: [QuantityUpdatePage]
})
export class QuantityUpdatePageModule {}

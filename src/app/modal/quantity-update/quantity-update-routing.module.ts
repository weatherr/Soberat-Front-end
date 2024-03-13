import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuantityUpdatePage } from './quantity-update.page';

const routes: Routes = [
  {
    path: '',
    component: QuantityUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuantityUpdatePageRoutingModule {}

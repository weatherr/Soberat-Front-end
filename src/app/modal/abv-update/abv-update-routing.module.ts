import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbvUpdatePage } from './abv-update.page';

const routes: Routes = [
  {
    path: '',
    component: AbvUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbvUpdatePageRoutingModule {}

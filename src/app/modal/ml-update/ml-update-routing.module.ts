import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MlUpdatePage } from './ml-update.page';

const routes: Routes = [
  {
    path: '',
    component: MlUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MlUpdatePageRoutingModule {}

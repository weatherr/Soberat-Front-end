import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';

// auth
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'afterLogin', redirectTo: 'tabs/tabs/tab1', pathMatch: 'full' }, //tova callva dolnoto
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'detail/:id', component: DrinkDetailComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calculate',
    loadChildren: () => import('./modal/calculate/calculate.module').then( m => m.CalculatePageModule)
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./modal/disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule)
  },
  {
    path: 'quantity-update',
    loadChildren: () => import('./modal/quantity-update/quantity-update.module').then( m => m.QuantityUpdatePageModule)
  },
  {
    path: 'ml-update',
    loadChildren: () => import('./modal/ml-update/ml-update.module').then( m => m.MlUpdatePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./modal/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./modal/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'abv-update',
    loadChildren: () => import('./modal/abv-update/abv-update.module').then( m => m.AbvUpdatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

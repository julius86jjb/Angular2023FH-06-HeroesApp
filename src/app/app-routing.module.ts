import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuardActivated, authGuardMatch } from './auth/guards/auth-functional.guard';
import { publicGuardActivate, publicGuardMatch } from './auth/guards/public-functional.guard';


const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule),
  //   // canActivate: [ publicGuardActivate ],
  //   // canMatch: [publicGuardMatch]
  // },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then (m => m.HeroesModule),
    // canActivate: [ authGuardActivated ],
    // canMatch: [authGuardMatch]
  },
  {path: '404', component: Error404PageComponent},
  {path: '', redirectTo: 'heroes', pathMatch: 'full'},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

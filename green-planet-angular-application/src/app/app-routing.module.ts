import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './features/products/pages/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingPageComponent},
  {path: 'home', component: LandingPageComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './products/pages/landing-page/landing-page.component';
import { LoginComponent } from './user/pages/login/login.component';
import { RegisterComponent } from './user/pages/register/register.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user/user-routing.module';
import { ProductCardComponent } from './products/components/product-card/product-card.component';
import CartComponent from './products/pages/cart/cart.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { ProductDetailsComponent } from './products/pages/product-details/product-details.component';
import { ProductsCatalogComponent } from './products/pages/products-catalog/products-catalog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './user/pages/logout/logout.component';

 

@NgModule({
  declarations: [
    // products features
    LandingPageComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    // user features
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    UserRoutingModule,
    ProductsRoutingModule
  ],
  exports: [
    // products features
    LandingPageComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    // user features
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    LogoutComponent,
  ]
})
export class FeaturesModule { }

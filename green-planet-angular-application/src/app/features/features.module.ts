import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './products/pages/landing-page/landing-page.component';
import { LoginComponent } from './user/pages/login/login.component';
import { RegisterComponent } from './user/pages/register/register.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user/pages/user-routing.module';
import { ProductCardComponent } from './products/components/product-card/product-card.component';
import { CartComponent } from './user/pages/cart/cart.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { ProductDetailsComponent } from './products/pages/product-details/product-details.component';
import { ProductsCatalogComponent } from './products/pages/products-catalog/products-catalog.component';
import { FormsModule } from '@angular/forms';

 

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
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UserRoutingModule,
    ProductsRoutingModule
  ],
  exports: [
    // products features
    LandingPageComponent,
    ProductDetailsComponent,
    ProductsCatalogComponent,
    // user features
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,]
})
export class FeaturesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContinueOrderComponent } from './pages/continue-order/continue-order.component';
import { OrderConfirmedComponent } from './pages/order-confirmed/order-confirmed.component';

const routes: Routes = [
  { path: 'continue-order', component: ContinueOrderComponent},
  { path: 'order-confirmed', component: OrderConfirmedComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

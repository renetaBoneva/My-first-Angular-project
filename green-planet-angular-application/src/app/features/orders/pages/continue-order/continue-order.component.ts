import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.development';
import { OrderProduct } from 'src/app/features/products/types/OrderProduct';
import { UserService } from 'src/app/features/user/services/user-service.service';

@Component({
  selector: 'app-continue-order',
  templateUrl: './continue-order.component.html',
  styleUrls: ['./continue-order.component.css']
})
export class ContinueOrderComponent implements OnInit {
  cartProducts: OrderProduct[] | undefined;
  orderTotal: number = 0;

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    firstName: ["", [Validators.required, Validators.minLength(2)]],
    lastName: ["", [Validators.required, Validators.minLength(2)]],
    address: ["", [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (this.isLogged) {
      // for logged users
      if (!this.userService.user?.myCart || this.userService.user?.myCart.length <= 0) {
        this.router.navigate(['/catalog'])
      }
      this.cartProducts = this.userService.user?.myCart;

      this.userService.getUserDetails()
      this.userService.userDetails$.subscribe({
        next: (userDetails) => {
          this.form.setValue({
            email: userDetails?.email ? userDetails?.email : '',
            firstName: userDetails?.firstName ? userDetails?.firstName : "",
            lastName: userDetails?.lastName ? userDetails?.lastName : "",
            address: userDetails?.address ? userDetails?.address : "",
          })
        }
      })
    } else {
      // for unlogged users
      const lsData = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);
      if (lsData) {
        const lsJSON = JSON.parse(lsData);
        this.cartProducts = lsJSON;
      }
    }
    this.sumOrderTotal()
  }
  get isLogged() {
    return this.userService.isLogged;
  }

  get userDetails() {
    return this.userService.userDetails;
  }


  sumOrderTotal() {
    this.orderTotal = 0;
    this.cartProducts?.map(p => this.orderTotal += p.price * p.count);
  }

  finishOrder() {
    if (this.form.invalid) {
      return;
    }

    const madeOnDate = new Date();
    if (this.form.value.address && this.cartProducts) {
      this.userService.makeOrder(madeOnDate, this.form.value.address, this.cartProducts, this.orderTotal);
    }
  }
}

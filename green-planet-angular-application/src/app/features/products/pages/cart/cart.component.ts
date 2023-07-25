import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../../types/OrderProduct';
import { environment } from 'src/environments/environment.development';
import { UserService } from 'src/app/features/user/services/user-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: OrderProduct[] = [];
  areProducts: boolean = false;
  orderTotal: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCartProductsLocalStorage()
  }

  getCartProductsLocalStorage() {
    if (this.userService.isLogged) {
      // for logged users
      const lsData = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);

      if (lsData) {
        const lsJSON = JSON.parse(lsData);
        this.cartProducts = lsJSON.myCart;
      }
    }
    else {
      // for unlogged users
      const lsData = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);
      if (lsData) {
        const lsJSON = JSON.parse(lsData);
        this.cartProducts = lsJSON;
      }
    }

    this.cartProducts.length > 0
      ? this.areProducts = true
      : this.areProducts;

    if (this.areProducts) {
      this.cartProducts.map(p => this.orderTotal += p.price * p.count);
    }
  }
}

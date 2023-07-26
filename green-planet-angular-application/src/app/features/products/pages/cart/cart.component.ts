import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../../types/OrderProduct';
import { environment } from 'src/environments/environment.development';
import { UserService } from 'src/app/features/user/services/user-service.service';
import { ProductsCountService } from '../../services/productsCount.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export default class CartComponent implements OnInit {
  cartProducts: OrderProduct[] = [];
  areProducts: boolean = false;
  orderTotal: number = 0;

  constructor(
    private userService: UserService,
    private productsCountService: ProductsCountService,
  ) { }

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

    this.checkAreProducts();
    this.sumOrderTotal();
  }

  addProductToCart(product: OrderProduct) {
    this.productsCountService.addProductToCart(product);
    this.cartProducts.map(p => p._id === product._id ? p.count++ : p)
    this.sumOrderTotal();
  }

  removeProductFromCart(product: OrderProduct) {
    this.productsCountService.removeProductFromCart(product);
    this.cartProducts = this.productsCountService.handleCartOnRemove(this.cartProducts, product);
    this.checkAreProducts();
    this.sumOrderTotal();
  }

  sumOrderTotal() {
    this.orderTotal = 0;
    this.cartProducts.map(p => this.orderTotal += p.price * p.count);
  }

  checkAreProducts() {
    this.cartProducts.length > 0
      ? this.areProducts = true
      : this.areProducts = false;
  }
}

import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { OrderProduct } from '../types/OrderProduct';
import { UserLocalStorage } from '../../user/types/UserLocalStorage';
import { UserService } from '../../user/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsCountService {

  constructor(private userService: UserService) { }

  addProductToCart(product: OrderProduct) {
    if (this.userService.isLogged) {
      // for logged users
      const jsUser = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
      if (jsUser) {
        let userData: UserLocalStorage = JSON.parse(jsUser);

        this.handleCartOnAdd(userData.myCart, product)

        localStorage.setItem(
          environment.USER_KEY_LOCAL_STORAGE,
          JSON.stringify(userData)
        )
      }
    } else {
      // for unlogged users
      const lsCart = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);

      let currentProduct: OrderProduct = { ...product, count: 1 };
      if (lsCart) {
        let cartData: OrderProduct[] = JSON.parse(lsCart);

        cartData = this.handleCartOnAdd(cartData, product)

        localStorage.setItem(
          environment.CART_KEY_LOCAL_STORAGE,
          JSON.stringify(cartData)
        )
      } else {
        // if the unlogged user add for first time in cart
        localStorage.setItem(
          environment.CART_KEY_LOCAL_STORAGE,
          JSON.stringify([currentProduct])
        )
      }
    }
  }

  removeProductFromCart(product: OrderProduct) {
    if (this.userService.isLogged) {
      // for logged users
      const jsUser = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
      if (jsUser) {
        let userData: UserLocalStorage = JSON.parse(jsUser);

        userData.myCart = this.handleCartOnRemove(userData.myCart, product)

        localStorage.setItem(
          environment.USER_KEY_LOCAL_STORAGE,
          JSON.stringify(userData)
        )
      }
    } else {
      // for unlogged users
      const lsCart = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);

      if (lsCart) {
        let cartData: OrderProduct[] = JSON.parse(lsCart);

        cartData = this.handleCartOnRemove(cartData, product)

        localStorage.setItem(
          environment.CART_KEY_LOCAL_STORAGE,
          JSON.stringify(cartData)
        )
      }
    }
  }

  handleCartOnAdd(cartData: OrderProduct[], product: OrderProduct): OrderProduct[] {
    let isAlreadyInCart = false;

    // check if this product is already added in the cart
    // if it is
    cartData.map(p => {
      if (p._id === product?._id) {
        isAlreadyInCart = true;
        p.count++
      }
    });

    // if it is not
    if (!isAlreadyInCart) {
      let currentProduct: OrderProduct = { ...product, count: 1 };
      cartData.push(currentProduct);
    }

    return cartData;
  }

  handleCartOnRemove(cartData: OrderProduct[], product: OrderProduct): OrderProduct[] {
    let isTimeToRemove: boolean = false;

    cartData.map(p => {
      if (p._id === product?._id) {
        if (p.count > 1) {
          p.count--
        } else {
          isTimeToRemove = true;
        }
      }
    });

    if (isTimeToRemove) {
      cartData = cartData.filter(p => p._id !== product?._id)
    }
    return cartData;
  }
}

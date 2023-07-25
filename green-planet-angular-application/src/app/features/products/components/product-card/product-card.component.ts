import { Component, Input, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLocalStorage } from 'src/app/features/user/types/UserLocalStorage';
import { ProductDetails } from '../../types/ProductDetails';
import { OrderProduct } from '../../types/OrderProduct';
import { UserService } from 'src/app/features/user/services/user-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: ProductDetails | undefined = undefined;

  constructor(private userService: UserService) { }

  addProductToCart() {

    if (this.userService.isLogged) {
      // for logged users
      const jsUser = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
      let isAlreadyInCart = false;

      if (jsUser && this.product !== undefined) {
        let userData: UserLocalStorage = JSON.parse(jsUser);

        // check if this product is already added in the cart
        // if it is
        userData.myCart.map(p => {
          if (p._id === this.product?._id) {
            isAlreadyInCart = true;
            p.count++
          }
        });

        // if it is not
        if (!isAlreadyInCart) {
          let currentProduct: OrderProduct = { ...this.product, count: 1 };
          userData.myCart.push(currentProduct);
        }

        localStorage.setItem(
          environment.USER_KEY_LOCAL_STORAGE,
          JSON.stringify(userData)
        )
      }
    } else {
      console.log('unlogged');

      // for unlogged users
      const lsCart = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);
      let isAlreadyInCart = false;

      if (this.product !== undefined) {
        let currentProduct: OrderProduct = { ...this.product, count: 1 };
        if (lsCart) {
          let cartData: OrderProduct[] = JSON.parse(lsCart);

          // check if this product is already added in the cart
          // if it is
          cartData.map(p => {
            if (p._id === this.product?._id) {
              isAlreadyInCart = true;
              p.count++
            }
          });

          // if it is not
          if (!isAlreadyInCart) {
            cartData.push(currentProduct);
          }

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
  }
}
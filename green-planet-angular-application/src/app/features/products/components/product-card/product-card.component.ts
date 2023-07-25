import { Component, Input, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserLocalStorage } from 'src/app/features/user/types/UserLocalStorage';
import { ProductDetails } from '../../types/ProductDetails';
import { OrderProduct } from '../../types/OrderProduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: ProductDetails | undefined = undefined;

  addProductToCart() {
    // todo: add real isAuth
    const jsUser = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
    const isAuth = !!localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);

    if (!!isAuth && jsUser && this.product !== undefined) {
      let userData: UserLocalStorage = JSON.parse(jsUser);
      let isAlreadyInCart = false;
      
      // check if this product is already added in the cart
      // if it is
      userData.myCart.map(p => {
        if(p._id === this.product?._id) {
          isAlreadyInCart = true;
          p.count++        
        }
      });

      // if it is not
      if(!isAlreadyInCart) {
        let currentProduct: OrderProduct = { ...this.product, count: 1 };
        userData.myCart.push(currentProduct);         
      } 
      
      localStorage.setItem(
        environment.USER_KEY_LOCAL_STORAGE,
        JSON.stringify(userData)
      )
    }
  }
}
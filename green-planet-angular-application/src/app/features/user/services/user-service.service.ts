import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { environment } from 'src/environments/environment.development';
import { db } from 'src/db.module';
import { UserLocalStorage } from '../types/UserLocalStorage';
import { UserDetails } from '../types/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserLocalStorage | undefined;

  constructor(private router: Router) {
    try {
      // Check if there is logged in user
      const lsUser = localStorage.getItem(environment.USER_KEY_LOCAL_STORAGE);
      if (lsUser) {
        this.user = JSON.parse(lsUser);
      }
    } catch (err) {
      this.user = undefined
    }
  }

  get isLogged() {
    return !!this.user;
  }

  logout(): void {
    const myCart = this.user?.myCart;
    localStorage.setItem(environment.CART_KEY_LOCAL_STORAGE, JSON.stringify(myCart))


    this.user = undefined;
    localStorage.removeItem(environment.USER_KEY_LOCAL_STORAGE)

    this.router.navigate(['/'])
  }

  login(form: NgForm) {
    // Temporary db TODO: get data from api service
    const usersDB: UserDetails[] | [] = db.users;
    const userFromDB = usersDB.filter(user => user.email == form.value.email && user.password == form.value.password);

    if (userFromDB.length === 1) {
      const { _id, email, myCart } = userFromDB[0];
      let lsUser: UserLocalStorage = { _id, email, myCart };
      lsUser = this.updateUserCartOnLogin(lsUser);

      localStorage.setItem(
        environment.USER_KEY_LOCAL_STORAGE,
        JSON.stringify(lsUser)
      );
      this.user = lsUser;
      this.router.navigate(['/'])
    } else {
      // todo: show server errors!   
      console.log('Invalid form');
    }
  }

  updateUserCartOnLogin(userData: UserLocalStorage): UserLocalStorage {
    const lsCartData = localStorage.getItem(environment.CART_KEY_LOCAL_STORAGE);

    if (lsCartData) {
      const lsCartArr = JSON.parse(lsCartData);
      userData.myCart.push(...lsCartArr);
      localStorage.removeItem(environment.CART_KEY_LOCAL_STORAGE)
    }
    return userData;
  }
}

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
export class UserService{
  user: UserLocalStorage | undefined;

  constructor(private router: Router) {
    try {
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

  logout():void {    
    this.user = undefined;
    localStorage.removeItem(environment.USER_KEY_LOCAL_STORAGE)
    this.router.navigate(['/'])
  }

  login(form: NgForm) {
    // Temporary db TODO: get data from api service
    // todo: show server errors!   
    const usersDB: UserDetails[] | [] = db.users;
    const userFromDB = usersDB.filter(user => user.email == form.value.email && user.password == form.value.password);

    if (userFromDB.length === 1) {
      // const jsUser: UserLocalStorage = userFromDB[0] as UserLocalStorage;
      const { _id, email, myCart } = userFromDB[0];
      const jsUser: UserLocalStorage = { _id, email, myCart };

      localStorage.setItem(
        environment.USER_KEY_LOCAL_STORAGE,
        JSON.stringify(jsUser)
      );
      this.user = jsUser;
    } else {
      console.log('Invalid form');
    }
    this.router.navigate(['/'])
  }
}

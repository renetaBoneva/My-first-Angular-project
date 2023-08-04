import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.development';
import { UserLocalStorage } from '../types/UserLocalStorage';
import { UserDetails } from '../types/UserDetails';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, catchError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user$$ = new BehaviorSubject<UserDetails | UserLocalStorage | undefined>(undefined);

  // user$ = this.user$$.asObservable();

  user: UserLocalStorage | undefined;
  CART_KEY_LS = environment.CART_KEY_LOCAL_STORAGE;
  USER_KEY_LS = environment.USER_KEY_LOCAL_STORAGE;
  // subscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router) {
    // this.subscription = this.user$.subscribe({
    //   next: (user) => { this.user = user; }
    // })

    try {
      // Check if there is logged in user
      const lsUser = localStorage.getItem(this.USER_KEY_LS);
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
    localStorage.setItem(this.CART_KEY_LS, JSON.stringify(myCart))

    // Server don't support user edit!!!
    this.http.get('/users/logout').pipe(
      switchMap(() => this.http.put('/users/me', { ...this.user }))
      ).subscribe({
        error: (err) => {
        // TODO HAndle error
        console.log(err)
      }
    })

    this.user = undefined;
    localStorage.removeItem(this.USER_KEY_LS)
    console.log('logged out');
    
    this.router.navigate(['/'])
  }

  login(email: string, password: string) {
    this.http
      .post<UserLocalStorage>('/users/login', { email, password })
      .subscribe({
        next: (user) => {
          // this.user$$.next(user)
          const { myCart, _id, accessToken } = { ...user }
          user = { myCart, _id, accessToken }
          const lsUser = this.updateUserCartOnLogin(user);

          localStorage.setItem(
            this.USER_KEY_LS,
            JSON.stringify(lsUser)
          );
          this.user = lsUser;
          console.log('logged in');
          this.router.navigate(['/'])
        },
        error: (err) => {
          // TODO HAndle error
          console.log(err)
        },

      })
  }

  register(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    rePass: string,
    address: string) {

    this.http.post<UserLocalStorage>('/users/register', {
      email,
      firstName,
      lastName,
      password,
      rePass,
      address
    }).subscribe({
      next: (user) => {
        const { myCart, _id, accessToken } = { ...user }
        user = { myCart, _id, accessToken }
        const lsUser = this.updateUserCartOnLogin(user);

        localStorage.setItem(
          this.USER_KEY_LS,
          JSON.stringify(lsUser)
        );
        this.user = lsUser;
        this.router.navigate(['/'])
      },
      error: (error) => {
        // TODO HAndle error
        console.log(error)
      }
    })
  }

  getUserDetails() {
    return this.http.get<UserDetails>(`/users/me`).pipe(
      catchError((err) => {
        // TODO HAndle error
        console.log(err.message);
        return [err]
      }
      )
    )
  }

  editUser(email: string, firstName: string, lastName: string, address: string) {
    // Practice server don't support user patch functionality!!!
    return this.http
      .put('/users/me', { email, firstName, lastName, address })
      .pipe(
        catchError((err) => {
          // TODO HAndle error
          console.log(err.message);
          return [err]
        })
      )
  }

  deleteUser() {
    // Server don't support user delete!!!
    this.http.delete('/users/me').pipe(
      switchMap(async () => this.logout())
    ).subscribe({
      error: (error) => {
        // TODO Handle error
        console.log(error)
      }      
    })
  }

  updateUserCartOnLogin(userData: UserLocalStorage): UserLocalStorage {
    const lsCartData = localStorage.getItem(this.CART_KEY_LS);

    if (userData.myCart) {
      // TODO: get user cart products
      console.log(userData.myCart);
    } else {
      userData.myCart = []
    }

    if (lsCartData) {
      const lsCartArr = JSON.parse(lsCartData);
      userData.myCart.push(...lsCartArr);
      localStorage.removeItem(this.CART_KEY_LS)
    }
    return userData;
  }

}


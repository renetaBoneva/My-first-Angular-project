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
  userDetails$$ = new BehaviorSubject<UserDetails | undefined>(undefined);

  userDetails$ = this.userDetails$$.asObservable();

  user: UserLocalStorage | undefined;
  CART_KEY_LS = environment.CART_KEY_LOCAL_STORAGE;
  USER_KEY_LS = environment.USER_KEY_LOCAL_STORAGE;

  constructor(
    private http: HttpClient,
    private router: Router) {
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
    address: string) {


    this.http.post<UserLocalStorage>('/users/register', {
      email,
      password
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

        this.http.post<UserDetails>('/data/auth', {
          email,
          firstName,
          lastName,
          address,
          myCart: lsUser.myCart,
          myOrders: []
        }).subscribe({
          next: (data) => this.userDetails$$.next(data),
          error: (error) => {
            // TODO HAndle error
            console.log(error)
          }
        })

        this.router.navigate(['/'])
      },
      error: (error) => {
        // TODO HAndle error
        console.log(error)
      }
    })
  }

  getUserDetails() {
    const query = encodeURIComponent(`_ownerId="${this.user?._id}"`)

    return this.http.get<UserDetails[]>(`/data/auth?where=${query}`)
      .subscribe({
        next: (data) => {this.userDetails$$.next(data[0])},
        error: (err) => {
          // TODO HAndle error
          console.log(err.message);
          return [err]
        }
      })
  }

  editUser(firstName: string, lastName: string, address: string, _id: string | undefined) {
    return this.http
      .patch<UserDetails>(`/data/auth/${_id}`, { firstName, lastName, address })
      .subscribe({
        next: (data) => this.userDetails$$.next(data),
        error: (err) => {
          // TODO HAndle error
          console.log(err.message);
          return [err]
        }
      })
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


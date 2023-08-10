import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { UserLocalStorage } from '../types/UserLocalStorage';
import { UserDetails } from '../types/UserDetails';
import { OrderProduct } from '../../products/types/OrderProduct';
import { Order } from '../../products/types/Order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails$$ = new BehaviorSubject<UserDetails | undefined>(undefined);

  userDetails$ = this.userDetails$$.asObservable();

  user: UserLocalStorage | undefined;
  userDetails: UserDetails | undefined;
  CART_KEY_LS = environment.CART_KEY_LOCAL_STORAGE;
  USER_KEY_LS = environment.USER_KEY_LOCAL_STORAGE;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
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
    const myCart = this.user ? this.user.myCart : [];
    localStorage.setItem(this.CART_KEY_LS, JSON.stringify(myCart))

    if (this.userDetails) {
      this.http.put(`/data/auth/${this.userDetails._id}`, { ...this.userDetails, myCart })
    }

    this.http.get('/users/logout')

    this.user = undefined;
    this.userDetails = undefined;
    this.userDetails$$.next(undefined);
    localStorage.removeItem(this.USER_KEY_LS)


    this.router.navigate(['/'])
  }

  login(email: string, password: string) {
    this.http
      .post<UserLocalStorage>('/users/login', { email, password })
      .subscribe({
        next: (user) => {
          const { myCart, _id, accessToken } = { ...user }
          user = { myCart, _id, accessToken }

          this.user = user;
          this.getUserDetails()
          this.userDetails$.subscribe({
            next: userDetails => {
              if (userDetails) {
                user.myCart = this.updateUserCartOnLogin(userDetails);

                localStorage.setItem(
                  this.USER_KEY_LS,
                  JSON.stringify(user)
                );

                this.user = user;
                this.router.navigate(['/'])
              }
            }
          })
        }
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
        user.myCart = this.updateUserCartOnLogin();

        localStorage.setItem(
          this.USER_KEY_LS,
          JSON.stringify(user)
        );
        this.user = user;

        this.http.post<UserDetails>('/data/auth', {
          email,
          firstName,
          lastName,
          address,
          myCart: user.myCart,
          myOrders: []
        }).subscribe({
          next: (data) => {
            this.userDetails = data;
            this.userDetails$$.next(data)
          }
        })

        this.router.navigate(['/'])
      }
    })
  }

  getUserDetails() {
    const query = encodeURIComponent(`_ownerId="${this.user?._id}"`)

    return this.http.get<UserDetails[]>(`/data/auth?where=${query}`)
      .subscribe({
        next: (data) => {
          this.userDetails = data[0];
          this.userDetails$$.next(data[0])
        }
      })
  }

  editUser(userInfo: UserDetails, order?: Order) {

    if (order) {
      userInfo.myOrders.push(order)
      userInfo.myCart = []

      if (this.user) {
        this.user.myCart = [];
        localStorage.setItem(
          environment.USER_KEY_LOCAL_STORAGE,
          JSON.stringify(this.user)
        )
      }
    } else {
      this.user ? userInfo.myCart = this.user.myCart : '';
    }

    return this.http
      .put<UserDetails>(`/data/auth/${userInfo._id}`, userInfo)
      .subscribe({
        next: (data) => {
          this.userDetails$$.next(data)
          if (order) {
            this.router.navigate(['/order-confirmed'])
          }
        }
      })
  }

  deleteUser() {
    // Server don't support user delete!!!
    this.http.delete('/users/me').pipe(
      switchMap(async () => this.logout())
    )
  }

  makeOrder(
    madeOnDate: Date,
    address: string,
    products: OrderProduct[],
    total: number,
  ) {
    let orderNumber = String(
      total *
      madeOnDate.getHours() *
      madeOnDate.getSeconds() *
      madeOnDate.getMinutes() *
      madeOnDate.getFullYear())

    orderNumber = address.charCodeAt(0) + orderNumber.slice(orderNumber.length - 7, orderNumber.length - 1)

    if (this.isLogged) {
      // if the user is logged
      this.http.post<Order>('/data/orders', {
        orderNumber,
        madeOnDate: String(madeOnDate),
        address,
        products,
        total
      }).subscribe({
        next: (order) => {
          if (this.userDetails) {
            this.editUser(this.userDetails, order)
          }
        }
      })
    } else {
      this.http
        .post<UserLocalStorage>('/users/login', { email: 'peter@abv.bg', password: '123456' })
        .subscribe({
          next: (user) => {
            const { myCart, _id, accessToken } = { ...user }
            user = { myCart, _id, accessToken }

            localStorage.setItem(
              this.USER_KEY_LS,
              JSON.stringify(user)
            );

            this.http.post<Order>('/data/orders', {
              orderNumber,
              madeOnDate: String(madeOnDate),
              address,
              products,
              total
            }).subscribe({
              next: () => {
                this.logout()
                this.router.navigate(['/order-confirmed'])
              }
            })
          }
        })
    }
  }

  updateUserCartOnLogin(userDetails?: UserDetails): OrderProduct[] {
    const lsCartData = localStorage.getItem(this.CART_KEY_LS);
    let newCart: OrderProduct[] = [];

    if (lsCartData) {
      const lsCartArr = JSON.parse(lsCartData)
      newCart = lsCartArr;

      if (userDetails) {
        // check if the product is already in the cart from
        userDetails.myCart.forEach((currPr) => {
          let isProductMissing = true;

          // if it is in the cart -> count++
          newCart.forEach((pr, index) => {
            if (pr._id === currPr._id) {
              newCart[index].count += currPr.count
              isProductMissing = false;
            }
          })

          // if it is not in the cart -> add it
          if (isProductMissing) {
            newCart.push(currPr);
          }
        })
      }

      localStorage.removeItem(this.CART_KEY_LS)
    } else {
      if (userDetails) {
        newCart = [...userDetails.myCart]
      }
    }
    return newCart;
  }

}


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDetails } from './features/products/types/ProductDetails';
import { ObservableInput, catchError, of, switchMap, tap } from 'rxjs';
import { UserService } from './features/user/services/user-service.service';
import { db } from 'src/db.module';
import { UserLocalStorage } from './features/user/types/UserLocalStorage';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'green-planet-angular-application';
  isEmpty = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // This will work only if there are no remaining items from the previous loading in the local storage
    
    // trying to get products
    this.http.get<ProductDetails[]>('/init/data/products').subscribe({
      next: (data) => {
        // if there are no products, we should post them
        if (data.length == 0) {
          this.postProducts();
        }
      },
      error: (err) => {
        if (err.status == 404) {
          this.postProducts()
          return;
        }
        console.log('error =>', err.message);
      }
    })

  }

  postProducts() {
    // login because products must have owner 
    this.http.post<UserLocalStorage>('/init/users/login', { email: 'peter@abv.bg', password: '123456' })
      .subscribe({
        next: (user) => {
          localStorage.setItem(environment.INIT_ACCESS_TOKEN_LOCAL_STORAGE, JSON.stringify({ accessToken: user.accessToken }));

          // map on products and post them
          db.products.map(product => {

            this.http.post('/init/data/products', product).pipe(
              catchError(err => {
                console.log(err.message)
                return [err]
              })
            ).subscribe({
              error: (err) => console.log(err.message),

            })
          })
          // logout
          this.http.get('/init/users/logout').subscribe({
            next: (data) => {
              localStorage.removeItem(environment.INIT_ACCESS_TOKEN_LOCAL_STORAGE);
            },
            error: (err) => console.log('logout err', err.message),
          })
        },
        error: (err) => {
          console.log('login error =>', err.message);
        }
      })
  }
}

import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductDetails } from '../types/ProductDetails';
import { Filters } from '../types/Filters';
import { BehaviorSubject, catchError, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsMainService {
  productsCollection$$ = new BehaviorSubject<ProductDetails[] | undefined>(undefined);
  pageProducts$$ = new BehaviorSubject<ProductDetails[] | undefined>(undefined);

  pageProducts$ = this.pageProducts$$.asObservable();
  productsCollection$ = this.productsCollection$$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getBestSellers() {
    return this.http.get<ProductDetails[]>('/data/products?where=isBestSeller%3Dtrue')
  }

  getProductsOnPage(offset: number, productsCount: number) {
    // Server pagination works if there are no products filters
    // return this.http.get<ProductDetails[]>(`/data/products?offset=${offset}&pageSize=${productsCount}`).subscribe({
    //   next: (data) => this.pageProducts$$.next(data),
    //   error: (err) => console.log(err.message)
    // })

    // Custom pagination
    return this.productsCollection$.subscribe({
      next: (allProducts) => {
        this.pageProducts$$.next(allProducts?.slice(offset, offset + productsCount))
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  getProductsCollection(filters?: Filters): void {
    //   // Can't understand how to make multiple requests to the practice server
    // let query: string[] | string = [];
    // let categories: string[] = []

    // if (filters) {
    //   filters.price.priceFrom ? query.push(`price>=${filters.price.priceFrom}`) : '';
    //   filters.price.priceTo ? query.push(`price<=${filters.price.priceTo}`) : '';

    //   filters.category.flowers ? categories.push(`flowers`) : '';
    //   filters.category.trees ? categories.push(`trees`) : '';
    //   filters.category.outdoor ? categories.push(`outdoor`) : '';
    //   filters.category.indoor ? categories.push(`indoor`) : '';

    //   categories.length > 0 ? query.push(`category=${JSON.stringify(categories)}`) : '';
    //   query = query.join('AND');

    //   query = encodeURIComponent(query);
    // }
    // this.http.get<ProductDetails[]>(`/data/products${filters ? `?where=${query}` : ''}`)

    this.http.get<ProductDetails[]>(`/data/products`)
      .subscribe({
        next: (data) => {
          // custom filter
          if (filters) {
            data = this.customFilter(filters, data)
          }
          this.productsCollection$$.next(data)
        },
        error: (err) => {
          console.log(err.message)
        }
      })
  }

  getProductDetails(id: string) {

    return this.http.get<ProductDetails>(`/data/products/${id}`)
  }

  customFilter(filters: Filters, data: ProductDetails[]) {
    if (filters.price.priceFrom) {
      data = data.filter(product => product.price >= Number(filters.price.priceFrom))
    }
    if (filters.price.priceTo) {
      data = data.filter(product => product.price <= Number(filters.price.priceTo))
    }
    if (filters.category.flowers) {
      data = data.filter(product => {
        let isCategory = false;
        product.category.map((item) => {
          item == `flowers`
            ? isCategory = true
            : ""
        })
        return isCategory;
      })
    }
    if (filters.category.trees) {
      data = data.filter(product => {
        let isCategory = false;
        product.category.map((item) => {
          item == `trees`
            ? isCategory = true
            : ""
        })
        return isCategory;
      })
    }
    if (filters.category.outdoor) {
      data = data.filter(product => {
        let isCategory = false;
        product.category.map((item) => {
          item == `outdoor`
            ? isCategory = true
            : ""
        })
        return isCategory;
      })
    }
    if (filters.category.indoor) {
      data = data.filter(product => {
        let isCategory = false;
        product.category.map((item) => {
          item == `indoor`
            ? isCategory = true
            : ""
        })
        return isCategory;
      })
    }
    return data;
  }

}

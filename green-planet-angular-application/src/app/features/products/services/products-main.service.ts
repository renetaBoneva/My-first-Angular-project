import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductDetails } from '../types/ProductDetails';
import { Filters } from '../types/Filters';
import { BehaviorSubject } from 'rxjs';

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
    return this.http.get<ProductDetails[]>(`/data/products?offset=${offset}&pageSize=${productsCount}`).subscribe({
      next: (data) => this.pageProducts$$.next(data),
      error: (err) => console.log(err.message)
    })
  }

  getProductsCollection(filters?: Filters): void {
    let query: string[] | string = [];
    if (filters) {
      console.log(filters);

      filters.price.priceFrom ? query.push(`price>=${filters.price.priceFrom}`) : '';
      filters.price.priceTo ? query.push(`price<=${filters.price.priceTo}`) : '';
      query = query.join('AND');
      query = encodeURIComponent(query);
    }

    console.log(`/data/products${filters ? `?where=${query}` : ''}`);

    this.http.get<ProductDetails[]>(`/data/products`)
      .subscribe({
        next: (data) => {
          this.productsCollection$$.next(data)
        },
        error: (err) => console.log(err.message)
      })
  }

}

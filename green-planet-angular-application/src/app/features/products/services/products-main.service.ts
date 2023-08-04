import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDetails } from '../types/ProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductsMainService {
  constructor(
    private http: HttpClient
  ) { }


  getBestSellers() {
    return this.http.get<ProductDetails[]>('/data/products?where=isBestSeller%3Dtrue')
  }

}

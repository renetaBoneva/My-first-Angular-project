import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProductDetails } from '../../types/ProductDetails';
import { OrderProduct } from '../../types/OrderProduct';
import { ProductsCountService } from '../../services/productsCount.service';
import { ProductsMainService } from '../../services/products-main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  bestSellersArr: ProductDetails[] = [];
  subs: Subscription[] = []

  constructor(
    private productsCountService: ProductsCountService,
    private productsMainService: ProductsMainService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.productsMainService.getBestSellers().subscribe({
      next: (products) => this.bestSellersArr = products
    }))
  }

  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 };
    this.productsCountService.addProductToCart(productData);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}

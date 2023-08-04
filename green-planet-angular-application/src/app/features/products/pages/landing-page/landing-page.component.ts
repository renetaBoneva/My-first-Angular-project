import { Component, OnInit } from '@angular/core';
import { db } from 'src/db.module';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsCountService } from '../../services/productsCount.service';
import { OrderProduct } from '../../types/OrderProduct';
import { ProductsMainService } from '../../services/products-main.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  bestSellersArr: ProductDetails[] = [];

  constructor(
    private productsCountService: ProductsCountService,
    private productsMainService: ProductsMainService,
    ) { }

  ngOnInit(): void {
    this.productsMainService.getBestSellers().subscribe({
      next: (products) => this.bestSellersArr = products,
      error: (error) => {
        console.log(error.message);

      }
    })    
  }

  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 };
    this.productsCountService.addProductToCart(productData);
  }
}

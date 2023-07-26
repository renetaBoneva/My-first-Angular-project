import { Component, OnInit } from '@angular/core';
import { db } from 'src/db.module';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsCountService } from '../../services/productsCount.service';
import { OrderProduct } from '../../types/OrderProduct';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  products: ProductDetails[] = db.products;
  bestSellersArr: ProductDetails[] = [];

  constructor(private productsCountService: ProductsCountService) { }

  ngOnInit(): void {
    // Temporary db TODO: get data from api service
    this.bestSellersArr = this.products.filter(p => p.isBestSeller);
  }

  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 };
    this.productsCountService.addProductToCart(productData);
  }
}

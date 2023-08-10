import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { db } from 'src/db.module';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsMainService } from '../../services/products-main.service';
import { ProductsCountService } from '../../services/productsCount.service';
import { OrderProduct } from '../../types/OrderProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsMainService: ProductsMainService,
    private productsCountService: ProductsCountService,
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    const id: string = this.activatedRoute.snapshot.params['id'];

    this.productsMainService.getProductDetails(id).subscribe({
      next: (prDetails) => {this.product = prDetails},
      error: (err) => this.router.navigate(['/error'])
    })
  }
  
  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 };
    return this.productsCountService.addProductToCart(productData, true)
  }
}

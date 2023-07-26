import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { db } from 'src/db.module';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsCountService } from '../../services/productsCount.service';
import { OrderProduct } from '../../types/OrderProduct';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})

export class ProductsCatalogComponent implements OnInit {
  products: ProductDetails[] | null = null;

  constructor(private productsCountService: ProductsCountService) { }

  ngOnInit(): void {
    // Temporary db TODO: get data from api service
    this.products = db.products.slice(0, 6);
  }
  
  handleFilter(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    //TODO: Handle products filter
    // Temporary db TODO: get data from api service
    // this.products = filtered data form api
    console.log(form.value);
  }

  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = {...product, count: 0};
    return this.productsCountService.addProductToCart(productData)
  }
}

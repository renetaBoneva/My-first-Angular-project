import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductsCountService } from '../../services/productsCount.service';
import { ProductsMainService } from '../../services/products-main.service';
import { ProductDetails } from '../../types/ProductDetails';
import { OrderProduct } from '../../types/OrderProduct';
import { Filters } from '../../types/Filters';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})

export class ProductsCatalogComponent implements OnInit, OnDestroy {
  products: ProductDetails[] | undefined = undefined;
  pageNums: number[] = [];
  currentPage: number;
  subscription: Subscription[] = [];

  constructor(
    private productsCountService: ProductsCountService,
    private productsMainService: ProductsMainService,
  ) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.productsMainService.getProductsCollection();
    this.productsMainService.getProductsOnPage(0, 6);

    this.subscription.push(
      this.productsMainService.pageProducts$.subscribe({
        next: (products) => this.products = products
      })
    )

    this.subscription.push(
      this.productsMainService.productsCollection$.subscribe({
        next: (products) => {
          this.pageNums = [];
          if (products) {
            const pageCount = Math.ceil(products?.length / 6)

            for (let i = 1; i <= pageCount; i++) {
              this.pageNums.push(i);
            }
          }
        }
      })
    )
  }

  changePage(pageNum: number) {
    this.currentPage = pageNum;
    const productsCountOnPage: number = 6;
    const offset = (--pageNum) * productsCountOnPage;
    this.productsMainService.getProductsOnPage(offset, productsCountOnPage);
  }

  previousPage() {
    this.currentPage--;
    this.changePage(this.currentPage);
  }

  nextPage() {
    this.currentPage++;
    this.changePage(this.currentPage);
  }

  handleFilter(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { flowers, outdoor, indoor, trees, priceFrom, priceTo } = form.value;
    const formattedFilters: Filters = {
      category: { flowers, outdoor, indoor, trees },
      price: { priceFrom, priceTo }
    }
    
    this.currentPage = 1;
    this.productsMainService.getProductsCollection(formattedFilters)
  }

  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 };
    return this.productsCountService.addProductToCart(productData, true)
  }

  ngOnDestroy(): void {
    this.subscription.map(s => s.unsubscribe())
  }
}


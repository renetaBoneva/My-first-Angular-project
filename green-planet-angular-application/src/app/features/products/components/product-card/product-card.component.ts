import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsCountService } from '../../services/productsCount.service';
import { OrderProduct } from '../../types/OrderProduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  // @ViewChild('productCardTemplate', { static: true }) productCardTemplate;
  @Input() product: ProductDetails | undefined = undefined;

  constructor(
    private productsCountService: ProductsCountService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    // this.viewContainerRef.createEmbeddedView(this.productCardTemplate);
  }
  addProductToCart(product: ProductDetails) {
    let productData: OrderProduct = { ...product, count: 0 }
    return this.productsCountService.addProductToCart(productData)
  }
}
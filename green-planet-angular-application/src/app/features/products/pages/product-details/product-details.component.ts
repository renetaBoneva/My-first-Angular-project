import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { db } from 'src/db.module';
import { ProductDetails } from '../../types/ProductDetails';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number | null = null;
  product: ProductDetails | null = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetails();
  }
  
  getProductDetails() {
    this.id = this.activatedRoute.snapshot.params['id'];
    
    // Temporary db TODO: get data from api service
    this.product = db.products.filter(product => product._id == this.id)[0];
  }
}

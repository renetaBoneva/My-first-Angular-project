import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // product;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    
  }
}

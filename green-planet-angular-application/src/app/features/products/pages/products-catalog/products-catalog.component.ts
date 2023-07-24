import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { db } from 'src/db.module';
import { Product } from '../../types/Product';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})

export class ProductsCatalogComponent implements OnInit{
  products: Product[] | null = null;

  constructor() {}

  ngOnInit(): void {
    // Temporary db TODO: get data from api service
    this.products = db.products.slice(0,6);
  }

  handleFilter(form: NgForm) {
    if(form.invalid) {
      return;
    }

    //TODO: Handle products filter
    console.log(form.value);    
  }
}

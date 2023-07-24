import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '../../types/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductCardComponent{
  @Input() product: Product | undefined = undefined;

}

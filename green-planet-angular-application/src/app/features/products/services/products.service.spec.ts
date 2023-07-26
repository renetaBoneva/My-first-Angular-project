import { TestBed } from '@angular/core/testing';

import { ProductsCountService } from './productsCount.service';

describe('ProductsService', () => {
  let service: ProductsCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

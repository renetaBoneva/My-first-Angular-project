import { TestBed } from '@angular/core/testing';

import { ProductsMainService } from './products-main.service';

describe('ProductsMainService', () => {
  let service: ProductsMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCatalogComponent } from './products-catalog.component';

describe('ProductsCatalogComponent', () => {
  let component: ProductsCatalogComponent;
  let fixture: ComponentFixture<ProductsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsCatalogComponent]
    });
    fixture = TestBed.createComponent(ProductsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

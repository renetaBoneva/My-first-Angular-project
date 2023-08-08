import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueOrderComponent } from './continue-order.component';

describe('ContinueOrderComponent', () => {
  let component: ContinueOrderComponent;
  let fixture: ComponentFixture<ContinueOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueOrderComponent]
    });
    fixture = TestBed.createComponent(ContinueOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

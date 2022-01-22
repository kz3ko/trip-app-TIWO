import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericRange, PriceRangeComponent } from './price-range.component';

describe('PriceRangeComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceRangeComponent, TestHostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.priceRangeComponent).toBeTruthy();
  });

  it('should have maxValue equal to 20000', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.priceRangeComponent.maxValue).toBe(20000);
  });

  it('should emit minValue equal to 0 and maxValue equal to 20000', () => {
    let range: NumericRange;

    testHostComponent.priceRangeComponent.rangeChange.subscribe(
      (value) => range = value
    );
    testHostComponent.priceRangeComponent.onRangeChange();

    expect(range.min).toBe(0);
    expect(range.max).toBe(20000);
  });

  @Component({
    selector: `host-component`,
    template: `<app-price-range [ceil]="20000" ></app-price-range>`
  })
  class TestHostComponent {
    range: NumericRange;

    @ViewChild(PriceRangeComponent)
    public priceRangeComponent: PriceRangeComponent;
  }
});
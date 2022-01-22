import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewThresholdComponent } from './review-threshold.component';

describe('ReviewThresholdComponent', () => {
  let component: ReviewThresholdComponent;
  let fixture: ComponentFixture<ReviewThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle value change', () => {
    const gwiazdki = 5;
    component.gwiazdki = 5;

    spyOn(component.reviewRatingChange, 'emit');
    component.handleValueChange();

    expect(component.reviewRatingChange.emit).toHaveBeenCalledWith(gwiazdki);
  })
});

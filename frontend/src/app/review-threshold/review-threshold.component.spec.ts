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
});

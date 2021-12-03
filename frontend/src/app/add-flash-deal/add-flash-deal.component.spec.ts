import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashDealComponent } from './add-flash-deal.component';

describe('AddFlashDealComponent', () => {
  let component: AddFlashDealComponent;
  let fixture: ComponentFixture<AddFlashDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlashDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlashDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

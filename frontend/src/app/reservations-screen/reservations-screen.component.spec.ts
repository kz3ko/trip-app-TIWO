import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsScreenComponent } from './reservations-screen.component';

describe('ReservationsScreenComponent', () => {
  let component: ReservationsScreenComponent;
  let fixture: ComponentFixture<ReservationsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

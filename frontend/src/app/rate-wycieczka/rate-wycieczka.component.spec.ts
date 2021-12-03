import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateWycieczkaComponent } from './rate-wycieczka.component';

describe('RateWycieczkaComponent', () => {
  let component: RateWycieczkaComponent;
  let fixture: ComponentFixture<RateWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

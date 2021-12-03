import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAdderComponent } from './multi-adder.component';

describe('MultiAdderComponent', () => {
  let component: MultiAdderComponent;
  let fixture: ComponentFixture<MultiAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

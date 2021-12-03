import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWycieczkaComponent } from './add-wycieczka.component';

describe('AddWycieczkaComponent', () => {
  let component: AddWycieczkaComponent;
  let fixture: ComponentFixture<AddWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyWycieczkaComponent } from './modify-wycieczka.component';

describe('ModifyWycieczkaComponent', () => {
  let component: ModifyWycieczkaComponent;
  let fixture: ComponentFixture<ModifyWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaCommentsComponent } from './wycieczka-comments.component';

describe('WycieczkaCommentsComponent', () => {
  let component: WycieczkaCommentsComponent;
  let fixture: ComponentFixture<WycieczkaCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WycieczkaDetailsScreenComponent } from './wycieczka-details-screen.component';

describe('WycieczkaDetailsScreenComponent', () => {
  let component: WycieczkaDetailsScreenComponent;
  let fixture: ComponentFixture<WycieczkaDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaDetailsScreenComponent ], 
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

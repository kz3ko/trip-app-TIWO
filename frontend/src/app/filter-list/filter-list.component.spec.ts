import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListComponent } from './filter-list.component';

describe('FilterListComponent', () => {
  let component: FilterListComponent;
  let fixture: ComponentFixture<FilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ FilterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should react on search change if value provided', () => {
    component.filtersEnabled.search = false;
    component.onSearchChange('Some string');

    expect(component.filtersEnabled.search).toBeTruthy();
  });

  it('should react on search change if value not provided', () => {
    component.filtersEnabled.search = true;
    component.onSearchChange(null);

    expect(component.filtersEnabled.search).toBeFalsy();
  });
});

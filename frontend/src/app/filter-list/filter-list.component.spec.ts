import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {dateToNgbDate, FilterListComponent, FilterType} from './filter-list.component';
import { DateRange } from '../date-range-filter/date-range-filter.component';
import { mockWycieczki  } from '../../utils/tests-utils/mocks';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

describe('FilterListComponent', () => {
  let component: FilterListComponent;
  let fixture: ComponentFixture<FilterListComponent>;
  const availableFilterTypes: FilterType[] = ['dateRange', 'search', 'priceRange', 'reviewThreshold', 'allowedRegions'];

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

  // FAILS
  xit('should convert to NGB data', () => {
    const year = 2022;
    const month = 4;
    const day = 12;

    const someDate = new Date(year, month, day);
    const expectedNgbDate = new NgbDate(year, month, day);

    expect(dateToNgbDate(someDate)).toEqual(expectedNgbDate);
  });

  it('should flip filters', () => {
    for (const filter of availableFilterTypes) {
      const previousState = component.filtersEnabled[filter];
      component.flipFilter(filter);
      const currentState = component.filtersEnabled[filter];
      expect(previousState).toEqual(!currentState);
    }
  });

  it('should return max trip value', () => {
    const value = 50;

    component.maxWycieczkaValue = value;

    expect(component.getMaxWycieczkaValue()).toEqual(value);
  });

  it('should return available regions', () => {
    expect(component.availableRegions().length).toEqual(0);
    expect(component.availableRegions()).toEqual([]);

    component.wycieczki = mockWycieczki;
    expect(component.availableRegions().length).toEqual(2);
    expect(component.availableRegions()).toEqual(['Polska', 'Polska']);
  });

  it('should not react on date range change if date range is invalid', () => {
    const invalidDateRanges: DateRange[] = [
      {from: null, to: new NgbDate(2022, 4, 10)},
      {from: new NgbDate(2022, 4, 10), to: null},
      {from: null, to: null}
    ];
    spyOn(component, 'swapFilter').and.callThrough();
    for (const dateRange of invalidDateRanges) {
      component.onDateRangeChange(dateRange);
    }
    expect(component.swapFilter).toHaveBeenCalledTimes(0);
  });

  it('should react if date range change if date range is valid', () => {
    const validDateRange: DateRange = {
      from: new NgbDate(2022, 4, 3),
      to: new NgbDate(2022, 4, 10)
    };
    spyOn(component, 'swapFilter').and.callThrough();
    component.onDateRangeChange(validDateRange);
    expect(component.swapFilter).toHaveBeenCalled();
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

  it('should react on review threshold change', () => {
    spyOn(component, 'swapFilter').and.callThrough();
    component.onReviewThresholdChange(1);
    expect(component.swapFilter).toHaveBeenCalled();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DateRangeFilterComponent } from './date-range-filter.component';

const FROM_YEAR = 2022;
const FROM_MONTH = 4;
const FROM_DAY = 18;

describe('DateRangeFilterComponent', () => {
  let component: DateRangeFilterComponent;
  let fixture: ComponentFixture<DateRangeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, NgbModule ],
      declarations: [ DateRangeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select date when second date is after first', () => {
    const fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);
    const toDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);

    component.onDateSelection(fromDate);
    component.onDateSelection(toDate);

    expect(component.fromDate).toBe(fromDate);
    expect(component.toDate).toBe(toDate);
  });

  it('should select date when second date is before first', () => {
    const fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);
    const toDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);

    component.onDateSelection(fromDate);
    component.onDateSelection(toDate);

    expect(component.toDate).toBeNull();
    expect(component.fromDate).toBe(toDate);
  });

  it('should emit new dates', () => {
    const fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);
    const toDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);

    component.onDateSelection(fromDate);
    spyOn(component.datesChanged, 'emit');
    component.onDateSelection(toDate);

    expect(component.datesChanged.emit).toHaveBeenCalledWith({from: fromDate, to: toDate});
  });

  it('should check if date is hovered', () => {
    const fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);
    const shouldBeHoveredDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 4);
    const shouldNotBeHoveredDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 10);
    const hoveredDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);
    component.fromDate = fromDate;
    component.toDate = null;
    component.hoveredDate = hoveredDate;

    expect(component.isHovered(shouldBeHoveredDate)).toBeTruthy();
    expect(component.isHovered(shouldNotBeHoveredDate)).toBeFalsy();
  });

  it('should check if date is inside', () => {
    component.fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);
    component.toDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);
    const insideDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 3);
    const outsideDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 10);

    expect(component.isInside(insideDate)).toBeTruthy();
    expect(component.isInside(outsideDate)).toBeFalsy();
  });

  it('should check if date is range', () => {
    const fromDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY);
    const hoveredDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);
    const toDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 7);
    component.fromDate = fromDate;
    component.toDate = toDate;
    const insideDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 3);
    const outsideDate = new NgbDate(FROM_YEAR, FROM_MONTH, FROM_DAY + 10);

    expect(component.isRange(fromDate)).toBeTruthy();
    expect(component.isRange(toDate)).toBeTruthy();
    expect(component.isRange(insideDate)).toBeTruthy();
    expect(component.isRange(outsideDate)).toBeFalsy();

    component.toDate = null;
    expect(component.isRange(toDate)).toBeFalsy();
  });
});

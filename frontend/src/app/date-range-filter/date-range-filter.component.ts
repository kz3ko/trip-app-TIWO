import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


export type DateRange = {
  from: NgbDate,
  to: NgbDate,
};


@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilterComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  @Output() datesChanged = new EventEmitter<DateRange>();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  ngOnInit(): void {
    this.emitNewDates();
  }

  onDateSelection = (date: NgbDate) => {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.emitNewDates();
  }

  emitNewDates = () => this.datesChanged.emit({
    from: this.fromDate, to: this.toDate
  })

  isHovered = (date: NgbDate) => {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside = (date: NgbDate) => {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange = (date: NgbDate) => {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput = (currentValue: NgbDate | null, input: string): NgbDate | null => {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}

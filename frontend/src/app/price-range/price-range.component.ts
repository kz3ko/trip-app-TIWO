import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelType, Options } from '@angular-slider/ngx-slider';

export type NumericRange = {min: number, max: number};

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit {

  @Input() set ceil(value: number) {
    this.options.ceil = value;
    this.maxValue = value;
  }

  @Output() rangeChange = new EventEmitter<NumericRange>();

  minValue = 0;
  maxValue: number;
  options: Options = {
    floor: 0,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>od:</b> ' + value + '  PLN';
        case LabelType.High:
          return '<b>do:</b> ' + value + '  PLN';
        default:
          return '';
      }
    }
  };
  ngOnInit(): void {

  }
  onRangeChange = () => {
    this.rangeChange.emit({
      min: this.minValue,
      max: this.maxValue,
    });
  }

}

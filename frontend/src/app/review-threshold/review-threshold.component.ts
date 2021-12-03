import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-review-threshold',
  templateUrl: './review-threshold.component.html',
  styleUrls: ['./review-threshold.component.scss']
})
export class ReviewThresholdComponent implements OnInit {

  gwiazdki = 0;
  @Output() reviewRatingChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.handleValueChange();
  }

  handleValueChange = () => {
    this.reviewRatingChange.emit(this.gwiazdki);
  }
}

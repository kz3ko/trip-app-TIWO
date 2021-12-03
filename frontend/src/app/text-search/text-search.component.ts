import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
})
export class TextSearchComponent implements OnInit {
  search = '';

  @Output() searchChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange = (input: string) => this.searchChange.emit(input.trim());
}

import { Component, Input, OnInit } from '@angular/core';
import { Ocena } from '../model/wycieczki';

@Component({
  selector: 'app-wycieczka-comments',
  templateUrl: './wycieczka-comments.component.html',
  styleUrls: ['./wycieczka-comments.component.scss']
})
export class WycieczkaCommentsComponent implements OnInit {
  @Input() comments: Ocena[];
  @Input() isVisible: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {
  Component, Input, OnInit, Output, EventEmitter, TemplateRef,
} from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Ocena, Wycieczka } from '../model/wycieczki';

@Component({
  selector: 'app-rate-wycieczka',
  templateUrl: './rate-wycieczka.component.html',
  styleUrls: ['./rate-wycieczka.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class RateWycieczkaComponent implements OnInit {
  @Input() wycieczkaId: Wycieczka['_id'];

  @Input() nazwa: Wycieczka['nazwa'];

  @Input() btnClass: string;

  @Output() rateWycieczka = new EventEmitter<Omit<Ocena, 'email'>>();

  komentarz = '';

  gwiazdki = undefined;

  error = false;

  private modal: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  submitWycieczkaRate = () => {
    if (this.gwiazdki || this.komentarz) {
      this.rateWycieczka.emit({
        gwiazdki: this.gwiazdki,
        komentarz: this.komentarz,
      });
      this.modal.close();
    } else {
      this.error = true;
    }
  }

  handleValueChange = () => {
    this.error = false;
  }

  open = (content: TemplateRef<any>) => {
    this.modal = this.modalService.open(content);
  }
}

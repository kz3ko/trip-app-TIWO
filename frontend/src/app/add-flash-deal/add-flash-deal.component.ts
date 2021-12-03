import {
  EventEmitter, Component, OnInit, TemplateRef, Output,
} from '@angular/core';
import {
  NgbModal, NgbModalConfig, NgbModalRef, NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FlashDeal, Wycieczka } from '../model/wycieczki';
import { WycieczkiService } from '../wycieczki.service';

@Component({
  selector: 'app-add-flash-deal',
  templateUrl: './add-flash-deal.component.html',
  styleUrls: ['./add-flash-deal.component.scss'],
})
export class AddFlashDealComponent implements OnInit {
  @Output() addFlashDeal = new EventEmitter<Omit<FlashDeal, '_id'>>();

  private modal: NgbModalRef;

  form: FormGroup;

  startTime: NgbTimeStruct;

  endTime: NgbTimeStruct;

  startDate: string;

  endDate: string;

  discount = 0;

  selectedWycieczkaId: string;

  availableWycieczkas: Wycieczka[];

  constructor(config: NgbModalConfig, private modalService: NgbModal, private wycieczkiService: WycieczkiService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getDateString(value: Date): string {
    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
  }

  ngOnInit(): void {
    this.initTimes();
  }

  initTimes = () => {
    const now = new Date();
    const nowPlusCoupleHours = new Date(now);
    nowPlusCoupleHours.setHours(now.getHours() + 4);

    this.startDate = this.getDateString(now);
    this.endDate = this.getDateString(nowPlusCoupleHours);

    this.startTime = {
      hour: now.getHours(), minute: now.getMinutes(), second: 0,
    };

    this.endTime = {
      hour: nowPlusCoupleHours.getHours(), minute: nowPlusCoupleHours.getMinutes(), second: 0,
    };
    this.availableWycieczkas = this.wycieczkiService.wycieczki;
    this.wycieczkiService.wycieczkiStream$.subscribe((newWycieczki) => {
      this.availableWycieczkas = newWycieczki;
    });
  }

  cancel(): void {
    this.modal.close();
  }

  open = (content: TemplateRef<any>) => {
    this.modal = this.modalService.open(content, { size: 'xl' });
  }

  submitForm(): void {
    const [startYear, startMonth, startDay] = this.startDate.split('-');
    const [endYear, endMonth, endDay] = this.endDate.split('-');
    // tslint:disable-next-line:variable-name
    const starts_at = this.setTime(new Date(parseInt(startYear, 10), parseInt(startMonth, 10) - 1, parseInt(startDay, 10)), this.startTime);
    // tslint:disable-next-line:variable-name
    const expires_at = this.setTime(new Date(parseInt(endYear, 10), parseInt(endMonth, 10) - 1, parseInt(endDay, 10)), this.endTime);
    this.addFlashDeal.emit({
      starts_at,
      expires_at,
      wycieczka_id: this.selectedWycieczkaId,
      discount: this.discount,
    });
    this.modal.close();
  }

  setTime = (date: Date, time: NgbTimeStruct): Date => {
    date.setHours(time.hour);
    date.setMinutes(time.minute);
    date.setSeconds(time.second);
    return date;
  }
}

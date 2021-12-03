import {
  Component, Input, OnInit, Output, EventEmitter, TemplateRef,
} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Wycieczka } from '../model/wycieczki';
import { WycieczkiService } from '../wycieczki.service';

@Component({
  selector: 'app-modify-wycieczka',
  templateUrl: './modify-wycieczka.component.html',
  styleUrls: ['./modify-wycieczka.component.scss'],
})
export class ModifyWycieczkaComponent implements OnInit {
  form: FormGroup;

  private modal: NgbModalRef;

  @Input() wycieczka: Wycieczka;

  @Output() editWycieczka = new EventEmitter<Wycieczka>();

  gallery: string[];

  constructor(config: NgbModalConfig, private modalService: NgbModal, private wycieczkiService: WycieczkiService) {
    // customize modal
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    const {
      nazwa, docelowyKraj, dataRozpoczecia, dataZakonczenia, cena, maxMiejsc, opis, zdjecie, galeria,
    } = this.wycieczka;
    const parsedDataRozpoczecia = new Date(dataRozpoczecia).toISOString().split('T')[0];
    const parsedDataZakonczenia = new Date(dataZakonczenia).toISOString().split('T')[0];
    this.form = new FormGroup({
      nazwa: new FormControl(nazwa, Validators.required),
      docelowyKraj: new FormControl(docelowyKraj, Validators.required),
      dataRozpoczecia: new FormControl(parsedDataRozpoczecia, Validators.required),
      dataZakonczenia: new FormControl(parsedDataZakonczenia, Validators.required),
      cena: new FormControl(cena, Validators.required),
      maxMiejsc: new FormControl(maxMiejsc, Validators.required),
      opis: new FormControl(opis),
      zdjecie: new FormControl(zdjecie, Validators.required),
    });
    this.gallery = galeria;
  }

  open = (content: TemplateRef<any>) => {
    this.modal = this.modalService.open(content, { size: 'xl' });
  }

  modifyWycieczka = () => {
    if (this.form.valid) {
      this.wycieczkiService.updateWycieczka({
        ...this.wycieczka,
        ...this.form.value,
        galeria: this.gallery,
      });
      this.modal.close();
    } else {
      this.touchAll();
    }
  }

  touchAll = () => {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  get nazwa(): AbstractControl {
    return this.form.get('nazwa');
  }

  get docelowyKraj(): AbstractControl {
    return this.form.get('docelowyKraj');
  }

  get dataRozpoczecia(): AbstractControl {
    return this.form.get('dataRozpoczecia');
  }

  get dataZakonczenia(): AbstractControl {
    return this.form.get('dataZakonczenia');
  }

  get cena(): AbstractControl {
    return this.form.get('cena');
  }

  get maxMiejsc(): AbstractControl {
    return this.form.get('maxMiejsc');
  }

  get opis(): AbstractControl {
    return this.form.get('opis');
  }

  get zdjecie(): AbstractControl {
    return this.form.get('zdjecie');
  }

  resetForm = () => this.form.reset();

  modalClose = () => {
    this.resetForm();
    this.modal.close();
  }

  handleNewGallery($event: string[]): void {
    this.gallery = $event;
  }
}

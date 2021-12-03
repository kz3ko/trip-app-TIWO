import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as uuid from 'uuid';
import { WycieczkiService } from '../wycieczki.service';

@Component({
  selector: 'app-add-wycieczka',
  templateUrl: './add-wycieczka.component.html',
  styleUrls: ['./add-wycieczka.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddWycieczkaComponent implements OnInit {
  form: FormGroup;

  private modal: NgbModalRef;

  gallery: string[] = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, private wycieczkiService: WycieczkiService) {
    // customize modal
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    // create model form
    this.form = new FormGroup({
      nazwa: new FormControl('', Validators.required),
      docelowyKraj: new FormControl('', Validators.required),
      dataRozpoczecia: new FormControl(null, Validators.required),
      dataZakonczenia: new FormControl(null, Validators.required),
      cena: new FormControl(null, Validators.required),
      maxMiejsc: new FormControl(null, Validators.required),
      opis: new FormControl(''),
      zdjecie: new FormControl('', Validators.required),
    });
  }

  open = (content: TemplateRef<any>) => {
    this.modal = this.modalService.open(content, { size: 'xl' });
  }

  addWycieczka = () => {
    if (this.form.valid) {
      this.wycieczkiService.addWycieczka({
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

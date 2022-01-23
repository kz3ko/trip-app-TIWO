import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyWycieczkaComponent } from './modify-wycieczka.component';
import {mockWycieczki} from '../../utils/tests-utils/mocks';

describe('ModifyWycieczkaComponent', () => {
  let component: ModifyWycieczkaComponent;
  let fixture: ComponentFixture<ModifyWycieczkaComponent>;

  const createModal = () => {
    spyOn(component, 'open').and.callThrough();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
  };

  const initForm = () => {
    component.wycieczka = {...mockWycieczki[0]};
    component.ngOnInit();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyWycieczkaComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no form if no wycieczka', () => {
    expect(component.form).toBeUndefined();
  });

  it('should get values from form', () => {
    initForm();

    const nazwa = 'Wakacje w grecji!';
    const docelowyKraj = 'Grecja';
    const dataZakonczenia = '08.08.2022';
    const dataRozpoczecia = '27.07.2022';
    const cena = 2999;
    const maxMiejsc = 5;
    const opis = 'Super wakacje!';
    const zdjecie = '*przykladowe zdjecie*';

    component.form.controls.nazwa.setValue(nazwa);
    component.form.controls.docelowyKraj.setValue(docelowyKraj);
    component.form.controls.dataZakonczenia.setValue(dataZakonczenia);
    component.form.controls.dataRozpoczecia.setValue(dataRozpoczecia);
    component.form.controls.cena.setValue(cena);
    component.form.controls.maxMiejsc.setValue(maxMiejsc);
    component.form.controls.opis.setValue(opis);
    component.form.controls.zdjecie.setValue(zdjecie);

    expect(component.nazwa.value).toBe(nazwa);
    expect(component.docelowyKraj.value).toBe(docelowyKraj);
    expect(component.dataZakonczenia.value).toBe(dataZakonczenia);
    expect(component.dataRozpoczecia.value).toBe(dataRozpoczecia);
    expect(component.cena.value).toBe(cena);
    expect(component.maxMiejsc.value).toBe(maxMiejsc);
    expect(component.opis.value).toBe(opis);
    expect(component.zdjecie.value).toBe(zdjecie);
  });

  it('should modify wycieczka', () => {
    initForm();
    component.resetForm();
    spyOn(component, 'touchAll').and.callThrough();
    component.modifyWycieczka();
    expect(component.touchAll).toHaveBeenCalled();

    const nazwa = 'Wakacje w grecji!';
    const docelowyKraj = 'Grecja';
    const dataZakonczenia = '08.08.2022';
    const dataRozpoczecia = '27.07.2022';
    const cena = 2999;
    const maxMiejsc = 5;
    const opis = 'Super wakacje!';
    const zdjecie = '*przykladowe zdjecie*';

    component.form.controls.nazwa.setValue(nazwa);
    component.form.controls.docelowyKraj.setValue(docelowyKraj);
    component.form.controls.dataZakonczenia.setValue(dataZakonczenia);
    component.form.controls.dataRozpoczecia.setValue(dataRozpoczecia);
    component.form.controls.cena.setValue(cena);
    component.form.controls.maxMiejsc.setValue(maxMiejsc);
    component.form.controls.opis.setValue(opis);
    component.form.controls.zdjecie.setValue(zdjecie);

    createModal();
    component.modifyWycieczka();
  });

  it('should open content when clicked', () => {
    initForm();
    createModal();
    expect(component.open).toHaveBeenCalled();
  });

  it('should close modal', () => {
    initForm();
    createModal();
    spyOn(component, 'resetForm').and.callThrough();
    component.modalClose();
    expect(component.resetForm).toHaveBeenCalled();
  });

  it('should handle new gallery', () => {
    const newGallery = ['photo1', 'photo2', 'photo3'];
    component.handleNewGallery(newGallery);
    expect(component.gallery).toEqual(newGallery);
  });
});

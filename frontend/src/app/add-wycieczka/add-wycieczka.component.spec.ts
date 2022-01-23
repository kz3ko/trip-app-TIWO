import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWycieczkaComponent } from './add-wycieczka.component';

describe('AddWycieczkaComponent', () => {
  let component: AddWycieczkaComponent;
  let fixture: ComponentFixture<AddWycieczkaComponent>;

  const createModal = () => {
    spyOn(component, 'open').and.callThrough();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWycieczkaComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty fields after being created', () => {
    component.ngOnInit();

    expect(component.nazwa.value).toBe('');
    expect(component.docelowyKraj.value).toBe('');
    expect(component.dataZakonczenia.value).toBe(null);
    expect(component.dataRozpoczecia.value).toBe(null);
    expect(component.cena.value).toBe(null);
    expect(component.maxMiejsc.value).toBe(null);
    expect(component.opis.value).toBe('');
    expect(component.zdjecie.value).toBe('');
  });

  it('should get values from form', () => {
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

  it('should add wycieczka', () => {
    spyOn(component, 'touchAll').and.callThrough();
    component.addWycieczka();
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
    component.addWycieczka();
  });

  it('should reset form', () => {
    const nazwa = 'Wakacje w grecji!';
    component.form.controls.nazwa.setValue(nazwa);
    expect(component.nazwa.value).toBe(nazwa);

    component.resetForm();
    expect(component.nazwa.value).toBe(null);
  });

  it('should open content when clicked', () => {
    createModal();
    expect(component.open).toHaveBeenCalled();
  });

  it('should close modal', () => {
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

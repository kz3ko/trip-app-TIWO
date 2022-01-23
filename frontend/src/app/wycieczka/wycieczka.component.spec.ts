import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaComponent } from './wycieczka.component';
import { mockWycieczki  } from '../../utils/tests-utils/mocks';

describe('WycieczkaComponent', () => {
  let component: WycieczkaComponent;
  let fixture: ComponentFixture<WycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove one wycieczka if there are reservations', () => {
    const trip = {...mockWycieczki[0]};

    spyOn(component.removePlace, 'emit');
    component.removeOne(trip);

    expect(component.removePlace.emit).toHaveBeenCalledWith(trip);
  });

  it('should not remove one wycieczka if there are no reservations', () => {
    const trip = {...mockWycieczki[0]};
    trip.rezerwowane = 0;

    spyOn(component.removePlace, 'emit');
    component.removeOne(trip);

    expect(component.removePlace.emit).not.toHaveBeenCalledWith();
  });

  it('should add one wycieczka if free slots', () => {
    const trip = {...mockWycieczki[0]};
    spyOn(component.bookPlace, 'emit');
    component.addOne(trip);

    expect(component.bookPlace.emit).toHaveBeenCalledWith(trip);
  });

  it('should add one wycieczka if all slots taken', () => {
    const trip = {...mockWycieczki[0]};
    trip.rezerwowane = trip.maxMiejsc;
    spyOn(component.bookPlace, 'emit');
    component.addOne(trip);

    expect(component.bookPlace.emit).not.toHaveBeenCalledWith();
  });

  it('should toggle comments', () => {
    const commentsVisible = component.commentsVisible;

    component.toggleComments();

    expect(component.commentsVisible).toEqual(!commentsVisible);
  });

  it('should react on wycieczka edit', () => {
    const wycieczka = mockWycieczki[0];
    component.wycieczka = wycieczka;
    spyOn(component.editWycieczka, 'emit');
    component.onEditWycieczka();
    expect(component.editWycieczka.emit).not.toHaveBeenCalledWith(wycieczka);
  });
});

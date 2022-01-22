import {ComponentFixture, TestBed} from '@angular/core/testing';

import { RateWycieczkaComponent } from './rate-wycieczka.component';


describe('RateWycieczkaComponent', () => {
  let component: RateWycieczkaComponent;
  let fixture: ComponentFixture<RateWycieczkaComponent>;

  const createModal = () => {
    spyOn(component, 'open').and.callThrough();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit rateWycieczka if "gwiazdki" provided', () => {
    const starsGiven = 5;
    component.gwiazdki = starsGiven;
    createModal();

    spyOn(component.rateWycieczka, 'emit');
    component.submitWycieczkaRate();

    expect(component.rateWycieczka.emit).toHaveBeenCalledWith({gwiazdki: starsGiven, komentarz: ''});
  });

  it('should emit rateWycieczka if "komentarz" provided', () => {
    const exampleComment = 'Przykladowy komentarz';
    component.komentarz = exampleComment;
    createModal();

    spyOn(component.rateWycieczka, 'emit');
    component.submitWycieczkaRate();

    expect(component.rateWycieczka.emit).toHaveBeenCalledWith({gwiazdki: undefined, komentarz: exampleComment});
  });

  it('should emit rateWycieczka if "gwiadki" and "komentarz" provided', () => {
    const exampleComment = 'Przykladowy komentarz';
    const starsGiven = 5;
    component.komentarz = exampleComment;
    component.gwiazdki = starsGiven;
    createModal();

    spyOn(component.rateWycieczka, 'emit');
    component.submitWycieczkaRate();

    expect(component.rateWycieczka.emit).toHaveBeenCalledWith({gwiazdki: starsGiven, komentarz: exampleComment});
  });

  it('should change error status if no "gwiazdki" or "komentarz"', () => {
    component.submitWycieczkaRate();

    expect(component.error).toBeTruthy();
  });

  it('should handle value change', () => {
    component.error = true;

    component.handleValueChange();

    expect(component.error).toBeFalsy();
  });

  it('should open content when clicked', () => {
    createModal();
    expect(component.open).toHaveBeenCalled();
  });
});

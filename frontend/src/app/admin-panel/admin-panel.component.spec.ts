import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';
import {WycieczkiService} from "../wycieczki.service";
import {Subject} from "rxjs";
import {Wycieczka} from "../model/wycieczki";
import {mockWycieczki} from "../../utils/tests-utils/mocks";

class WycieczkiServiceStub {
    wycieczki: Wycieczka[] = mockWycieczki;
    wycieczkiSource = new Subject<Wycieczka[]>();
    wycieczkiStream$ = this.wycieczkiSource.asObservable();
}

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let wycieczkiServiceStub: Partial<WycieczkiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: WycieczkiService, useValue: new WycieczkiServiceStub() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    wycieczkiServiceStub = TestBed.inject(WycieczkiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // INTEGRATION TESTS
  it('should get all wycieczki from service', () => {
    expect(component.allWycieczki).toEqual(wycieczkiServiceStub.wycieczki);
  });
});

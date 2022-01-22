import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { AddFlashDealComponent } from './add-flash-deal.component';


describe('AddFlashDealComponent', () => {
  let component: AddFlashDealComponent;
  let fixture: ComponentFixture<AddFlashDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlashDealComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlashDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return date string', () => {
    expect(component.getDateString(new Date(2022, 1, 22))).toBe('2022-2-22');
    expect(component.getDateString(new Date(2022, 0, 22))).toBe('2022-1-22');
    expect(component.getDateString(new Date(2022, 12, 22))).toBe('2023-1-22');
  });

  it('should set provided time', () => {
    const testHour = 12;
    const testMinute = 30;
    const testSecond = 45;
    const timeStruct: NgbTimeStruct = { hour: testHour, minute: testMinute, second: testSecond };
    const testDate = new Date(2022, 12, 1);
    const expectedDate = new Date(2022, 12, 1, testHour, testMinute, testSecond);

    const outputDate = component.setTime(testDate, timeStruct);

    expect(outputDate).toEqual(expectedDate);
  });
});

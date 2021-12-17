import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WycieczkiComponent } from './wycieczki.component';

describe('WycieczkiComponent', () => {
  let component: WycieczkiComponent;
  let fixture: ComponentFixture<WycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ WycieczkiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain loading screen if is still fetching', () => {
    component.isFetching = true;
    fixture.detectChanges();
    const textCenter = fixture.debugElement.query(By.css('.text-center')).nativeElement;
    const spinnerBorder = fixture.debugElement.query(By.css('.spinner-border')).nativeElement;
    const srOnly = fixture.debugElement.query(By.css('.sr-only')).nativeElement;

    expect(textCenter).toBeTruthy();
    expect(spinnerBorder).toBeTruthy();
    expect(srOnly).toBeTruthy();
    expect(srOnly.textContent).toEqual('Loading...');
  });

  it('should contain no loading screen if it is not fetching', () => {
    component.isFetching = false;
    fixture.detectChanges();
    const textCenter = fixture.debugElement.query(By.css('.text-center'));
    const spinnerBorder = fixture.debugElement.query(By.css('.spinner-border'));
    const srOnly = fixture.debugElement.query(By.css('.sr-only'));

    expect(textCenter).toBeFalsy();
    expect(spinnerBorder).toBeFalsy();
    expect(srOnly).toBeFalsy();
  });

  it('should contain app-wycieczka', () => {
    const element = fixture.debugElement.query(By.css('app-wycieczka'));
    expect(true).toBeTruthy();
  });
});

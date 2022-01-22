import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextSearchComponent } from './text-search.component';

describe('TextSearchComponent', () => {
  let component: TextSearchComponent;
  let fixture: ComponentFixture<TextSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange event after entering text in search textbox', () => {
    let searchText: string;

    component.searchChange.subscribe((value) => searchText = value);
    fixture.debugElement.query(By.css('.form-control')).triggerEventHandler('ngModelChange', 'Albania');

    expect(searchText).toBe('Albania');
  });
});
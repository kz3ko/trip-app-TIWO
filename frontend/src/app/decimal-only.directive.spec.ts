import { DecimalOnlyDirective } from './decimal-only.directive';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('DecimalOnlyDirective', () => {
  let directive: DecimalOnlyDirective;

  beforeEach(() => {
    directive = new DecimalOnlyDirective(new MockElementRef());
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

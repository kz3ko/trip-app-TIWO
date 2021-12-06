import { DecimalOnlyDirective } from './decimal-only.directive';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('DecimalOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new DecimalOnlyDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});

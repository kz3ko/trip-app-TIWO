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

  it('should check valid value if decimals attribute is equal to 0', () => {
    // @ts-ignore
    expect(directive.check('99')[0]).toEqual('99');
    // @ts-ignore
    expect(directive.check('99 ')).toBeNull();
    // @ts-ignore
    expect(directive.check(' 99 ')).toBeNull();
  });

  it('should check valid value if decimals attribute is equal to 2', () => {
    directive.decimals = 2;
    // @ts-ignore
    expect(directive.check('99')[0]).toEqual('99');
    // @ts-ignore
    expect(directive.check('99').slice(0, directive.decimals + 1)).toEqual(['99', '99', '99']);
  });

  it('should check invalid value if decimals attribute is equal to 0', () => {
    // @ts-ignore
    expect(directive.check('')).toBeNull();
  });

  it('should check invalid value if decimals attribute is equal to 2', () => {
    directive.decimals = 2;
    // @ts-ignore
    expect(directive.check('')).toBeNull();
    // @ts-ignore
  });
});

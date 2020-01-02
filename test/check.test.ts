import { expect } from 'chai';
import tsfv, { ValidationError } from '../src';

describe('check', () => {
  it('does not throw if valid', () => {
    tsfv.empty().check([]);
  });
  it('throws if invalid', () => {
    expect(() => tsfv.not.empty().check([])).to.throw(ValidationError);
  });
});

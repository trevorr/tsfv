import { expect } from 'chai';
import tsfv from '../src';

describe('optional', () => {
  it('passes when valid or null or undefined', () => {
    expect(
      tsfv
        .integer()
        .optional()
        .test(null)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .optional()
        .test(undefined)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .optional()
        .test(42)
    ).to.be.true;
  });
  it('fails when invalid', () => {
    expect(
      tsfv
        .integer()
        .optional()
        .test(1.1)
    ).to.be.false;
  });
});

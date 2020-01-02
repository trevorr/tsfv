import { expect } from 'chai';
import tsfv from '../src';

describe('orUndefined', () => {
  it('passes when valid or undefined', () => {
    expect(
      tsfv
        .integer()
        .orUndefined()
        .test(undefined)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .orUndefined()
        .test(42)
    ).to.be.true;
  });
  it('fails when null', () => {
    expect(
      tsfv
        .integer()
        .orUndefined()
        .test(null)
    ).to.be.false;
  });
  it('fails when invalid', () => {
    expect(
      tsfv
        .integer()
        .orUndefined()
        .test(1.1)
    ).to.be.false;
  });
});

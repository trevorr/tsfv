import { expect } from 'chai';
import tsfv from '../src';

describe('orNull', () => {
  it('passes when valid or null', () => {
    expect(
      tsfv
        .integer()
        .orNull()
        .test(null)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .orNull()
        .test(42)
    ).to.be.true;
  });
  it('fails when undefined', () => {
    expect(
      tsfv
        .integer()
        .orNull()
        .test(undefined)
    ).to.be.false;
  });
  it('fails when invalid', () => {
    expect(
      tsfv
        .integer()
        .orNull()
        .test(1.1)
    ).to.be.false;
  });
  it('combines with orUndefined', () => {
    expect(
      tsfv
        .integer()
        .orNull()
        .orUndefined()
        .test(null)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .orNull()
        .orUndefined()
        .test(undefined)
    ).to.be.true;
    expect(
      tsfv
        .integer()
        .orNull()
        .orUndefined()
        .test(42)
    ).to.be.true;
  });
});

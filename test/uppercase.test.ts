import { expect } from 'chai';
import tsfv from '../src';
import './uppercase';

describe('extension: uppercase', () => {
  it('passes with uppercase string', () => {
    expect(tsfv.uppercase().test('ABC')).to.be.true;
  });
  it('fails with lowercase string', () => {
    expect(tsfv.uppercase().test('abc')).to.be.false;
  });
  it('fails with empty string', () => {
    expect(tsfv.uppercase().test('')).to.be.false;
  });
});

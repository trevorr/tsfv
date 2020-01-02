import { expect } from 'chai';
import tsfv from '../src';

describe('contains', () => {
  it('passes when containing', () => {
    expect(tsfv.contains('').test('')).to.be.true;
    expect(tsfv.contains('').test('abcde')).to.be.true;
    expect(tsfv.contains('bcd').test('abcde')).to.be.true;
    expect(tsfv.contains('abcde').test('abcde')).to.be.true;
  });
  it('fails when not containing', () => {
    expect(tsfv.contains('a').test('')).to.be.false;
    expect(tsfv.contains('bcd').test('ABCDE')).to.be.false;
  });
  it('fails when not string', () => {
    expect(tsfv.contains('').test(null)).to.be.false;
    expect(tsfv.contains('').test(undefined)).to.be.false;
    expect(tsfv.contains('').test(false)).to.be.false;
    expect(tsfv.contains('').test(true)).to.be.false;
    expect(tsfv.contains('').test(0)).to.be.false;
    expect(tsfv.contains('').test(1)).to.be.false;
    expect(tsfv.contains('').test([])).to.be.false;
    expect(tsfv.contains('').test({})).to.be.false;
  });
});

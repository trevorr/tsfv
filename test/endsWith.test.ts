import { expect } from 'chai';
import tsfv from '../src';

describe('endsWith', () => {
  it('passes when matching', () => {
    expect(tsfv.endsWith('').test('')).to.be.true;
    expect(tsfv.endsWith('').test('abcde')).to.be.true;
    expect(tsfv.endsWith('cde').test('abcde')).to.be.true;
    expect(tsfv.endsWith('abcde').test('abcde')).to.be.true;
  });
  it('fails when not matching', () => {
    expect(tsfv.endsWith('a').test('')).to.be.false;
    expect(tsfv.endsWith('cde').test('ABCDE')).to.be.false;
    expect(tsfv.endsWith('bcd').test('abcde')).to.be.false;
  });
  it('fails when not string', () => {
    expect(tsfv.endsWith('').test(null)).to.be.false;
    expect(tsfv.endsWith('').test(undefined)).to.be.false;
    expect(tsfv.endsWith('').test(false)).to.be.false;
    expect(tsfv.endsWith('').test(true)).to.be.false;
    expect(tsfv.endsWith('').test(0)).to.be.false;
    expect(tsfv.endsWith('').test(1)).to.be.false;
    expect(tsfv.endsWith('').test([])).to.be.false;
    expect(tsfv.endsWith('').test({})).to.be.false;
  });
});

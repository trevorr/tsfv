import { expect } from 'chai';
import tsfv from '../src';
import './minWords';

describe('extension: minWords', () => {
  it('passes with three words', () => {
    expect(tsfv.minWords(3).test('three words long')).to.be.true;
  });
  it('passes with four words', () => {
    expect(tsfv.minWords(3).test('fully four words long')).to.be.true;
  });
  it('fails with two words', () => {
    expect(tsfv.minWords(3).test('two words')).to.be.false;
  });
});

import { expect } from 'chai';
import tsfv from '../src';

const div3 = tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3');

describe('predicate', () => {
  it('evaluates the predicate', () => {
    expect(div3.test(3)).to.be.true;
    expect(div3.test(2)).to.be.false;
    expect(div3.test(4)).to.be.false;
  });
  it('returns the description', () => {
    expect(div3.describe()).to.equal('numeric and divisible by 3');
  });
});

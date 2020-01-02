import { expect } from 'chai';
import tsfv from '../src';

describe('not', () => {
  it('inverts one validation', () => {
    expect(tsfv.not.empty().test('a')).to.be.true;
    expect(tsfv.not.empty().test([1])).to.be.true;
    expect(tsfv.not.positive().test(0)).to.be.true;
    expect(tsfv.not.negative().test(0)).to.be.true;
    expect(tsfv.not.object().test({})).to.be.false;
  });
  it('inverts only the next validation', () => {
    expect(
      tsfv
        .greaterThan(0)
        .not.greaterThan(1)
        .test(1)
    ).to.be.true;
  });
  it('does not narrow the validation types', () => {
    expect(
      tsfv.not
        .string()
        .greaterThan(0)
        .test(1)
    ).to.be.true;
  });
});

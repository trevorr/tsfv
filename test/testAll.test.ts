import { expect } from 'chai';
import tsfv from '../src';

describe('testAll', () => {
  it('returns an empty array if valid', () => {
    expect(tsfv.empty().testAll([])).to.eql([]);
    expect(
      tsfv.not
        .empty()
        .some(tsfv.exact(2))
        .testAll([1, 2, 3])
    ).to.eql([]);
  });
  it('returns all rule failures if invalid', () => {
    const result = tsfv.not
      .empty()
      .some(tsfv.exact(2))
      .testAll([]);
    expect(result).to.have.length(2);
    expect(result[0].rule.id).to.equal('not');
    expect(result[0].rule.rule.id).to.equal('empty');
    expect(result[1].rule.id).to.equal('some');
    expect(result[1].rule.rules[0].id).to.equal('exact');
    expect(result[1].rule.rules[0].value).to.equal(2);
  });
});

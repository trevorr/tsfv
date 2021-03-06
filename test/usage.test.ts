import tsfv from '../src';

// typical usage
const words = 'HELLO WORLD';
tsfv
  .length(1, 64)
  .pattern(/([A-Z]+\s*)+/)
  .orUndefined()
  .check(words, 'words');

// complex object validation and validator re-use
const objv = tsfv
  .keys(tsfv.every(tsfv.length(2, 8)).some(tsfv.exact('id')))
  .values(tsfv.every(tsfv.anyOf(tsfv.integer(), tsfv.string())));
objv.check({ id: 42, foo: 'bar' });
objv.testAll({ x: Math.PI }).forEach(err => console.log(err.message));
// Expected object with keys array with every element length between 2 and 8 and array with some element value exactly equal to "id"
// Expected object with values array with every element (integer or string)

const aoav = tsfv.every(
  tsfv.properties({
    ids: tsfv.every(tsfv.string().length(1, 10)).minLength(1)
  })
);
aoav.check([{ ids: ['2'] }, { ids: ['1', '99'], extra: 'stuff' }]);
aoav.testAll([{ ids: [] }, { ids: [''] }]).forEach(err => console.log(err.message));
// Expected array with every element object with properties ids (array with every element string and length between 1 and 10 and minimum length of 1)

// custom predicate
const div3 = tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3');
div3.check(9);
div3.check('9');
div3.testAll(Math.PI).forEach(err => console.log(err.message));
// Expected divisible by 3
div3.testAll(words).forEach(err => console.log(err.message));
// Expected numeric
// Expected divisible by 3

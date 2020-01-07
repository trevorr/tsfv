# tsfv: Typescript Fluent Validation Library

[![npm](https://img.shields.io/npm/v/tsfv)](https://www.npmjs.com/package/tsfv)
[![CircleCI](https://img.shields.io/circleci/build/github/trevorr/tsfv)](https://circleci.com/gh/trevorr/tsfv)

A Typescript-based validation library with an extensible, fluent API and human-readable error messages.

Similar to and somewhat inspired by [v8n](https://imbrn.github.io/v8n/), but addresses some limitations of that library:

* Full Typescript support ([v8n has no typings](https://github.com/imbrn/v8n/issues/28))
* Error messages describing why validation failed (in English but localizable)
* Easy to differentiate between null and undefined for optional values
* Fluent validation of object keys and values

## Installation

```sh
npm install tsfv
```

## Usage

### Typical Usage

```ts
import tsfv from 'tsfv';

const words = 'HELLO WORLD';
tsfv
  .length(1, 64)
  .pattern(/([A-Z]+\s*)+/)
  .orUndefined()
  .check(words, 'words');
```

### Complex Object Validation and Validator Re-use

```ts
const objv = tsfv
  .keys(tsfv.every(tsfv.length(2, 8)).some(tsfv.exact('id')))
  .values(tsfv.every(tsfv.anyOf(tsfv.integer(), tsfv.string())));
objv.check({ id: 42, foo: 'bar' });
objv.testAll({ x: Math.PI }).forEach(err => console.log(err.message));
// Expected object with keys array with every element length between 2 and 8 and array with some element value exactly equal to "id"
// Expected object with values array with every element (integer or string)
```

### Custom Predicates

```ts
const div3 = tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3');
div3.check(9);
div3.check('9');
div3.testAll(Math.PI).forEach(err => console.log(err.message));
// Expected divisible by 3
div3.testAll(words).forEach(err => console.log(err.message));
// Expected numeric
// Expected divisible by 3
```

### Extensions

New validation builder methods can be added to the API using [Typescript Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
// uppercase.ts
import { Validation } from 'tsfv';

// augment appropriate interface for type in fluent API
declare module 'tsfv/dist/api' {
  export interface StringValidationReturning<V> {
    uppercase(): V;
  }
}

// augment Validation class
declare module 'tsfv' {
  export interface Validation {
    uppercase(): Validation;
  }
}

// add method to Validation class
Validation.prototype.uppercase = function(this: Validation): Validation {
  return this.withRule({
    id: 'uppercase',
    describe: () => 'uppercase string',
    test: v => /^[A-Z]+$/.test(v)
  });
};
```

Use the extension by importing its module, in addition to `tsfv`:

```ts
import tsfv from 'tsfv';
import './uppercase';

tsfv.uppercase().check('ABC');
tsfv.uppercase().testAll('abc').forEach(err => console.log(err.message));
// Expected uppercase string
```

### Localized Error Messages

The core library always returns error messages in English. However, validation errors and rules
preserve enough information to localize error messages into other languages:

```ts
import tsfv, { ValidationError } from 'tsfv';
import { RuleInstance } from 'tsfv/dist/api';

function describeAufDeutsch(rule: RuleInstance): string {
  switch (rule.id) {
    case 'length':
      return `Länge zwischen ${rule.min} und ${rule.max}`;
    case 'pattern':
      return `eine Zeichenfolge die zu ${rule.regex} passt`;
    // ...
    default:
      throw new Error(`Unbekannte Regel: ${rule.id}`);
  }
}

function errorAufDeutsch(error: ValidationError): string {
  let message = `Erwartet ${describeAufDeutsch(error.rule)}`;
  if (error.variable) {
    message += ` für "${error.variable}"`;
  }
  return message;
}

tsfv
  .length(1, 64)
  .pattern(/([A-Z]+\s*)+/)
  .orUndefined()
  .testAll(null, 'words')
  .map(err => console.log(errorAufDeutsch(err)));
// Erwartet eine Länge zwischen 1 und 64 für "words"
// Erwartet eine Zeichenfolge die zu /([A-Z]+\s*)+/ passt für "words"
```

## API

The entire API is exposed via the default export of the library, generally imported as `tsfv`.

Note that all of the methods used to configure a validator are chainable.
The return types shown below are simplified and illustrative;
refer to the Typescript definition files for actual return types.

### Core Validation API

The following methods are used to perform validation once the validator object has been built by calling builder methods.

#### check

`check(value: any, name?: string): void`

Validates the given value and throws a `ValidationError` if it is invalid.
An optional variable name can be provided that will be included in any error message.

Example:

```ts
tsfv.string().check('x'); // returns
tsfv.not.string().check('x'); // throws ValidationError
```

#### test

`test(value: any): boolean`

Tests whether the given value is valid according to the rules checked by this validator.

Example:

```ts
tsfv.string().test('x'); // true
tsfv.not.string().test('x'); // false
```

#### testAll

`testAll(value: any, name?: string): ValidationError[]`

Validates the given value and returns an array of `ValidationError` containing any and all failing rules.
An optional variable name can be provided that will be included in any error message.

Example:

```ts
tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3').testAll(null).forEach(err => console.log(err.message));
// Expected numeric
// Expected divisible by 3
```

#### describe

`describe(): string`

Returns an English description of the rules checked by this validator.

Example:

```ts
tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3').describe(); // numeric and divisible by 3
```

### Modifiers

Modifiers change the behavior of the immediately following rule.
They are implemented as property getters, so they are not followed by parentheses.

#### not

`readonly not: Omit<InvertedValidation<this>, 'not'>`

The `not` modifier inverts/negates the logic of the immediately following rule.
It also disables any type-narrowing of the return type of that rule, essentially causing it to return a
validator of type `this` instead of a type-specific validator (such as `NumericValidation` or `StringValidation`).
Double inversion/negation is not allowed by the type system.

Example:

```ts
tsfv.string().test('x'); // true
tsfv.not.string().test('x'); // false
```

### Type Validation Builders

The following methods validate the general type of a value.

#### array

`array(): ArrayValidation`

Returns a new validator that checks that the validated value is an array.
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to arrays.

Example:

```ts
tsfv.array().every(tsfv.positive()).test([1, 2, 3]); // true
```

#### boolean

`boolean(): AnyValidation`

Returns a new validator that checks that the validated value is a boolean value (`true` or `false`).

Example:

```ts
tsfv.boolean().test(false); // true
tsfv.boolean().test(1); // false
```

#### integer

`integer(): NumericValidation`

Returns a new validator that checks that the validated value is an integer.
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to numbers.

Example:

```ts
tsfv.integer().test(42); // true
tsfv.integer().test(1.1); // false
```

#### null

`null(): AnyValidation`

Returns a new validator that checks that the validated value is `null`.

Example:

```ts
tsfv.null().test(null); // true
tsfv.null().test(undefined); // false
```

#### number

`number(): NumericValidation`

Returns a new validator that checks that the validated value is a `number` (including `NaN`).
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to numbers.

Example:

```ts
tsfv.number().test(42); // true
tsfv.number().test(Infinity); // true
tsfv.number().test(NaN); // true
tsfv.number().test('42'); // false
```

#### numeric

`numeric(): NumericValidation`

Returns a new validator that checks that the validated value is numeric (including numeric strings
and `Number` but excluding `NaN`).
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to numbers.

Example:

```ts
tsfv.numeric().test(42); // true
tsfv.numeric().test(Infinity); // true
tsfv.numeric().test(NaN); // false
tsfv.numeric().test('42'); // true
```

#### object

`object(): ObjectValidation`

Returns a new validator that checks that the validated value is an object (not including arrays).
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to objects.

Example:

```ts
tsfv.object().test({}); // true
tsfv.object().test(new Date()); // true
tsfv.object().test([]); // false
tsfv.object().test('42'); // false
```

#### string

`string(): StringValidation`

Returns a new validator that checks that the validated value is a string.
Assuming the method call was not preceded by `not`, the interface of the returned validator
will contain only validation builders that apply to strings.

Example:

```ts
tsfv.string().test('42'); // true
tsfv.string().test(42); // false
```

#### undefined

`undefined(): AnyValidation`

Returns a new validator that checks that the validated value is `undefined`.

Example:

```ts
tsfv.undefined().test(undefined); // true
tsfv.undefined().test(null); // false
```

### Generic Validation Builders (AnyValidation)

The following methods apply to validating values of any type.

#### anyOf

`anyOf(...validators: Validator[]): AnyValidation`

Checks that at least one of the given validators passes, essentially providing an `or` operator.
If no validators are provided, no values are considered valid.

Example:

```ts
tsfv.anyOf(tsfv.number(), tsfv.string()).test(42); // true
tsfv.anyOf(tsfv.number(), tsfv.string()).test('hello'); // true
tsfv.anyOf(tsfv.number(), tsfv.string()).test(null); // false
```

#### equal

`equal(value: any): AnyValidation`

Returns a new validator that checks that the validated value loosely equals (using `==`) the given value.

Example:

```ts
tsfv.equal(null).test(undefined); // true
tsfv.equal(42).test('42'); // true
tsfv.equal('hello').test({ toString: () => 'hello' }); // true
tsfv.equal(NaN).test(NaN); // false
```

#### exact

`exact(value: any): AnyValidation`

Returns a new validator that checks that the validated value strictly equals (using `===`) the given value.

Example:

```ts
tsfv.exact(null).test(null); // true
tsfv.exact(null).test(undefined); // false
tsfv.exact(42).test(42); // true
tsfv.exact(42).test('42'); // false
tsfv.exact(NaN).test(NaN); // false
```

#### predicate

`predicate(test: Predicate, description: string): AnyValidation`

Returns a new validator that checks that the validated value against the given predicate function.
The given description string is used in error messages for invalid values.

Example:

```ts
tsfv.numeric().predicate(v => v % 3 === 0, 'divisible by 3').test(9); // true
```

### Numeric Validation Builders (NumericValidation)

The following methods apply to validating numeric values, which include `number`, strings parsable as numbers, and `Number` objects.

#### between

`between(min: number, max: number): NumericValidation`

Returns a new validator that checks that the validated value is numeric and within the given range, inclusive.
Throws an `Error` if `min > max`.

Example:

```ts
tsfv.between(1, 10).test(5); // true
tsfv.between(1, 10).test('5'); // true
tsfv.between(1, 10).test(0); // false
```

#### greaterThan

`greaterThan(bound: number): NumericValidation`

Returns a new validator that checks that the validated value is numeric and greater than the given minimum.

Example:

```ts
tsfv.greaterThan(1).test(2); // true
tsfv.greaterThan(1).test('2'); // true
tsfv.greaterThan(1).test(1); // false
```

#### greaterThanOrEqual

`greaterThanOrEqual(bound: number): NumericValidation`

Returns a new validator that checks that the validated value is numeric and greater than or equal to the given minimum.

Example:

```ts
tsfv.greaterThanOrEqual(1).test(2); // true
tsfv.greaterThanOrEqual(1).test('1'); // true
tsfv.greaterThanOrEqual(1).test(0); // false
```

#### lessThan

`lessThan(bound: number): NumericValidation`

Returns a new validator that checks that the validated value is numeric and less than the given minimum.

Example:

```ts
tsfv.lessThan(1).test(0); // true
tsfv.lessThan(1).test('0'); // true
tsfv.lessThan(1).test(1); // false
```

#### lessThanOrEqual

`lessThanOrEqual(bound: number): NumericValidation`

Returns a new validator that checks that the validated value is numeric and less than or equal to the given minimum.

Example:

```ts
tsfv.lessThanOrEqual(1).test(0); // true
tsfv.lessThanOrEqual(1).test('1'); // true
tsfv.lessThanOrEqual(1).test(2); // false
```

#### positive

`positive(): NumericValidation`

Returns a new validator that checks that the validated value is numeric and positive (`> 0`).

Example:

```ts
tsfv.positive().test(1); // true
tsfv.positive().test('1'); // true
tsfv.positive().test(0); // false
```

#### negative

`negative(): NumericValidation`

Returns a new validator that checks that the validated value is numeric and negative (`< 0`).

Example:

```ts
tsfv.negative().test(-1); // true
tsfv.negative().test('-1'); // true
tsfv.negative().test(0); // false
```

### Length Validation Builders (LengthValidation)

The following methods apply to validating the length of strings and arrays.

#### length

`length(min: number, max?: number): LengthValidation`

Checks that the length of the validated value is within the given range, inclusive.
If `max` is omitted, it is assumed to equal `min`.
Throws an `Error` if `min > max`.

Example:

```ts
tsfv.length(1).test([1]); // true
tsfv.length(1, 3).test([]); // false
tsfv.length(1).test('a'); // true
tsfv.length(1, 3).test(''); // false
```

#### minLength

`minLength(min: number): LengthValidation`

Checks that the length of the validated value is greater than or equal to the given minimum.

Example:

```ts
tsfv.minLength(1).test([1]); // true
tsfv.minLength(1).test([]); // false
tsfv.minLength(1).test('a'); // true
tsfv.minLength(1).test(''); // false
```

#### maxLength

`maxLength(max: number): LengthValidation`

Checks that the length of the validated value is less than or equal to the given maximum.

Example:

```ts
tsfv.maxLength(1).test([1]); // true
tsfv.maxLength(1).test([1, 2]); // false
tsfv.maxLength(1).test('a'); // true
tsfv.maxLength(1).test('ab'); // false
```

#### empty

`empty(): LengthValidation`

Returns a new validator that checks that the validated value is an empty string or array.

Example:

```ts
tsfv.empty().test([]); // true
tsfv.empty().test([1]); // false
tsfv.empty().test(''); // true
tsfv.empty().test('a'); // false
```

### String Validation Builders (StringValidation)

The following methods apply to validating strings.

#### pattern

`pattern(regex: RegExp): StringValidation`

Returns a new validator that checks that the validated value is a string matching the given regular expression.

Example:

```ts
tsfv.pattern(/([A-Z]+\s*)+/).test('HELLO WORLD'); // true
tsfv.pattern(/([A-Z]+\s*)+/).test('hello world'); // false
```

#### contains

`contains(str: string): StringValidation`

Returns a new validator that checks that the validated value is a string containing the given substring.

Example:

```ts
tsfv.contains('ell').test('hello'); // true
```

#### startsWith

`startsWith(str: string): StringValidation`

Returns a new validator that checks that the validated value is a string starting with the given substring.

Example:

```ts
tsfv.startsWith('hell').test('hello'); // true
```

#### endsWith

`endsWith(str: string): StringValidation`

Returns a new validator that checks that the validated value is a string ending with the given substring.

Example:

```ts
tsfv.endsWith('ello').test('hello'); // true
```

### Array Validation Builders (ArrayValidation)

The following methods apply to validating arrays.

#### includes

`includes(value: any): ArrayValidation`

Returns a new validator that checks that the validated value is an array containing the given element.

Example:

```ts
tsfv.includes(2).test([1, 2, 3]); // true
```

#### every

`every(elementValidator: Validator): ArrayValidation`

Returns a new validator that checks that the validated value is an array for which every element passes the given validator.

Example:

```ts
tsfv.every(tsfv.positive()).test([1, 2, 3]); // true
```

#### some

`some(elementValidator: Validator): ArrayValidation`

Returns a new validator that checks that the validated value is an array for which at least one element passes the given validator.

Example:

```ts
tsfv.some(tsfv.positive()).test([-1, 2, -3]); // true
```

### Object Validation Builders (ObjectValidation)

The following methods apply to validating objects.

#### instanceOf

`instanceOf(ctor: Function): ObjectValidation`

Returns a new validator that checks that the validated value is an object that is an instance of the given class (or a subclass).

Example:

```ts
tsfv.instanceOf(Object).test({}); // true
tsfv.instanceOf(Function).test(() => 0); // true
```

#### keys

`keys(arrayValidator: Validator): ObjectValidation`

Returns a new validator that checks that the validated value is an object for which the keys pass the given validator.

Example:

```ts
tsfv.keys(tsfv.length(1)).test({ id: 1 }); // true
tsfv.keys(tsfv.every(tsfv.length(1))).test({ a: 1, b: 2 }); // true
```

#### values

`values(arrayValidator: Validator): ObjectValidation`

Returns a new validator that checks that the validated value is an object for which the values pass the given validator.

Example:

```ts
tsfv.values(tsfv.every(tsfv.numeric())).test({ a: 1, b: '2' }); // true
```

### Optional Value Builders

The following methods build a validator that accepts `null` and/or `undefined`, in addition to valid values.

#### optional

`optional(): this`

Returns a new validator that allows `null` or `undefined`, in addition to valid values.

Example:

```ts
tsfv.string().optional().test('hello'); // true
tsfv.string().optional().test(null); // true
tsfv.string().optional().test(undefined); // true
```

#### orNull

`orNull(): this`

Returns a new validator that allows `null`, in addition to valid values.

Example:

```ts
tsfv.string().orNull().test('hello'); // true
tsfv.string().orNull().test(null); // true
tsfv.string().orNull().test(undefined); // false
```

#### orUndefined

`orUndefined(): this`

Returns a new validator that allows `undefined`, in addition to valid values.

Example:

```ts
tsfv.string().orUndefined().test('hello'); // true
tsfv.string().orUndefined().test(undefined); // true
tsfv.string().orUndefined().test(null); // false
```

## License

`tsfv` is available under the [ISC license](LICENSE).

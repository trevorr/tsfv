/** A function that returns whether a value is valid. */
export type Predicate = (value: any) => boolean;

/**
 * Interface implemented by all validation rules.
 */
export interface Rule {
  /** Unique identifier for this rule. Used to programmatically identify rules, e.g. for building localized messages. */
  readonly id: string;

  /** Returns an English description of this rule. */
  describe(): string;

  /**
   * Tests whether the given value is valid according to this rule.
   *
   * @param value the value to validate
   */
  test(value: any): boolean;
}

/**
 * Interface for instantiated validation rules, which may contain arbitrary configuration.
 */
export interface RuleInstance extends Rule, Record<string, any> {}

/**
 * Exception class thrown or returned when validation errors are encountered.
 */
export class ValidationError extends Error {
  /**
   * The failing validation rule.
   */
  public readonly rule: RuleInstance;

  /**
   * The name of the variable containing the invalid value.
   */
  public readonly variable?: string;

  /**
   * Creates a new ValidationError with the given error message and failing rule.
   *
   * @param message the error message
   * @param rule the failing validation rule
   */
  constructor(message: string, rule: RuleInstance, variable?: string) {
    super(message);
    this.rule = rule;
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.name = this.constructor.name;
    this.variable = variable;
  }
}

/**
 * Interface used to actually perform validation.
 */
export interface Validator {
  /** Returns a new validator that allows null or undefined, in addition to valid values. */
  optional(): this;

  /** Returns a new validator that allows null, in addition to valid values. */
  orNull(): this;

  /** Returns a new validator that allows undefined, in addition to valid values. */
  orUndefined(): this;

  /** Returns an English description of the rules checked by this validator. */
  describe(): string;

  /**
   * Validates the given value and throws a ValidationError if it is invalid.
   *
   * @param value the value to validate
   * @param name the name of the variable containing the value
   */
  check(value: any, name?: string): void;

  /**
   * Tests whether the given value is valid according to the rules checked by this validator.
   *
   * @param value the value to validate
   */
  test(value: any): boolean;

  /**
   * Validates the given value and returns ValidationErrors for any and all failing rules.
   *
   * @param value the value to validate
   * @param name the name of the variable containing the value
   */
  testAll(value: any, name?: string): ValidationError[];
}

/**
 * Mix-in interface for building validators that can be inverted with `not`.
 * @typeparam N validator type before inversion
 */
export interface InvertibleValidation<N> {
  /**
   * Returns a validation builder that inverts/negates the next validation rule method.
   * Double inversion/negation (e.g. `.not.not`) is not allowed.
   */
  readonly not: InvertedValidation<N>;
}

/**
 * Mix-in interface for building validators that apply to any type.
 * @typeparam V return type for each rule builder method
 */
export interface AnyValidationReturning<V> {
  /**
   * Checks that at least one of the given validators passes, essentially providing an `or` operator.
   * If no validators are provided, no values are considered valid.
   *
   * @param validators an array of validators to apply
   */
  anyOf(...validators: Validator[]): V;

  /**
   * Returns a new validator that checks that the validated value equals (using `==`) the given value.
   *
   * @param value the value is compare against using `==`
   */
  equal(value: any): V;

  /**
   * Returns a new validator that checks that the validated value strictly equals (using `===`) the given value.
   *
   * @param value the value is compare against using `===`
   */
  exact(value: any): V;

  /**
   * Returns a new validator that checks that the validated value against the given predicate function.
   *
   * @param test the predicate used to test each value
   * @param description the description of this predicate (used in error messages)
   */
  predicate(test: Predicate, description: string): V;
}

/**
 * Mix-in type for non-inverted validation builders that apply to any type.
 */
export interface AnyValidation
  extends AnyValidationReturning<AnyValidation>,
    InvertibleValidation<AnyValidation>,
    Validator {}

/**
 * Mix-in interface for building validators that apply to numeric values.
 * @typeparam V return type for each rule builder method
 */
export interface NumericValidationReturning<V> extends AnyValidationReturning<V> {
  /**
   * Returns a new validator that checks that the validated value is numeric and within the given range, inclusive.
   * Throws an Error if `min > max`.
   *
   * @param min the minimum allowed value
   * @param max the maximum allowed value
   */
  between(min: number, max: number): V;

  /**
   * Returns a new validator that checks that the validated value is numeric and greater than the given minimum.
   *
   * @param bound the exclusive lower bound
   */
  greaterThan(bound: number): V;

  /**
   * Returns a new validator that checks that the validated value is numeric and greater than or equal to the given minimum.
   *
   * @param bound the inclusive lower bound
   */
  greaterThanOrEqual(bound: number): V;

  /**
   * Returns a new validator that checks that the validated value is numeric and less than the given minimum.
   *
   * @param bound the exclusive upper bound
   */
  lessThan(bound: number): V;

  /**
   * Returns a new validator that checks that the validated value is numeric and less than or equal to the given minimum.
   *
   * @param bound the inclusive upper bound
   */
  lessThanOrEqual(bound: number): V;

  /** Returns a new validator that checks that the validated value is numeric and positive (`> 0`). */
  positive(): V;

  /** Returns a new validator that checks that the validated value is numeric and negative (`< 0`). */
  negative(): V;
}

/**
 * Mix-in type for non-inverted validation builders that apply to numeric values.
 */
export interface NumericValidation
  extends NumericValidationReturning<NumericValidation>,
    InvertibleValidation<NumericValidation>,
    Validator {}

/**
 * Mix-in interface for building validators that apply to types with a length, such as strings and arrays.
 * @typeparam V return type for each rule builder method
 */
export interface LengthValidationReturning<V> {
  /**
   * Checks that the length of the validated value is within the given range, inclusive.
   * If `max` is omitted, it is assumed to equal `min`.
   * Throws an Error if `min > max`.
   *
   * @param min the minimum allowed length
   * @param max the maximum allowed length
   */
  length(min: number, max?: number): V;

  /**
   * Checks that the length of the validated value is greater than or equal to the given minimum.
   *
   * @param min the minimum allowed length
   */
  minLength(min: number): V;

  /**
   * Checks that the length of the validated value is less than or equal to the given maximum.
   *
   * @param max the maximum allowed length
   */
  maxLength(max: number): V;

  /** Returns a new validator that checks that the validated value is an empty string or array. */
  empty(): V;
}

/**
 * Mix-in interface for building validators that apply to strings.
 * @typeparam V return type for each rule builder method
 */
export interface StringValidationReturning<V> extends AnyValidationReturning<V>, LengthValidationReturning<V> {
  /**
   * Returns a new validator that checks that the validated value is a string matching the given regular expression.
   *
   * @param regex a regular expression to match
   */
  pattern(regex: RegExp): V;

  /**
   * Returns a new validator that checks that the validated value is a string containing the given substring.
   *
   * @param str a substring to search for
   */
  contains(str: string): V;

  /**
   * Returns a new validator that checks that the validated value is a string starting with the given substring.
   *
   * @param str a substring to match at the beginning of the value
   */
  startsWith(str: string): V;

  /**
   * Returns a new validator that checks that the validated value is a string ending with the given substring.
   *
   * @param str a substring to match at the end of the value
   */
  endsWith(str: string): V;
}

/**
 * Mix-in type for non-inverted validation builders that apply to strings.
 */
export interface StringValidation
  extends StringValidationReturning<StringValidation>,
    InvertibleValidation<StringValidation>,
    Validator {}

/**
 * Mix-in interface for building validators that apply to arrays.
 * @typeparam V return type for each rule builder method
 */
export interface ArrayValidationReturning<V> extends LengthValidationReturning<V> {
  /**
   * Returns a new validator that checks that the validated value is an array containing the given element.
   *
   * @param value an element value to search the array for
   */
  includes(value: any): V;

  /**
   * Returns a new validator that checks that the validated value is an array for which every element passes the given validator.
   *
   * @param elementValidator a validator to apply to each element
   */
  every(elementValidator: Validator): V;

  /**
   * Returns a new validator that checks that the validated value is an array for which at least one element passes the given validator.
   *
   * @param elementValidator a validator to apply to each element
   */
  some(elementValidator: Validator): V;
}

/**
 * Mix-in type for non-inverted validation builders that apply to arrays.
 */
export interface ArrayValidation
  extends ArrayValidationReturning<ArrayValidation>,
    InvertibleValidation<ArrayValidation>,
    Validator {}

/**
 * Mix-in interface for building validators that apply to objects.
 * @typeparam V return type for each rule builder method
 */
export interface ObjectValidationReturning<V> {
  /**
   * Returns a new validator that checks that the validated value is an object that is an instance of the given class (or a subclass).
   *
   * @param ctor a constructor function for the (super) class
   */
  instanceOf(ctor: Function): V;

  /**
   * Returns a new validator that checks that the validated value is an object for which the keys pass the given validator.
   *
   * @param arrayValidator an array validator (e.g. `some` or `every`) to apply to the object keys
   */
  keys(arrayValidator: Validator): V;

  /**
   * Returns a new validator that checks that the validated value is an object for which the values pass the given validator.
   *
   * @param arrayValidator an array validator (e.g. `some` or `every`) to apply to the object values
   */
  values(arrayValidator: Validator): V;

  /**
   * Returns a new validator that checks that the validated value is an object with properties that pass the given validator.
   *
   * @param propertyValidator an object mapping property names to their respective validators
   * @param only whether an object with additional, unvalidated properties is valid
   */
  properties<T>(propertyValidator: { [P in keyof T]: Validator }, only?: boolean): V;
}

/**
 * Mix-in type for non-inverted validation builders that apply to objects.
 */
export interface ObjectValidation
  extends ObjectValidationReturning<ObjectValidation>,
    InvertibleValidation<ObjectValidation>,
    Validator {}

/**
 * Mix-in interface for building validators that validate types
 * and narrow the set of available validation methods accordingly.
 */
export interface NarrowingTypeValidation {
  /** Returns a new validator that checks that the validated value is an array. */
  array(): ArrayValidation;

  /** Returns a new validator that checks that the validated value is a boolean value (`true` or `false`). */
  boolean(): AnyValidation;

  /** Returns a new validator that checks that the validated value is an integer. */
  integer(): NumericValidation;

  /** Returns a new validator that checks that the validated value is `null`. */
  null(): AnyValidation;

  /** Returns a new validator that checks that the validated value is a `number` (including `NaN`). */
  number(): NumericValidation;

  /** Returns a new validator that checks that the validated value is numeric (including numeric strings and Number but excluding `NaN`). */
  numeric(): NumericValidation;

  /** Returns a new validator that checks that the validated value is an object (not including arrays). */
  object(): ObjectValidation;

  /** Returns a new validator that checks that the validated value is a string. */
  string(): StringValidation;

  /** Returns a new validator that checks that the validated value is `undefined`. */
  undefined(): AnyValidation;
}

/**
 * Combined type for type-narrowing/non-inverted validation.
 */
export interface NarrowingValidation
  extends NarrowingTypeValidation,
    NumericValidationReturning<NarrowingValidation>,
    StringValidationReturning<NarrowingValidation>,
    ArrayValidationReturning<NarrowingValidation>,
    ObjectValidationReturning<NarrowingValidation>,
    InvertibleValidation<NarrowingValidation>,
    Validator {}

/**
 * Mix-in interface for building an inverted validator that checks that values are **not** of a given type.
 * Inverted validation is inherently non-narrowing (i.e. knowing what type something **isn't** does not allow
 * practical restriction of validation methods to the remaining possible types).
 * @typeparam V return type for each rule builder method
 */
export interface InvertedTypeValidation<V> {
  /** Returns a new validator that checks that the validated value is an array. */
  array(): V;

  /** Returns a new validator that checks that the validated value is a boolean value (`true` or `false`). */
  boolean(): V;

  /** Returns a new validator that checks that the validated value is an integer. */
  integer(): V;

  /** Returns a new validator that checks that the validated value is `null`. */
  null(): V;

  /** Returns a new validator that checks that the validated value is a `number` (including `NaN`). */
  number(): V;

  /** Returns a new validator that checks that the validated value is numeric (including numeric strings but excluding `NaN`). */
  numeric(): V;

  /** Returns a new validator that checks that the validated value is an object (not including arrays). */
  object(): V;

  /** Returns a new validator that checks that the validated value is a string. */
  string(): V;

  /** Returns a new validator that checks that the validated value is `undefined`. */
  undefined(): V;
}

/**
 * Combined type for building an inverted/non-narrowing validator.
 * The type parameter represents the type of the validator before inversion,
 * so that it can be restored after the next rule is added.
 * @typeparam N validator type before inversion
 */
export type InvertedValidation<N> = InvertedTypeValidation<N> &
  NumericValidationReturning<N> &
  StringValidationReturning<N> &
  ArrayValidationReturning<N> &
  ObjectValidationReturning<N>;

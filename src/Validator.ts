import { RuleInstance, ValidationError } from './api';

interface ValidatorConstructor {
  new (rules: RuleInstance[], allowNull: boolean, allowUndefined: boolean): Validator;
}

export class Validator {
  constructor(
    public readonly rules: RuleInstance[],
    protected readonly allowNull = false,
    protected readonly allowUndefined = false
  ) {}
  protected withRule(rule: RuleInstance): this {
    return new (this.constructor as ValidatorConstructor)(
      this.rules.concat(rule),
      this.allowNull,
      this.allowUndefined
    ) as this;
  }
  public optional(): this {
    return new (this.constructor as ValidatorConstructor)(this.rules, true, true) as this;
  }
  public orNull(): this {
    return new (this.constructor as ValidatorConstructor)(this.rules, true, this.allowUndefined) as this;
  }
  public orUndefined(): this {
    return new (this.constructor as ValidatorConstructor)(this.rules, this.allowNull, true) as this;
  }
  public describe(): string {
    if (this.rules.length > 0) {
      let message = this.rules.map(rule => rule.describe()).join(' and ');
      if (this.allowNull) {
        message += ' or null';
      }
      if (this.allowUndefined) {
        message += ' or undefined';
      }
      return message;
    }
    return 'any';
  }
  public test(value: any): boolean {
    return this.getFailingRules(value).next().done === true;
  }
  public check(value: any, name?: string): void {
    const first = this.getFailingRules(value).next();
    if (!first.done) {
      throw this.getRuleError(first.value, name);
    }
  }
  public testAll(value: any, name?: string): ValidationError[] {
    return Array.from(this.getFailingRules(value), rule => this.getRuleError(rule, name));
  }
  private *getFailingRules(value: any): Generator<RuleInstance> {
    if (!(this.allowNull && value === null) && !(this.allowUndefined && value === undefined)) {
      for (const rule of this.rules) {
        const result = rule.test(value);
        if (!result) {
          yield rule;
        }
      }
    }
  }
  private getRuleError(rule: RuleInstance, name?: string): ValidationError {
    let message = `Expected ${rule.describe()}`;
    if (name) {
      message += ` for "${name}"`;
    }
    return new ValidationError(message, rule, name);
  }
}

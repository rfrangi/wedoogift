import {CalculatorValue} from './calculator-value.model';

export class CalculatorResult {

  equal: CalculatorValue | undefined;
  floor!: CalculatorValue | undefined;
  ceil!: CalculatorValue | undefined;

  constructor(data: any = {}) {
    this.equal = data.equal ? new CalculatorValue(data.equal) : undefined;
    this.floor = data.floor ? new CalculatorValue(data.floor) : undefined;
    this.ceil = data.ceil ? new CalculatorValue(data.ceil) : undefined;
  }
}

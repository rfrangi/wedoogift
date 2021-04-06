

export class CalculatorResult {
  equal: any;
  floor: any;
  ceil: any;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

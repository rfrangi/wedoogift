export class CalculatorValue {
  value!: number;
  cards: Array<number> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}

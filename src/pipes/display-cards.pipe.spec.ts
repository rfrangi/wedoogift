import {DisplayCardsPipe} from './display-cards.pipe';

describe('ConcatCardsPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayCardsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display values', () => {
    const pipe = new DisplayCardsPipe();
    expect(pipe.transform([20, 70])).toEqual(` [ 20 € , 70 € ]`);
  });
});

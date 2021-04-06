import {CalculatorService} from './calculator.service';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';
import {CalculatorResult} from '../models/calculator-result.model';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CalculatorService ]
    });

    calculatorService = TestBed.get(CalculatorService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(calculatorService).toBeTruthy();
  });

  describe('search Combinaison', () => {
    it('should return a Observable of CalculatorResult', () => {
      const resp: CalculatorResult = {
          equal: { value: 20, cards: [20] },
          ceil: { value: 20, cards: [20] },
          floor: { value: 20, cards: [20] }
        };
      let response: CalculatorResult = new CalculatorResult();
      spyOn(calculatorService, 'searchCombinaison').and.returnValue(of(resp));
      calculatorService.searchCombinaison(5, 20)
        .subscribe((res: CalculatorResult) => response = res);
      expect(response).toEqual(resp);
    });
  });
});

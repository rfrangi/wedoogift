import { TestBed } from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CalculatorService} from '../../services/calculator.service';

describe('CalculatorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CalculatorComponent ],
    }).compileComponents();
  });

  it('should create the Calculator Component', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card mat-card-title').textContent).toContain('Recherche de carte');
  });
});

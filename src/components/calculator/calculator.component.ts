import {Component, Output, EventEmitter, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';

import {CalculatorService, ID_SHOP} from '../../services/calculator.service';

import {CalculatorResult} from '../../models/calculator-result.model';

import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector:  'app-calculator',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="submit()">
      <mat-card>
        <mat-card-title>Recherche de carte</mat-card-title>
        <mat-form-field>
          <input
            matInput
            required
            placeholder="Montant désiré"
            formControlName="amount"
            name="input-amount"
            min="0"
            type="number">
          <mat-error *ngIf="searchForm.controls.amount.hasError('required')">
            Veuillez saisir un montant
          </mat-error>
          <mat-error *ngIf="searchForm.controls.amount.hasError('pattern')">
            Veuillez saisir un montant positif
          </mat-error>
        </mat-form-field>
        <div class="other-actions">
          <button (click)="findOtherValue(true)"
                  type="button"
                  mat-raised-button
                  color="accent"
                  [disabled]="isMax">
            +
          </button>
          <button (click)="findOtherValue(false)"
                  type="button"
                  mat-raised-button
                  color="accent"
                  [disabled]="isMin">
            -
          </button>
        </div>
        <button mat-raised-button
                class="btn-search"
                type="submit"
                name="btn-search"
                color="primary"
                [disabled]="searchForm.invalid">
          Valider
        </button>
      </mat-card>
    </form>`,
  styleUrls: ['./calculator.component.scss'],

})
export class CalculatorComponent implements OnInit, OnChanges  {

  searchForm!: FormGroup;
  @Output() searchEvent = new EventEmitter();
  @Input() amount!: number;

  isMin: boolean | undefined = false;
  isMax: boolean | undefined = false;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      amount: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$')
        ]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateAmount(changes.amount.currentValue);
  }

  updateAmount(newAmount: number | undefined): void {
    if (newAmount) {
      this.searchForm.controls.amount.setValue(newAmount);
      this.submit();
    }
  }

  submit(): void {
    if (!this.searchForm.valid) {
      return;
    }

    this.calculatorService.searchCombinaison(ID_SHOP, this.searchForm.value.amount).subscribe(
      (calculatorResult: CalculatorResult) => {
        if (!calculatorResult.equal &&
          (!calculatorResult.floor && calculatorResult.ceil) ||
          (calculatorResult.floor && !calculatorResult.ceil)) {
          this.updateAmount(calculatorResult.floor?.value || calculatorResult.ceil?.value);
        }
        this.searchEvent.emit(calculatorResult);
      },
      (err: any) => console.error(err)
    );
  }

  findOtherValue(next: boolean): void {

    const val = this.searchForm.value.amount + (next ? 1 : -1);
    this.searchForm.controls.amount.setValue(val);

    this.calculatorService.searchCombinaison(ID_SHOP, val).subscribe(
      (calculatorResult: CalculatorResult) => {

        this.isMin = calculatorResult.ceil && !calculatorResult.floor;
        this.isMax = calculatorResult.floor && !calculatorResult.ceil;

        if (calculatorResult.floor && !next) {
          this.updateAmount(calculatorResult.floor.value);
        } else if (calculatorResult.ceil && !next) {
          this.updateAmount(calculatorResult.ceil.value);
        }

        if (calculatorResult.ceil && next) {
          this.updateAmount(calculatorResult.ceil.value);
        }
      },
      (err: any) => console.error(err)
    );
  }


}

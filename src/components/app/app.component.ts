import { Component } from '@angular/core';

import {CalculatorResult} from '../../models/calculator-result.model';
import {CalculatorValue} from '../../models/calculator-value.model';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Wedoogift</span>
    </mat-toolbar>

    <app-calculator [amount]="amount"
                    (searchEvent)="onSearch($event)">
    </app-calculator>

    <mat-card *ngIf="calculatorResult">
      <ng-container *ngIf="calculatorResult.equal">
        <mat-card-title>Votre montant est composé {{ calculatorResult.equal.cards.length > 1 ? 'des cartes suivantes' : "d'une carte de "}}:</mat-card-title>
        <mat-list>
          <mat-list-item *ngFor="let card of calculatorResult.equal.cards">{{ card }} €</mat-list-item>
        </mat-list>
      </ng-container>
      <ng-container *ngIf="!calculatorResult.equal">
        <mat-card-title>Le montant désiré n'est pas disponible<br/> Veuillez choisir l'une des options suivantes: </mat-card-title>
        <mat-selection-list [multiple]="false">
          <mat-list-option *ngIf="calculatorResult.ceil"
                           (click)="changeAmount(calculatorResult.ceil)">
             {{ calculatorResult.ceil.value  }} € {{ calculatorResult.ceil.cards | displayCards }}
          </mat-list-option>
          <mat-list-option *ngIf="calculatorResult.floor"
                           (click)="changeAmount(calculatorResult.floor)">
           {{ calculatorResult.floor.value }} € {{ calculatorResult.floor.cards | displayCards }}
          </mat-list-option>
        </mat-selection-list>
      </ng-container>
    </mat-card>
  `,  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  calculatorResult!: CalculatorResult;
  amount!: number;

  onSearch(calculatorResult: CalculatorResult): void {
      this.calculatorResult = calculatorResult;
  }

  changeAmount(calculatorValue: CalculatorValue): void {
    this.amount = calculatorValue.value;
  }
}

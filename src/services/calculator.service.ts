import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {CalculatorResult} from '../models/calculator-result.model';

export const ID_SHOP = 5;
export const URL_API = 'http://localhost:3000/';

@Injectable({ providedIn: 'root'})
export class CalculatorService {

  constructor(private http: HttpClient) {}

  searchCombinaison(idShop: number, amount: number ): Observable<CalculatorResult > {
      return this.http.get<CalculatorResult>(`${URL_API}shop/${idShop}/search-combination?amount=${amount}`)
        .pipe(map(resp => new CalculatorResult(resp)));
    }
}

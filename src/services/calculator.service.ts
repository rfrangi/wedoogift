import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {CalculatorResult} from '../models/calculator-result.model';

export const ID_SHOP = 5;
export const HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({ providedIn: 'root'})
export class ShopService {

  constructor(private http: HttpClient) {}

  searchCombinaisonByIdShop(idShop: number, amount: number ): Observable<CalculatorResult > {
      return this.http.get<CalculatorResult>(`shop/${idShop}/search-combination?amount=${amount}`, HTTP_OPTIONS)
        .pipe(map(resp => new CalculatorResult(resp)));
    }
}

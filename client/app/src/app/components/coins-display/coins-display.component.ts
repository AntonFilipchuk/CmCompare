import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, finalize, map, of, tap, timer } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsDashboardService } from 'src/app/Services/CoinsDashboard/coin-dashboard.service';
import { CoinsDisplayService } from 'src/app/Services/CoinsDisplay/coins-display.service';
import { ColorChangeService } from 'src/app/Services/ColorChange/color-change.service';


const LOADING_SPINNER_MIN_TIME_MS = 1000;
@Component({
  selector: 'app-coins-display',
  templateUrl: './coins-display.component.html',
  styleUrls: ['./coins-display.component.scss']
})
export class CoinsDisplayComponent
{
  constructor (private coinsDisplayService: CoinsDisplayService, private colorChangeService: ColorChangeService)
  { }

  public loading$ = new BehaviorSubject(true);

  public coinsDashboardBgColor$ = this.colorChangeService.coinsDashboardBgColor$;

  #requestResult: Observable<RequestResult<Coin[]>> = this.coinsDisplayService.coinsTable$.pipe(
    map((value: Coin[]): RequestResult<Coin[]> => 
    {
      return { value: value, error: undefined };
    }),
    catchError((err: any): Observable<RequestResult<Coin[]>> => 
    {
      return of({ error: err });
    })
  );

  public result$ = combineLatest(
    [timer(LOADING_SPINNER_MIN_TIME_MS), this.#requestResult]
  ).pipe(
    finalize(() => 
    {
      this.loading$.next(false);
    }),
    map(observables => observables[1])
  );
}


export interface RequestResult<T>
{
  value?: T;
  error?: HttpErrorResponse | Error;
}
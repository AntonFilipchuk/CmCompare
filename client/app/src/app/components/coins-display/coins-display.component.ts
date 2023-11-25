import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, finalize, map, of, timer } from 'rxjs';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsDisplayService } from 'src/app/Services/CoinsDisplay/coins-display.service';


const LOADING_SPINNER_MIN_TIME = 0;

@Component({
  selector: 'app-coins-display',
  templateUrl: './coins-display.component.html',
  styleUrls: ['./coins-display.component.scss']
})
export class CoinsDisplayComponent
{
  constructor (private coinsDisplayService: CoinsDisplayService)
  { }

  public lodaing$ = new BehaviorSubject(true);

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
    [timer(LOADING_SPINNER_MIN_TIME), this.#requestResult]
  ).pipe(
    finalize(() => 
    {
      this.lodaing$.next(false);
    }),
    map(observables => observables[1])
  );

}


export interface RequestResult<T>
{
  value?: T;
  error?: HttpErrorResponse | Error;
}
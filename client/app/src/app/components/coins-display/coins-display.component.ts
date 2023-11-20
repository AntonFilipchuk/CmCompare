import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, of, startWith, switchMap, throwError } from 'rxjs';
import { LoadingWrapper } from 'src/app/Helpers/LoadingWrapper/LoadingWrapper';
import { Coin } from 'src/app/Interfaces/Coin';
import { CoinsDisplayService } from 'src/app/Services/CoinsDisplay/coins-display.service';

@Component({
  selector: 'app-coins-display',
  templateUrl: './coins-display.component.html',
  styleUrls: ['./coins-display.component.scss']
})
export class CoinsDisplayComponent
{
  constructor (private coinsDisplayService: CoinsDisplayService)
  { }

  public coins$: LoadingWrapper<Coin[]> = new LoadingWrapper(this.coinsDisplayService.coinsTable$);
  public readonly coinsState$: Observable<HttpRequestState<Coin[]>> = this.coinsDisplayService.coinsTable$.pipe(
    map((value) => 
    {
      return { isLoading: false, value };
    }),
    catchError((error) => of({ isLoading: false, error: error })),
    startWith({ isLoading: true }));
}

export interface HttpRequestState<T>
{
  isLoading: boolean;
  value?: T;
  error?: HttpErrorResponse | Error;
}